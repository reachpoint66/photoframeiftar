document.getElementById('imageInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const uploadedImage = document.getElementById('uploadedImage');
            uploadedImage.src = e.target.result;
            uploadedImage.style.display = 'block';  // Show the uploaded image

            // Draw image into canvas after it is loaded
            uploadedImage.onload = function() {
                const canvas = document.getElementById('canvas');
                const ctx = canvas.getContext('2d');
                
                // Set canvas size to match the frame size
                canvas.width = 300; // width of the frame
                canvas.height = 400; // height of the frame

                // Draw the frame first
                const photoFrame = document.getElementById('photoFrame');
                ctx.drawImage(photoFrame, 0, 0, canvas.width, canvas.height);
                
                // Draw the uploaded image over the frame
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
        alert('No image to download');
    }
});
