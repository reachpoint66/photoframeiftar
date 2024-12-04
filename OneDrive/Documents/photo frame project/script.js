document.getElementById('imageInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const uploadedImage = document.getElementById('uploadedImage');
            uploadedImage.src = e.target.result;
            uploadedImage.style.display = 'block';  // Tampilkan gambar yang dimuat naik

            // Setelah gambar dimuat naik, lukis ke dalam canvas
            uploadedImage.onload = function() {
                const canvas = document.getElementById('canvas');
                const ctx = canvas.getContext('2d');
                
                // Tetapkan saiz canvas untuk sepadan dengan saiz frame
                canvas.width = 300; // Lebar frame
                canvas.height = 400; // Tinggi frame

                // Lukis frame dahulu (latar belakang)
                const photoFrame = document.getElementById('photoFrame');
                ctx.drawImage(photoFrame, 0, 0, canvas.width, canvas.height);
                
                // Lukis gambar yang dimuat naik di atas frame
                ctx.drawImage(uploadedImage, 0, 0, canvas.width, canvas.height);
            };
        };
        reader.readAsDataURL(file);
    }
});

document.getElementById('downloadBtn').addEventListener('click', function() {
    const canvas = document.getElementById('canvas');
    if (canvas.toDataURL()) {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'photo_frame_image.png';
        link.click();
    } else {
        alert('Tiada gambar untuk dimuat turun');
    }
});
