"""Download images for EU and Feiertage topics from Wikimedia Commons."""
import requests
import hashlib
import os
import time
from PIL import Image
from io import BytesIO

HEADERS = {"User-Agent": "LebenInDeutschland/1.0 (educational app)"}

def get_thumb_url(filename, width=200):
    md5 = hashlib.md5(filename.encode()).hexdigest()
    encoded = filename.replace(" ", "_")
    return f"https://upload.wikimedia.org/wikipedia/commons/thumb/{md5[0]}/{md5[:2]}/{encoded}/{width}px-{encoded}"

def download_via_api(filename, output_path, width=200):
    url = "https://commons.wikimedia.org/w/api.php"
    params = {
        "action": "query",
        "titles": f"File:{filename}",
        "prop": "imageinfo",
        "iiprop": "url",
        "iiurlwidth": width,
        "format": "json",
    }
    r = requests.get(url, params=params, headers=HEADERS, timeout=15)
    if r.status_code == 200:
        data = r.json()
        pages = data.get("query", {}).get("pages", {})
        for page in pages.values():
            info = page.get("imageinfo", [{}])[0]
            thumb = info.get("thumburl")
            if thumb:
                r2 = requests.get(thumb, headers=HEADERS, timeout=15)
                if r2.status_code == 200 and len(r2.content) > 500:
                    img = Image.open(BytesIO(r2.content))
                    img.thumbnail((width, width))
                    img.save(output_path, "JPEG", quality=80)
                    return True
    return False

def download_image(filename, output_path, width=200):
    if os.path.exists(output_path):
        print(f"  Already exists: {os.path.basename(output_path)}")
        return True

    # Try direct
    thumb_url = get_thumb_url(filename, width)
    try:
        r = requests.get(thumb_url, headers=HEADERS, timeout=15)
        if r.status_code == 200 and len(r.content) > 500:
            img = Image.open(BytesIO(r.content))
            img.thumbnail((width, width))
            img.save(output_path, "JPEG", quality=80)
            print(f"  OK (direct): {os.path.basename(output_path)} ({os.path.getsize(output_path)} bytes)")
            return True
    except Exception as e:
        pass

    time.sleep(1)

    # Try API
    try:
        if download_via_api(filename, output_path, width):
            print(f"  OK (API): {os.path.basename(output_path)} ({os.path.getsize(output_path)} bytes)")
            return True
    except Exception as e:
        pass

    time.sleep(1)

    # Try search
    search_term = filename.replace("_", " ").rsplit(".", 1)[0]
    url = "https://commons.wikimedia.org/w/api.php"
    params = {
        "action": "query",
        "generator": "search",
        "gsrsearch": f"File:{search_term}",
        "gsrlimit": 1,
        "prop": "imageinfo",
        "iiprop": "url",
        "iiurlwidth": width,
        "format": "json",
    }
    try:
        r = requests.get(url, params=params, headers=HEADERS, timeout=15)
        if r.status_code == 200:
            data = r.json()
            pages = data.get("query", {}).get("pages", {})
            for page in pages.values():
                info = page.get("imageinfo", [{}])[0]
                thumb = info.get("thumburl")
                if thumb:
                    r2 = requests.get(thumb, headers=HEADERS, timeout=15)
                    if r2.status_code == 200 and len(r2.content) > 500:
                        img = Image.open(BytesIO(r2.content))
                        img.thumbnail((width, width))
                        img.save(output_path, "JPEG", quality=80)
                        print(f"  OK (search): {os.path.basename(output_path)} ({os.path.getsize(output_path)} bytes)")
                        return True
    except Exception as e:
        pass

    print(f"  FAILED: {os.path.basename(output_path)}")
    return False

# === EU Flag ===
print("=== EU FLAG ===")
# Download EU flag as SVG-based PNG
download_image(
    "Flag_of_Europe.svg",
    "app/public/images/topics/eu-flag.jpg",
    300
)
time.sleep(2)

# === Holiday images ===
HOL_DIR = "app/public/images/topics/feiertage"
holidays = {
    "rosenmontag.jpg": "Cologne_Germany_Cologne-Gay-Pride-Parade-2015-02.jpg",  # Carnival costumes
    "ostern.jpg": "Ostereier.jpg",  # Easter eggs
    "pfingsten.jpg": "Pfingstrose_Paeonia_suffruticosa.jpg",  # Pentecost/Pfingstrose
    "adventszeit.jpg": "Adventskranz-1.Advent.jpg",  # Advent wreath
    "weihnachten.jpg": "Weihnachtsbaum_-_Christbaum.jpg",  # Christmas tree
}

print("\n=== HOLIDAY IMAGES ===")
for output_name, filename in holidays.items():
    print(f"\nDownloading: {output_name}")
    download_image(filename, os.path.join(HOL_DIR, output_name), 200)
    time.sleep(2)

# Summary
print("\n--- Summary ---")
for d in ["app/public/images/topics", HOL_DIR]:
    for f in sorted(os.listdir(d)):
        fpath = os.path.join(d, f)
        if os.path.isfile(fpath) and f.endswith('.jpg'):
            print(f"  {d}/{f}: {os.path.getsize(fpath)} bytes")
