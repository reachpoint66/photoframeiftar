document.addEventListener("DOMContentLoaded", function() {
    const frameSelector = document.getElementById("frameSelector");
    const photoFrame = document.getElementById("photoFrame");
    const fileInput = document.getElementById("fileInput");
    const downloadBtn = document.getElementById("downloadBtn");

    // Fungsi untuk mengubah bingkai
    function updateFrame() {
        const selectedFrame = frameSelector.value;
        console.log("Selected Frame:", selectedFrame); // Debugging
        photoFrame.src = "assets/" + selectedFrame;
    }

    frameSelector.addEventListener("change", updateFrame);

    fileInput.addEventListener("change", function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = new Image();
                img.onload = function() {
                    const canvas = document.createElement("canvas");
                    const ctx = canvas.getContext("2d");

                    // Tetapkan saiz canvas mengikut saiz bingkai
                    canvas.width = photoFrame.width;
                    canvas.height = photoFrame.height;

                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                    ctx.drawImage(photoFrame, 0, 0, canvas.width, canvas.height);

                    // Simpan imej yang diubah pada kanvas
                    document.getElementById("uploadedCanvas").src = canvas.toDataURL("image/png");
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // Fungsi untuk muat turun gambar dengan bingkai
    downloadBtn.addEventListener("click", function() {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        const uploadedImage = document.getElementById("uploadedCanvas");
        if (!uploadedImage.src || uploadedImage.src.indexOf("data:image") === -1) {
            alert("Sila muat naik gambar terlebih dahulu.");
            return;
        }

        canvas.width = photoFrame.width;
        canvas.height = photoFrame.height;

        ctx.drawImage(uploadedImage, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(photoFrame, 0, 0, canvas.width, canvas.height);

        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "framed_photo.png";
        link.click();
    });
});
