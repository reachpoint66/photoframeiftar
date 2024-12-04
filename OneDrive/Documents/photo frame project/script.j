document.getElementById("downloadBtn").addEventListener("click", function() {
    var image = document.getElementById("frame-image"); // Mendapatkan gambar dari bingkai
    var link = document.createElement("a"); // Membuat elemen 'a' untuk pautan
    link.href = image.src; // Mengambil URL imej
    link.download = "downloaded-image.jpg"; // Nama fail apabila dimuat turun
    link.click(); // Melakukan klik secara automatik untuk memuat turun
});
