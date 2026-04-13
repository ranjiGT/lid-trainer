"""Generate a geographically accurate SVG map of Germany and its 9 neighbors."""
import geopandas as gpd
import json
from shapely.geometry import mapping
from shapely.ops import transform
import math

# Download Natural Earth 110m country boundaries
world = gpd.read_file("https://naciscdn.org/naturalearth/110m/cultural/ne_110m_admin_0_countries.zip")

# Countries we need
countries = {
    'DEU': ('Deutschland', '#f59e0b', '#92400e', 1.0),
    'DNK': ('Dänemark', '#d1d5db', '#6b7280', 0.7),
    'POL': ('Polen', '#d1d5db', '#6b7280', 0.7),
    'CZE': ('Tschechien', '#d1d5db', '#6b7280', 0.7),
    'AUT': ('Österreich', '#d1d5db', '#6b7280', 0.7),
    'CHE': ('Schweiz', '#d1d5db', '#6b7280', 0.7),
    'FRA': ('Frankreich', '#d1d5db', '#6b7280', 0.7),
    'LUX': ('Luxemburg', '#d1d5db', '#6b7280', 0.7),
    'BEL': ('Belgien', '#d1d5db', '#6b7280', 0.7),
    'NLD': ('Niederlande', '#d1d5db', '#6b7280', 0.7),
}

# Filter to our countries
gdf = world[world['ADM0_A3'].isin(countries.keys())].copy()

# Define the bounding box (slightly larger than Germany)
# Germany roughly: lon 5.9-15.0, lat 47.3-55.0
# We want a bit more context
min_lon, max_lon = 2.0, 18.0
min_lat, max_lat = 45.5, 57.0

# SVG dimensions
svg_w, svg_h = 650, 620
margin = 30

# Coordinate transform: lon/lat -> SVG x/y
def lon_to_x(lon):
    return margin + (lon - min_lon) / (max_lon - min_lon) * (svg_w - 2 * margin)

def lat_to_y(lat):
    return margin + (max_lat - lat) / (max_lat - min_lat) * (svg_h - 2 * margin - 60)

def coords_to_svg_path(geometry):
    """Convert a shapely geometry to SVG path data, clipping to our viewport."""
    paths = []
    
    if geometry.geom_type == 'Polygon':
        polys = [geometry]
    elif geometry.geom_type == 'MultiPolygon':
        polys = list(geometry.geoms)
    else:
        return ''
    
    for poly in polys:
        # Get exterior ring
        coords = list(poly.exterior.coords)
        if len(coords) < 3:
            continue
        
        # Convert to SVG coordinates
        svg_coords = [(round(lon_to_x(lon), 1), round(lat_to_y(lat), 1)) for lon, lat in coords]
        
        # Build path
        d = f"M{svg_coords[0][0]},{svg_coords[0][1]}"
        for x, y in svg_coords[1:]:
            d += f" L{x},{y}"
        d += " Z"
        paths.append(d)
    
    return ' '.join(paths)

# Clip geometries to our bounding box
from shapely.geometry import box
clip_box = box(min_lon, min_lat, max_lon, max_lat)
gdf['geometry'] = gdf['geometry'].intersection(clip_box)

