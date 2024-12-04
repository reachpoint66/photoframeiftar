document.getElementById('imageInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const uploadedImage = new Image();
            uploadedImage.src = e.target.result;
            uploadedImage.onload = function() {
                const canvas = document.getElementById('canvas');
                const ctx = canvas.getContext('2d');
                
                // Gambar frame
                const photoFrame = new Image();
                photoFrame.src = 'photo_frame.png';
                photoFrame.onload = function() {
                    // Lukis frame dan gambar
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.drawImage(photoFrame, 0, 0, canvas.width, canvas.height);  // Gambar frame
                    ctx.drawImage(uploadedImage, 50, 50, 200, 300);  // Gambar yang dimuat naik
                    
                    // Butang download kini aktif
                    document.getElementById('downloadBtn').disabled = false;
                };
            };
        };
        reader.readAsDataURL(file);
    }
});

// Fungsi untuk muat turun gambar
document.getElementById('downloadBtn').addEventListener('click', function() {
    const canvas = document.getElementById('canvas');
    const imageUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'combined_image.png';
    link.click();
});
