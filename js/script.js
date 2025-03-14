document.addEventListener("DOMContentLoaded", function () {
    const frameSelect = document.getElementById("frameSelect");
    const fileInput = document.getElementById("uploadImage");
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const downloadBtn = document.getElementById("downloadBtn");

    // Tetapkan saiz canvas kepada 1080x1080
    canvas.width = 1080;
    canvas.height = 1080;

    let frameImage = new Image();
    let userImage = new Image();

    // Fungsi untuk memuatkan bingkai
    function updateFrame() {
        frameImage.src = frameSelect.value;
        frameImage.onload = drawCanvas;
    }

    // Apabila pengguna memilih gambar
    fileInput.addEventListener("change", function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                userImage.src = e.target.result;
                userImage.onload = drawCanvas;
            };
            reader.readAsDataURL(file);
        }
    });

    // Fungsi untuk melukis imej atas canvas
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

    // Muatkan bingkai awal
    updateFrame();
    frameSelect.addEventListener("change", updateFrame);
});
