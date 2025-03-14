from flask import Flask, request, send_file
from PIL import Image

app = Flask(__name__)

@app.route('/', methods=['GET'])
def home():
    return '''
    <h1>Welcome!</h1>
    <p>Use <a href="/upload">/upload</a> to upload your image.</p>
    '''

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'image' not in request.files:
        return 'No file part', 400
    file = request.files['image']
    if file.filename == '':
        return 'No selected file', 400

    try:
        # Buka gambar yang dimuat naik dan pastikan ia dalam format RGBA untuk transparansi
        user_image = Image.open(file).convert("RGBA")
        print(f"Uploaded image size: {user_image.size}")  # Log saiz gambar yang dimuat naik
    except Exception as e:
        return f"Error processing image: {e}", 400

    try:
        # Buka frame PNG yang perlu digunakan, pastikan ia dalam format RGBA juga
        frame = Image.open("photo_frame.png").convert("RGBA")
        print(f"Frame size: {frame.size}")  # Log saiz frame
    except Exception as e:
        return f"Error loading frame: {e}", 400

    # Mengambil saiz gambar dan frame
    image_width, image_height = user_image.size
    frame_width, frame_height = frame.size

    # Log saiz untuk pemeriksaan
    print(f"Image width: {image_width}, Image height: {image_height}")
    print(f"Frame width: {frame_width}, Frame height: {frame_height}")

    # Mengubah saiz gambar supaya ia sama dengan saiz frame (1:1)
    user_image = user_image.resize((frame_width, frame_height), Image.Resampling.LANCZOS)

    # Membuat kanvas kosong untuk menampung gambar dan frame
    final_image = Image.new("RGBA", (frame_width, frame_height), (0, 0, 0, 0))

    # Pastikan gambar berada di tengah dalam frame
    x_offset = 0  # Gambar akan memenuhi ruang frame, tidak perlu mengira offset
    y_offset = 0

    print(f"Pasting image at offset: ({x_offset}, {y_offset})")

    # Paste gambar di tengah-tengah frame
    final_image.paste(user_image, (x_offset, y_offset), user_image.split()[3])  # Gambar memenuhi seluruh ruang frame

    # Paste frame di atas gambar
    final_image.paste(frame, (0, 0), frame)

    # Log untuk memastikan gambar telah dipaste ke dalam frame
    print("Image pasted into frame.")

    # Tukar imej ke format RGB untuk JPEG dan simpan
    result = final_image.convert("RGB")
    
    # Kosongkan metadata untuk mengelakkan masalah XMP
    result.info = {}

    # Simpan imej sebagai JPEG
    output_path = "output_image.jpg"
    result.save(output_path, format="JPEG", quality=95, optimize=True)
    print(f"Image saved to {output_path}")

    return send_file(output_path, mimetype='image/jpeg')

if __name__ == "__main__":
    app.run(debug=True)
