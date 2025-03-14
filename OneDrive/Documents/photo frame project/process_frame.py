from PIL import Image

def add_frame(user_image_path, frame_path, output_path):
    # Buka gambar pengguna dan template frame tanpa metadata
    user_image = Image.open(user_image_path).convert("RGBA")
    frame = Image.open(frame_path).convert("RGBA")

    # Resize gambar pengguna untuk sesuai dengan frame
    user_image = user_image.resize(frame.size)

    # Gabungkan gambar pengguna dengan frame
    frame.paste(user_image, (0, 0), mask=user_image)

    # Tukar kepada RGB untuk menyimpan sebagai JPEG
    result = frame.convert("RGB")

    # Buang metadata dengan membuka dan menyimpan semula imej
    with Image.new("RGB", result.size) as stripped_image:
        stripped_image.paste(result)
        stripped_image.save(output_path, format="JPEG", optimize=True)

# Contoh penggunaan
add_frame("uploaded_image.jpg", "photo_frame.png", "output_image.jpg")
print("Gambar selesai diproses: output_image.jpg")
