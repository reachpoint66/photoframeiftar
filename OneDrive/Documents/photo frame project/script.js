// Dapatkan elemen-elemen dari HTML
const uploadInput = document.getElementById("uploadInput");
const uploadBtn = document.getElementById("uploadBtn");
const downloadBtn = document.getElementById("downloadBtn");
const photoFrame = document.getElementById("photo-frame");

// Event listener untuk butang upload
uploadBtn.addEventListener("click", () => {
    uploadInput.click(); // Trigger klik pada input fail
});

// Event listener untuk perubahan input fail (apabila gambar dipilih)
uploadInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            // Set gambar dalam photo frame
            photoFrame.style.backgroundImage = `url(${e.target.result})`;
            downloadBtn.style.display = "inline";  // Tunjukkan butang download
        };
        reader.readAsDataURL(file);
    }
});

// Event listener untuk butang download
downloadBtn.addEventListener("click", () => {
    const imageUrl = photoFrame.style.backgroundImage.slice(5, -2);  // Ambil URL gambar
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = "photo_frame_image.jpg";  // Nama fail untuk muat turun
    link.click();
});
