document.getElementById('imageInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const uploadedImage = document.getElementById('uploadedImage');
            uploadedImage.src = e.target.result;
            uploadedImage.style.display = 'block'; // Show the uploaded image
        };
        reader.readAsDataURL(file);
    }
});

document.getElementById('downloadBtn').addEventListener('click', function() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    // Get the frame and uploaded image
    const photoFrame = document.getElementById('photoFrame');
    const uploadedImage = document.getElementById('uploadedImage');

    // Set canvas size to match frame
    canvas.width = photoFrame.naturalWidth;
    canvas.height = photoFrame.naturalHeight;

    // Draw the frame and uploaded image on the canvas
    ctx.drawImage(photoFrame, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(uploadedImage, 0, 0, canvas.width, canvas.height);

    // Create a link to download the image
    canvas.toBlob(function(blob) {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'framed_image.png';
        link.click();
    }, 'image/png');
});
