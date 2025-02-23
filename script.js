// Handle Login Page
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    document.getElementById('login-page').style.display = 'none';
    document.getElementById('facial-recognition-page').style.display = 'block';
    startFacialRecognition();
});

// Load models from /models/ and log success
async function loadModels() {
    try {
        console.log("⏳ Loading models...");
        await faceapi.nets.ssdMobilenetv1.loadFromUri('models');  // Face detection
        await faceapi.nets.tinyFaceDetector.loadFromUri('models'); // Alternative face detector
        await faceapi.nets.faceExpressionNet.loadFromUri('models'); // Emotion detection
        await faceapi.nets.faceLandmark68Net.loadFromUri('models'); // Facial landmarks
        console.log("✅ All Models Loaded Successfully!");
    } catch (error) {
        console.error("❌ Model Loading Error: ", error);
    }
}

// Start facial recognition
async function startFacialRecognition() {
    await loadModels();

    const video = document.getElementById('videoElement');
    const emotionDisplay = document.getElementById('emotion-display');
    
    // Start webcam
    const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
    video.srcObject = stream;

    video.addEventListener('play', async () => {
        console.log("🎥 Video started...");
        
        // Create and append a canvas for drawing
        const canvas = faceapi.createCanvasFromMedia(video);
        document.body.appendChild(canvas);
        const displaySize = { width: video.width, height: video.height };
        faceapi.matchDimensions(canvas, displaySize);

        setInterval(async () => {
            const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
                .withFaceLandmarks()
                .withFaceExpressions();

            // Log detections for debugging
            console.log("🔍 Detection Data:", detections);

            // Clear previous drawings
            const ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw face detections
            const resizedDetections = faceapi.resizeResults(detections, displaySize);
            faceapi.draw.drawDetections(canvas, resizedDetections);
            faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
            faceapi.draw.drawFaceExpressions(canvas, resizedDetections);

            // Show detected emotions
            if (detections.length > 0) {
                const expressions = detections[0].expressions;
                console.log("😃 Expressions:", expressions);

                let maxExpression = Object.keys(expressions).reduce((a, b) =>
                    expressions[a] > expressions[b] ? a : b
                );

                emotionDisplay.innerHTML = `<p>Detected Emotion: <strong>${maxExpression.toUpperCase()}</strong></p>`;

                // Redirect based on detected emotion
                if (expressions[maxExpression] > 0.6) {  // Only trigger redirect if emotion confidence is high
                    redirectToPage(maxExpression);
                }
            } else {
                emotionDisplay.innerHTML = `<p>No face detected. Please try again.</p>`;
            }
        }, 500);
    });
}

// Redirect based on the detected emotion
function redirectToPage(emotion) {
    let url = "";

    switch (emotion) {
        case "happy":
            url = "dashboard.html";
            break;
        case "sad":
            url = "dashboard.html";
            break;
        case "angry":
            url = "dashboard.html";
            break;
        case "surprised":
            url = "dashboard.html";
            break;
        default:
            url = "dashboard.html";
            break;
    }

    // Redirect to the corresponding URL
    window.location.href = url;
}
