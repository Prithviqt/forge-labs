import cv2
import os
import time

video_path = "public/forge-creatine-transition.mp4.mp4"
output_dir = "public/hero-frames"

os.makedirs(output_dir, exist_ok=True)

cap = cv2.VideoCapture(video_path)
if not cap.isOpened():
    print("Error opening video file")
    exit(1)

fps = cap.get(cv2.CAP_PROP_FPS)
total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
duration = total_frames / fps if fps > 0 else 0

print(f"Original FPS: {fps}, Total Frames: {total_frames}, Duration: {duration:.2f}s")

# Extract at ~12 fps for optimal smooth scrub + fast memory/network load
target_fps = 12
sample_interval = max(1, int(fps / target_fps))

frame_count = 0
extracted_count = 0

start_time = time.time()

while True:
    ret, frame = cap.read()
    if not ret:
        break
    
    if frame_count % sample_interval == 0:
        extracted_count += 1
        out_filename = os.path.join(output_dir, f"frame_{extracted_count:04d}.jpg")
        # Resize frame slightly to 1280x720 for super fast decoding and lightweight memory
        resized_frame = cv2.resize(frame, (1280, 720), interpolation=cv2.INTER_AREA)
        cv2.imwrite(out_filename, resized_frame, [cv2.IMWRITE_JPEG_QUALITY, 82])
        
    frame_count += 1

cap.release()
print(f"Done! Extracted {extracted_count} frames to {output_dir} in {time.time() - start_time:.2f}s")
