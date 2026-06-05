import urllib.request
import os
import re

base_url = "https://d24591e2.b1-syrer.pages.dev/app"
public_dir = r"C:\Users\hadi9\.gemini\antigravity\scratch\arab-pharmacists-de\public"

# Create directories
os.makedirs(public_dir, exist_ok=True)
os.makedirs(os.path.join(public_dir, "assets"), exist_ok=True)
os.makedirs(os.path.join(public_dir, "ios"), exist_ok=True)

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
}

def download_file(relative_url, dest_path):
    url = f"{base_url}/{relative_url.lstrip('/')}"
    print(f"Downloading {url} to {dest_path}...")
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req) as response:
            content = response.read()
            # Safety check: if downloading a JS/CSS file, it must not be HTML fallback
            if (dest_path.endswith('.js') or dest_path.endswith('.css')) and (b'<!DOCTYPE html>' in content or b'<html' in content):
                print(f"ERROR: Received HTML instead of JS/CSS for {url}!")
                return False
            
            os.makedirs(os.path.dirname(dest_path), exist_ok=True)
            with open(dest_path, 'wb') as out_file:
                out_file.write(content)
        print("Success.")
        return True
    except Exception as e:
        print(f"Failed to download {url}: {e}")
        return False

# 1. Download basic app shell files
files_to_download = [
    ("", "index.html"),
    ("favicon.png", "favicon.png"),
    ("manifest.webmanifest", "manifest.webmanifest"),
    ("sw.js", "sw.js"),
    ("modern-theme.css", "modern-theme.css"),
]

for rel_url, local_path in files_to_download:
    download_file(rel_url, os.path.join(public_dir, local_path))

# 2. Download iOS resources
ios_files = [
    "icon-180.png",
    "icon-167.png",
    "icon-152.png",
    "icon-120.png",
    "splash-iphone-14promax-1290x2796.png",
    "splash-iphone-15-1179x2556.png",
    "splash-iphone-13promax-1284x2778.png",
    "splash-iphone-13-1170x2532.png",
    "splash-iphone-xsmax-1242x2688.png",
    "splash-iphone-xr-828x1792.png",
    "splash-iphone-x-1125x2436.png",
    "splash-iphone-8plus-1242x2208.png",
    "splash-iphone-8-750x1334.png",
    "splash-iphone-se-640x1136.png"
]

for filename in ios_files:
    download_file(f"ios/{filename}", os.path.join(public_dir, "ios", filename))

# 3. Download known base assets
base_assets = [
    "assets/rolldown-runtime-jpDsebLB.js",
    "assets/react-BtyA4jkO.js",
    "assets/router-aEngWOZz.js",
    "assets/react-dom-CRACBAJ-.js",
    "assets/data-other-nFQ_2h-P.js",
    "assets/data-hoeren--vIou7im.js",
    "assets/data-lesen-D_1VaT8K.js",
    "assets/data-schreiben-CBnQkpUN.js",
    "assets/data-vocab-RImsq-ao.js",
    "assets/api-DZyMTm1P.js",
    "assets/streak-1t1bHvAr.js",
    "assets/index-BBj7cxGi.css",
]

for rel_url in base_assets:
    download_file(rel_url, os.path.join(public_dir, rel_url))

# 4. Download main bundle index-BXf3bHUP.js first, so we can parse all chunks
main_bundle_name = "assets/index-BXf3bHUP.js"
main_bundle_path = os.path.join(public_dir, main_bundle_name)

if download_file(main_bundle_name, main_bundle_path):
    # Read the main bundle and find all other JS chunks in __vite__mapDeps
    with open(main_bundle_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract strings like "./LesenPage-BNDjKKMl.js" from the beginning of the file
    chunks = re.findall(r'"\./([^"]+\.js)"', content)
    
    print(f"Found {len(chunks)} JS chunk dependencies in the bundle.")
    for chunk in chunks:
        # Download each chunk
        download_file(f"assets/{chunk}", os.path.join(public_dir, "assets", chunk))

print("Asset restoration script execution finished.")
