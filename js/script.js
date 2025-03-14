document.addEventListener('DOMContentLoaded', function () {
    const frameSelector = document.getElementById('frameSelector');
    const photoFrame = document.getElementById('photoFrame');
    const imageInput = document.getElementById('imageInput');
    const canvas = document.getElementById('uploadedCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 1080;
    canvas.height = 1080;

    function updateCanvas(image = null) {
        const frameImg = new Image();
        frameImg.src = photoFrame.src;
        
        frameImg.onload = function () {
            // Clear the canvas before redrawing
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            if (image) {
                const imageAspectRatio = image.width / image.height;
                const canvasAspectRatio = canvas.width / canvas.height;
                let drawWidth, drawHeight, offsetX, offsetY;

                if (imageAspectRatio > canvasAspectRatio) {
                    drawHeight = canvas.height;
                    drawWidth = drawHeight * imageAspectRatio;
                    offsetX = (canvas.width - drawWidth) / 2;
                    offsetY = 0;
                } else {
                    drawWidth = canvas.width;
                    drawHeight = canvas.width / imageAspectRatio;
                    offsetX = 0;
                    offsetY = (canvas.height - drawHeight) / 2;
                }

                ctx.clearRect(0, 0, canvas.width, canvas.height);
                if (image) {
                    ctx.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
                }
                ctx.drawImage(frameImg, 0, 0, canvas.width, canvas.height);
            };
    }

    frameSelector.addEventListener('change', function () {
        photoFrame.src = this.value;
        updateCanvas();
    });

    imageInput.addEventListener('change', function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const img = new Image();
                img.onload = function () {
                    updateCanvas(img);
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    document.getElementById('downloadBtn').addEventListener('click', function () {
        const downloadCanvas = document.createElement('canvas');
        downloadCanvas.width = canvas.width;
        downloadCanvas.height = canvas.height;
        const downloadCtx = downloadCanvas.getContext('2d');

        const frameImg = new Image();
        frameImg.src = photoFrame.src;

        frameImg.onload = function () {
            downloadCanvas.getContext('2d').drawImage(canvas, 0, 0, downloadCanvas.width, downloadCanvas.height);
            downloadCanvas.getContext('2d').drawImage(frameImg, 0, 0, downloadCanvas.width, downloadCanvas.height);

            const link = document.createElement('a');
            link.href = downloadCanvas.toDataURL('image/png');
            link.download = 'framed_image.png';
            link.click();
        };
    });
});
