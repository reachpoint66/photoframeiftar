document.getElementById("uploadBtn").addEventListener("change", function(event) {
    var file = event.target.files[0];
    if (file) {
        var reader = new FileReader();
        reader.onload = function(e) {
            var img = new Image();
            img.onload = function() {
                var canvas = document.getElementById("photoCanvas");
                var ctx = canvas.getContext("2d");

                // Set canvas size based on image
                canvas.width = img.width;
                canvas.height = img.height;

                // Draw the uploaded image
                ctx.drawImage(img, 0, 0);

                // Show the frame
                var frame = document.getElementById("frame");
                frame.style.display = "block";

                // Draw the frame over the image
                var frameImg = new Image();
                frameImg.onload = function() {
                    ctx.drawImage(frameImg, 0, 0, canvas.width, canvas.height);
                };
                frameImg.src = frame.src;

                // Show the download button
                document.getElementById("downloadBtn").style.display = "block";
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

document.getElementById("downloadBtn").addEventListener("click", function() {
    var canvas = document.getElementById("photoCanvas");
    var dataUrl = canvas.toDataURL("image/png");

    // Create a temporary link element to trigger the download
    var link = document.createElement("a");
    link.href = dataUrl;
    link.download = "photo_with_frame.png";
    link.click();
});
