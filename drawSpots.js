const drawHands = () => {
    if (!handLandmarks.length) return;

    for (const hand of handLandmarks) {
        // for (const point of hand) {
        //     const realX = point.x * windowWidth;
        //     const realY = point.y * windowHeight;
        //     circle(realX, realY, 10);
        // }
        const realX = hand[8].x * windowWidth;
        const realY = hand[8].y * windowHeight;
        circle(realX, realY, 10);
    }
};

const drawFace = () => {
    if (!faceLandmarks.length) return;

    for (const face of faceLandmarks) {
        // for (const point of face) {
        //     const realX = point.x * windowWidth;
        //     const realY = point.y * windowHeight;
        //     circle(realX, realY, 2);
        // }
        const realX = face[9].x * windowWidth;
        const realY = face[9].y * windowHeight;
        circle(realX, realY, 5);
    }
};