# Build SVG
svg_parts = []
svg_parts.append(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {svg_w} {svg_h + 50}" width="{svg_w}" height="{svg_h + 50}">')
svg_parts.append('''  <defs>
    <style>
      .lbl { font-family: -apple-system, system-ui, sans-serif; font-size: 13px; font-weight: 700; fill: #1f2937; }
      .lbl-sm { font-family: -apple-system, system-ui, sans-serif; font-size: 10.5px; font-weight: 600; fill: #374151; }
      .lbl-bg { fill: #ffffff; fill-opacity: 0.92; rx: 3; ry: 3; }
      .de-lbl { font-family: -apple-system, system-ui, sans-serif; font-size: 18px; font-weight: 800; fill: #78350f; text-anchor: middle; }
      .legend { font-family: -apple-system, system-ui, sans-serif; font-size: 12px; fill: #374151; }
    </style>
  </defs>''')

# Background
svg_parts.append(f'  <rect width="{svg_w}" height="{svg_h + 50}" fill="#f0f4f8"/>')

# Add sea hint at the top (North Sea / Baltic Sea)
sea_y = lat_to_y(55.5)
svg_parts.append(f'  <rect x="0" y="0" width="{svg_w}" height="{sea_y + 15}" fill="#bfdbfe" fill-opacity="0.25" rx="0"/>')

# Draw neighbors first, then Germany on top
render_order = ['FRA', 'NLD', 'BEL', 'LUX', 'CHE', 'AUT', 'CZE', 'POL', 'DNK', 'DEU']

for code in render_order:
    row = gdf[gdf['ADM0_A3'] == code]
    if row.empty:
        continue
    geom = row.iloc[0].geometry
    name, fill, stroke, sw = countries[code]
    path_d = coords_to_svg_path(geom)
    if path_d:
        svg_parts.append(f'  <path d="{path_d}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}" stroke-linejoin="round"/>')

# Label positions (manually tuned for good placement)
# Format: code, label, x_offset, y_offset, is_small
label_positions = {
    'DEU': None,  # Special handling
    'DNK': (9.5, 55.8, 'Dänemark', False),
    'POL': (16.0, 52.0, 'Polen', False),
    'CZE': (15.5, 49.5, 'Tschechien', False),
    'AUT': (14.5, 47.2, 'Österreich', False),
    'CHE': (7.5, 46.3, 'Schweiz', False),
    'FRA': (3.5, 48.0, 'Frankreich', False),
    'LUX': (5.0, 49.7, 'Lux.', True),
    'BEL': (3.8, 50.8, 'Belgien', False),
    'NLD': (4.5, 52.5, 'Niederlande', False),
}

for code, pos in label_positions.items():
    if pos is None:
        continue
    lon, lat, name, is_small = pos
    x = lon_to_x(lon)
    y = lat_to_y(lat)
    
    cls = 'lbl-sm' if is_small else 'lbl'
    # Measure approx text width
    char_w = 6.5 if is_small else 8
    tw = len(name) * char_w + 10
    th = 20 if not is_small else 16
    
    svg_parts.append(f'  <rect x="{round(x - 4, 1)}" y="{round(y - th + 5, 1)}" width="{round(tw, 1)}" height="{th}" class="lbl-bg"/>')
    svg_parts.append(f'  <text class="{cls}" x="{round(x, 1)}" y="{round(y, 1)}">{name}</text>')

# Germany label (centered)
de_geom = gdf[gdf['ADM0_A3'] == 'DEU'].iloc[0].geometry
cx = lon_to_x(10.5)
cy = lat_to_y(51.0)
svg_parts.append(f'  <text class="de-lbl" x="{round(cx, 1)}" y="{round(cy, 1)}">Deutschland</text>')

# Legend
ly = svg_h + 10
svg_parts.append(f'  <rect x="160" y="{ly}" width="16" height="14" rx="2" fill="#f59e0b" stroke="#92400e" stroke-width="0.8"/>')
svg_parts.append(f'  <text class="legend" x="182" y="{ly + 12}">Deutschland</text>')
svg_parts.append(f'  <rect x="310" y="{ly}" width="16" height="14" rx="2" fill="#d1d5db" stroke="#6b7280" stroke-width="0.6"/>')
svg_parts.append(f'  <text class="legend" x="332" y="{ly + 12}">9 Nachbarländer / 9 Neighbors</text>')

# Caption
svg_parts.append(f'  <text font-family="-apple-system, sans-serif" font-size="12" fill="#6b7280" font-style="italic" text-anchor="middle" x="{svg_w // 2}" y="{svg_h + 42}">Deutschland (gelb) und seine 9 Nachbarländer (grau)</text>')

svg_parts.append('</svg>')

svg_content = '\n'.join(svg_parts)

output_path = 'app/public/images/topics/nachbarlaender-map.svg'
with open(output_path, 'w') as f:
    f.write(svg_content)

print(f"Written to {output_path}")
print(f"SVG size: {len(svg_content)} bytes")
