"""Download historical photos for the Nationalsozialismus topic timeline from Wikimedia Commons."""
import requests
import hashlib
import os
import time
from PIL import Image
from io import BytesIO

OUT_DIR = "app/public/images/topics/nationalsozialismus"

# Wikimedia Commons files - all are public domain / CC due to age
# Using well-known historical photos
images = {
    "hitler-chancellor.jpg": {
        "filename": "Bundesarchiv_Bild_183-H28422,_Reichskabinett_Adolf_Hitler.jpg",
        "desc": "Hitler becomes Chancellor, Jan 30 1933"
    },
    "reichspogromnacht.jpg": {
        "filename": "Bundesarchiv_Bild_146-1970-083-42,_Magdeburg,_zerstörtes_jüdisches_Geschäft.jpg",
        "desc": "Destroyed Jewish shop, Nov 1938"
    },
    "stauffenberg.jpg": {
        "filename": "Claus_Schenk_Graf_von_Stauffenberg.jpg",
        "desc": "Claus Schenk Graf von Stauffenberg"
    },
    "auschwitz.jpg": {
        "filename": "Auschwitz_I_entrance_snow.jpg",
        "desc": "Auschwitz concentration camp gate"
    },
    "kapitulation.jpg": {
        "filename": "German_instrument_of_surrender2.jpg",
        "desc": "German instrument of surrender, May 8 1945"
    },
    "wwii.jpg": {
        "filename": "Bundesarchiv_B_145_Bild-P054320,_Berlin,_Brandenburger_Tor_und_Pariser_Platz.jpg",
        "desc": "WWII - Brandenburg Gate"
    },
}

def get_thumb_url(filename, width=200):
    """Get Wikimedia thumbnail URL using the MD5 hash method."""
    md5 = hashlib.md5(filename.encode()).hexdigest()
    encoded = filename.replace(" ", "_")
    return f"https://upload.wikimedia.org/wikipedia/commons/thumb/{md5[0]}/{md5[:2]}/{encoded}/{width}px-{encoded}"

def try_api_search(search_term, width=200):
    """Search Wikimedia Commons API for an image and return thumbnail URL."""
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
    r = requests.get(url, params=params, headers={"User-Agent": "LebenInDeutschland/1.0"})
    if r.status_code == 200:
        data = r.json()
        pages = data.get("query", {}).get("pages", {})
        for page in pages.values():
            info = page.get("imageinfo", [{}])[0]
            return info.get("thumburl")
    return None

def download_image(filename, output_name, width=200):
    """Try multiple methods to download a Wikimedia Commons image."""
    output_path = os.path.join(OUT_DIR, output_name)
    if os.path.exists(output_path):
        print(f"  Already exists: {output_name}")
        return True

    # Method 1: Direct thumbnail URL
    thumb_url = get_thumb_url(filename, width)
    headers = {"User-Agent": "LebenInDeutschland/1.0 (educational app)"}

    print(f"  Trying direct URL for {output_name}...")
    try:
        r = requests.get(thumb_url, headers=headers, timeout=15)
        if r.status_code == 200 and len(r.content) > 500:
            img = Image.open(BytesIO(r.content))
            img.thumbnail((width, width))
            img.save(output_path, "JPEG", quality=80)
            print(f"  OK: {output_name} ({os.path.getsize(output_path)} bytes)")
            return True
    except Exception as e:
        print(f"  Direct failed: {e}")

    time.sleep(1)

    # Method 2: API imageinfo
    print(f"  Trying API for {output_name}...")
    api_url = "https://commons.wikimedia.org/w/api.php"
    params = {
        "action": "query",
        "titles": f"File:{filename}",
        "prop": "imageinfo",
        "iiprop": "url",
        "iiurlwidth": width,
        "format": "json",
    }
    try:
        r = requests.get(api_url, params=params, headers=headers, timeout=15)
        if r.status_code == 200:
            data = r.json()
            pages = data.get("query", {}).get("pages", {})
            for page in pages.values():
                info = page.get("imageinfo", [{}])[0]
                thumb = info.get("thumburl")
                if thumb:
                    r2 = requests.get(thumb, headers=headers, timeout=15)
                    if r2.status_code == 200 and len(r2.content) > 500:
                        img = Image.open(BytesIO(r2.content))
                        img.thumbnail((width, width))
                        img.save(output_path, "JPEG", quality=80)
                        print(f"  OK via API: {output_name} ({os.path.getsize(output_path)} bytes)")
                        return True
    except Exception as e:
        print(f"  API failed: {e}")

    time.sleep(1)

    # Method 3: Search API
    print(f"  Trying search for {output_name}...")
    search_term = filename.replace("_", " ").rsplit(".", 1)[0]
    thumb = try_api_search(search_term, width)
    if thumb:
        try:
            r = requests.get(thumb, headers=headers, timeout=15)
            if r.status_code == 200 and len(r.content) > 500:
                img = Image.open(BytesIO(r.content))
                img.thumbnail((width, width))
                img.save(output_path, "JPEG", quality=80)
                print(f"  OK via search: {output_name} ({os.path.getsize(output_path)} bytes)")
                return True
        except Exception as e:
            print(f"  Search download failed: {e}")

    print(f"  FAILED: {output_name}")
    return False

# Download all
for output_name, info in images.items():
    print(f"\nDownloading: {info['desc']}")
    download_image(info["filename"], output_name)
    time.sleep(2)

print("\n--- Summary ---")
for f in sorted(os.listdir(OUT_DIR)):
    fpath = os.path.join(OUT_DIR, f)
    print(f"  {f}: {os.path.getsize(fpath)} bytes")
