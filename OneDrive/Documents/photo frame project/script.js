// Mengendalikan muat naik gambar
document.getElementById('imageUpload').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            // Memaparkan gambar yang dimuat naik di dalam frame
            const uploadedImage = document.getElementById('uploadedImage');
            uploadedImage.src = e.target.result;
            uploadedImage.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
});

// Fungsi untuk muat turun gambar
document.getElementById('downloadBtn').addEventListener('click', function() {
    const frame = document.getElementById('frame');
    const uploadedImage = document.getElementById('uploadedImage');

    // Buat kanvas untuk gambar
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = frame.width;
    canvas.height = frame.height;

    // Lukis gambar frame dan gambar yang dimuat naik ke kanvas
    ctx.drawImage(frame, 0, 0, frame.width, frame.height);
    ctx.drawImage(uploadedImage, 25, 25, uploadedImage.width, uploadedImage.height); // Sesuaikan kedudukan gambar

    // Membuat gambar dari kanvas dan muat turun
    const dataUrl = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = 'photo_frame_with_image.png';
    a.click();
});
