document.addEventListener("DOMContentLoaded", function() {
    const frameSelector = document.getElementById("frameSelector");
    const photoFrame = document.getElementById("photoFrame");
    const uploadedCanvas = document.getElementById("uploadedCanvas");
    const fileInput = document.getElementById("imageInput");
    const downloadBtn = document.getElementById("downloadBtn");

    const canvas = document.getElementById("uploadedCanvas");
    const ctx = canvas.getContext("2d");

    // Function to update frame preview
    function updateFrame() {
        const selectedFrame = frameSelector.value;
        photoFrame.src = `assets/${selectedFrame}`;
    }

    frameSelector.addEventListener("change", updateFrame);

    fileInput.addEventListener("change", function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = new Image();
                img.onload = function() {
                    canvas.width = photoFrame.clientWidth;
                    canvas.height = photoFrame.clientHeight;
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    downloadBtn.addEventListener("click", function() {
        const downloadLink = document.createElement("a");
        downloadBtn.href = canvas.toDataURL("image/png");
        downloadBtn.download = "framed_photo.png";
        downloadBtn.click();
    });

    // Set default frame
    updateFrame();
});
