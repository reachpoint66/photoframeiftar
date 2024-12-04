// Get references to the elements
const uploadInput = document.getElementById("uploadInput");
const uploadBtn = document.getElementById("uploadBtn");
const downloadBtn = document.getElementById("downloadBtn");
const photoFrame = document.getElementById("photo-frame");

// Event listener for upload button
uploadBtn.addEventListener("click", () => {
    uploadInput.click(); // Trigger file input click
});

// Event listener for file input change (when user selects a file)
uploadInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            // Set the photo frame background to the uploaded image
            photoFrame.style.backgroundImage = `url(${e.target.result})`;
            downloadBtn.style.display = "inline";  // Show the download button
        };
        reader.readAsDataURL(file);
    }
});

// Event listener for download button
downloadBtn.addEventListener("click", () => {
    const imageUrl = photoFrame.style.backgroundImage.slice(5, -2);  // Extract image URL
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = "photo_frame_image.jpg";  // Download filename
    link.click();
});
