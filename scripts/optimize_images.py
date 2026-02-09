import os
from PIL import Image
import sys

# Configuration
IMAGE_DIR = os.path.join("public", "images")
MAX_WIDTH = 2560
QUALITY = 85
CONVERT_TO_WEBP = True

def optimize_images(directory):
    print(f"--- Starting Image Optimization in {directory} ---")
    
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.lower().endswith(('.png', '.jpg', '.jpeg')):
                img_path = os.path.join(root, file)
                try:
                    with Image.open(img_path) as img:
                        original_size = os.path.getsize(img_path)
                        width, height = img.size
                        
                        # Only resize if larger than MAX_WIDTH
                        if width > MAX_WIDTH:
                            print(f"Resizing {file}: {width}px -> {MAX_WIDTH}px")
                            ratio = MAX_WIDTH / float(width)
                            new_height = int(float(height) * float(ratio))
                            img = img.resize((MAX_WIDTH, new_height), Image.Resampling.LANCZOS)
                        
                        # Optimization
                        if CONVERT_TO_WEBP:
                            webp_path = os.path.splitext(img_path)[0] + ".webp"
                            img.save(webp_path, "WEBP", quality=QUALITY)
                            new_size = os.path.getsize(webp_path)
                            print(f"Optimized {file} -> {os.path.basename(webp_path)}: {original_size/1024/1024:.2f}MB -> {new_size/1024/1024:.2f}MB ({((original_size-new_size)/original_size)*100:.1f}% reduction)")
                        else:
                            # Save as original format but optimized
                            img.save(img_path, quality=QUALITY, optimize=True)
                            new_size = os.path.getsize(img_path)
                            print(f"Optimized {file} in-place: {original_size/1024/1024:.2f}MB -> {new_size/1024/1024:.2f}MB ({((original_size-new_size)/original_size)*100:.1f}% reduction)")
                            
                except Exception as e:
                    print(f"Error processing {file}: {e}")

if __name__ == "__main__":
    if not os.path.exists(IMAGE_DIR):
        print(f"Directory {IMAGE_DIR} not found.")
        sys.exit(1)
    
    optimize_images(IMAGE_DIR)
    print("--- Optimization Complete ---")
