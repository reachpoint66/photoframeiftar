document.getElementById('imageInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const uploadedImage = document.getElementById('uploadedImage');
            uploadedImage.src = e.target.result;
            uploadedImage.style.display = 'block';  // Show the uploaded image
        };
        reader.readAsDataURL(file);
    }
});

document.getElementById('downloadBtn').addEventListener('click', function() {
    const uploadedImage = document.getElementById('uploadedImage');
    const photoFrame = document.getElementById('photoFrame');

    if (uploadedImage.src) {
        // Create a canvas to combine the images
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Set the canvas size to match the frame size
        canvas.width = photoFrame.width;
        canvas.height = photoFrame.height;

        // Draw the photo frame
        ctx.drawImage(photoFrame, 0, 0, canvas.width, canvas.height);

        // Draw the uploaded image on top of the frame
        ctx.drawImage(uploadedImage, 0, 0, canvas.width, canvas.height);

        // Create a downloadable link
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');  // Get the image from canvas
        link.download = 'combined_image.png';
        link.click();
    } else {
        alert('No image to download');
    }
});
