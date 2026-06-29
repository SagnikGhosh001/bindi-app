const setupCamera = () => {
    video = createCapture(VIDEO);
    video.size(width, height);
    video.hide();

    hands = new Hands({
        locateFile: (file) =>
            `https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4/${file}`,
    });

    hands.setOptions({
        maxNumHands: 2,
        modelComplexity: 1,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
    });

    hands.onResults((results) => {
        handLandmarks = results.multiHandLandmarks || [];
    });

    faceMesh = new FaceMesh({
        locateFile: (file) => {
            return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@0.4/${file}`;
        },
    });

    faceMesh.setOptions({
        maxNumFaces: 1,
        refineLandmarks: true,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
    });

    faceMesh.onResults((results) => {
        faceLandmarks = results.multiFaceLandmarks || [];
    });
};

const processCamera = async () => {
    image(video, 0, 0, width, height);

    if (video.elt.readyState < 2 || isProcessing) return;

    isProcessing = true;

    try {
        await hands.send({ image: video.elt });
        await faceMesh.send({ image: video.elt });
    } finally {
        isProcessing = false;
    }

    console.log(handLandmarks);
    console.log(faceLandmarks);
};
