document.addEventListener("DOMContentLoaded", function () {
    const frameSelector = document.getElementById("frameSelector");
    const fileInput = document.getElementById("fileInput");
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const downloadBtn = document.getElementById("downloadBtn");

    // Set ukuran canvas
    canvas.width = 500;
    canvas.height = 500;

    let frameImage = new Image();
    let userImage = new Image();

    // Fungsi untuk update frame
    function updateFrame() {
        const frameFile = `assets/${frameSelector.value}`;
        frameImage.src = frameFile;

        frameImage.onload = function () {
            drawCanvas();
        };
    }

    // Apabila pengguna pilih gambar
    fileInput.addEventListener("change", function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                userImage.src = e.target.result;
                userImage.onload = function () {
                    drawCanvas();
                };
            };
            reader.readAsDataURL(file);
        }
    });

    // Fungsi untuk melukis pada canvas
    function drawCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (userImage.src) {
            ctx.drawImage(userImage, 0, 0, canvas.width, canvas.height);
        }
        if (frameImage.src) {
            ctx.drawImage(frameImage, 0, 0, canvas.width, canvas.height);
        }
    }

    // Muat turun gambar
    downloadBtn.addEventListener("click", function () {
        const link = document.createElement("a");
        link.download = "photo_with_frame.png";
        link.href = canvas.toDataURL();
        link.click();
    });

    // Muatkan frame awal
    updateFrame();
    frameSelector.addEventListener("change", updateFrame);
});
