const easeInOutQuad = (t) => {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
};

document.addEventListener('DOMContentLoaded', () => {
    const h2 = document.querySelector('.banner__info h2');
    const h1 = document.querySelector('.banner__info h1');
    h1.style.transform = `translateX(-100%)`

    const pic1 = document.querySelector('.banner__pic1');
    const pic2 = document.querySelector('.banner__pic2');
    const pic3 = document.querySelector('.banner__pic3');
    const pic4 = document.querySelector('.banner__pic4');

    let startDrop = null;
    let startScale = null;
    let startRoll = null;
    let startRotate = null;
    const dropDuration = 500;
    const scaleDuration = 500;
    const rollDuration = 1000;
    const rotateDuration = 1000;
    const initialScale = 0.5;
    const finalScale = 1.0;
    const initialSecondTitleY = -50;
    const finalSecondTitleY = 0;
    const initialFirstTitleX = -100;
    const finalFirstTitleX = 0;
    const initialOpacity = 0;
    const finalOpacity = 1;

    const drop = (timestamp) => {
        if (!startDrop) startDrop = timestamp;
        const progress = timestamp - startDrop;
        const progressRatio = Math.min(progress / dropDuration, 1);

        const currentY = initialSecondTitleY + (finalSecondTitleY - initialSecondTitleY) * progressRatio;
        const currentOpacity = initialOpacity + (finalOpacity - initialOpacity) * progressRatio;

        h2.style.transform = `translateY(${currentY}px) scale(${initialScale})`;
        h2.style.opacity = currentOpacity;

        if (progress < dropDuration) {
            requestAnimationFrame(drop);
        } else {
            startDrop = null;
            requestAnimationFrame(scale);
        }
    };

    const scale = (timestamp) => {
        if (!startScale) startScale = timestamp;
        const progress = timestamp - startScale;
        const progressRatio = Math.min(progress / scaleDuration, 1);

        const currentScale = initialScale + (finalScale - initialScale) * progressRatio;

        h2.style.transform = `translateY(${finalSecondTitleY}px) scale(${currentScale})`;

        if (progress < scaleDuration) {
            requestAnimationFrame(scale);
        } else {
            startScale = null;
            requestAnimationFrame(roll);
            requestAnimationFrame(() => rotateElement(pic1, -20));
            requestAnimationFrame(() => rotateElement(pic2, 20));
            requestAnimationFrame(() => rotateElement(pic3, 20));
            requestAnimationFrame(() => rotateElement(pic4, -20));
        }
    };

    const roll = (timestamp) => {
        if (!startRoll) startRoll = timestamp;
        const progress = timestamp - startRoll;
        const progressRatio = Math.min(progress / rollDuration, 1);

        const easedProgress = easeInOutQuad(progressRatio);
        const currentX = initialFirstTitleX + (finalFirstTitleX - initialFirstTitleX) * easedProgress;

        h1.style.transform = `translateX(${currentX}px)`;

        if (progress < rollDuration) {
            requestAnimationFrame(roll);
        } else {
            startRoll = null
        }
    };

    const rotateElement = (element, rotationAngle) => {
        if (!startRotate) startRotate = performance.now();
        const rotate = (timestamp) => {
            const progress = timestamp - startRotate;

            let currentAngle;
            if (progress < rotateDuration / 2) {
                currentAngle = rotationAngle * (progress / (rotateDuration / 2));
            } else {
                currentAngle = rotationAngle * (2 - (progress / (rotateDuration / 2)));
            }

            element.style.transform = `rotate(${currentAngle}deg)`;

            if (progress < rotateDuration) {
                requestAnimationFrame(rotate);
            } else {
                startRotate = null;
            }
        };

        requestAnimationFrame(rotate);
    };

    requestAnimationFrame(drop);
});
