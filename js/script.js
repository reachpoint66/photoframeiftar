document.addEventListener("DOMContentLoaded", function() {
    const frameSelector = document.getElementById("frameSelector");
    const fileInput = document.getElementById("fileInput");
    const canvas = document.getElementById("photoCanvas");
    const ctx = canvas.getContext("2d");
    const downloadBtn = document.getElementById("downloadBtn");

    // Set saiz canvas
    canvas.width = 500;
    canvas.height = 500;

    let selectedFrame = "assets/1.png"; // Bingkai default

    // Fungsi untuk kemaskini bingkai
    function updateFrame() {
        selectedFrame = "assets/" + frameSelector.value;
        drawImage(); // Lukis semula apabila bingkai ditukar
    }

    frameSelector.addEventListener("change", updateFrame);

    let uploadedImage = null;

    // Fungsi untuk upload gambar
    fileInput.addEventListener("change", function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                uploadedImage = new Image();
                uploadedImage.src = e.target.result;
                uploadedImage.onload = drawImage;
            };
            reader.readAsDataURL(file);
        }
    });

    // Fungsi untuk melukis gambar dan bingkai
    function drawImage() {
        const frame = new Image();
        frame.src = selectedFrame;
        frame.onload = function() {
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Kosongkan canvas

            if (uploadedImage) {
                ctx.drawImage(uploadedImage, 50, 50, 400, 400); // Lukis gambar yang diupload
            }

            ctx.drawImage(frame, 0, 0, canvas.width, canvas.height); // Lukis bingkai di atas gambar
        };
    }

    // Fungsi untuk muat turun gambar
    downloadBtn.addEventListener("click", function() {
        const link = document.createElement("a");
        link.download = "photo_with_frame.png";
        link.href = canvas.toDataURL();
        link.click();
    });
});
