document.addEventListener("DOMContentLoaded", function() {
    const frameSelector = document.getElementById("frameSelector");
    const photoFrame = document.getElementById("photoFrame");
    const uploadedCanvas = document.getElementById("uploadedCanvas");
    const fileInput = document.getElementById("fileInput");
    const downloadBtn = document.getElementById("downloadBtn");

    frameSelector.addEventListener("change", function() {
        photoFrame.src = this.value;
    });

    fileInput.addEventListener("change", function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const canvas = document.getElementById("uploadedCanvas");
                const ctx = canvas.getContext("2d");
                const img = new Image();
                img.onload = function() {
                    canvas.width = this.width;
                    canvas.height = this.height;
                    const ctx = canvas.getContext("2d");
                    ctx.drawImage(this, 0, 0, canvas.width, canvas.height);
                };
                reader.readAsDataURL(file);
                reader.onloadend = function() {
                    document.getElementById("uploadedCanvas").src = reader.result;
                };
            };
            reader.readAsDataURL(file);
        }
    });

    downloadBtn.addEventListener("click", function() {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const frame = document.getElementById("photoFrame");
        const uploadedImage = document.getElementById("uploadedCanvas");

        if (!uploadedImage.src || uploadedImage.src.indexOf("data:image") === -1) {
            alert("Please upload an image first.");
            return;
        }

        canvas.width = frame.width;
        canvas.height = frame.height;

        ctx.drawImage(uploadedImage, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(frame, 0, 0, canvas.width, canvas.height);

        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "framed_photo.png";
        link.click();
    });
});
