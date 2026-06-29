function setup() {
    createCanvas(windowWidth, windowHeight);
    setupCamera();
}

const getDistance = (a, b) => {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy);
};

const useBindi = () => {
    if (!handLandmarks.length || !faceLandmarks.length) {
        shouldShowBindi = false;
        return;
    }

    shouldShowBindi = handLandmarks.some((hand) => {
        const face = faceLandmarks[0];
        const indexTip = hand[8];
        const facePoint = face[9];

        const distance = getDistance(indexTip, facePoint);

        const threshold = 0.01;
        return distance < threshold;
    });
};

const drawBindi = () => {
    if (!shouldShowBindi || !faceLandmarks.length) return;

    const p = faceLandmarks[0][9];

    const x = p.x * width;
    const y = p.y * height;

    noStroke();
    fill(255, 0, 0);
    circle(x, y, 15);
};

function draw() {
    background(0);

    push();
    translate(width, 0);
    scale(-1, 1);

    processCamera();
    drawHands();
    drawFace();
    useBindi();
    drawBindi();
    pop();
}
