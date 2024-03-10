import { useCallback, useEffect, useRef, useState } from 'react';
import { useMotionValueEvent, useScroll, useTransform } from 'framer-motion';

import { imgSeqPicsArr } from '../utils/website-data';

import styles from './HeroImgSeq.module.css'

function getCurrentFrame(index) {
    return imgSeqPicsArr[index];
}

const HeroImgSeq = () => {
    const heroCanvasRef = useRef(null);
    const imgSeqScrollTrackerRef = useRef(null);

    const [imagesSeqArr, setImagesSeqArr] = useState([]);
    const [frameIndex, setFrameIndex] = useState(0);
    const [context, setContext] = useState(null);

    const { scrollYProgress: imgSeqScrollTrackerYProgress } = useScroll({
        target: imgSeqScrollTrackerRef,
        offset: ['0 0', '1 0.9'],
    });

    const imgSeqArrIdx = useTransform(
        imgSeqScrollTrackerYProgress,
        [0, 1],
        [0, imgSeqPicsArr.length - 1]
    );

    useMotionValueEvent(imgSeqArrIdx, 'change', latest => {
        setFrameIndex(Math.floor(latest));
    });

    function preloadImages() {
        for (let i = 0; i < imgSeqPicsArr.length; i++) {
            const img = new Image();
            const imgSrc = getCurrentFrame(i);
            img.src = imgSrc;
            setImagesSeqArr(prevImages => [...prevImages, img]);
        }
    }

    const scaleImage = useCallback(
        img => {
            if (!context) return;
            var canvas = context.canvas;
            var hRatio = canvas.width / img.width;
            var vRatio = canvas.height / img.height;
            var ratio = Math.max(hRatio, vRatio);
            var centerShift_x = (canvas.width - img.width * ratio) / 2;
            var centerShift_y = canvas.height - img.height * ratio;

            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(
                img,
                0,
                0,
                img.width,
                img.height,
                centerShift_x,
                centerShift_y,
                img.width * ratio,
                img.height * ratio
            );
        },
        [context]
    );

    useEffect(() => {
        preloadImages();
        scaleImage(imagesSeqArr[0]);

        const resizeBrowser = () => {
            context.canvas.width = window.innerWidth;
            context.canvas.height = window.innerHeight;
            scaleImage(imagesSeqArr[frameIndex]);
        };
        window.addEventListener('resize', resizeBrowser);

        return () => window.removeEventListener('resize', resizeBrowser);
    }, [context, scaleImage]);

    useEffect(() => {
        if (!heroCanvasRef.current || imagesSeqArr.length < 1) {
            return;
        }

        const context = heroCanvasRef.current.getContext('2d');
        context.canvas.width = window.innerWidth;
        context.canvas.height = window.innerHeight;
        setContext(context);

        let requestId;

        const render = () => {
            // resizeCanvas();
            scaleImage(imagesSeqArr[frameIndex]);
            requestId = requestAnimationFrame(render);
        };

        render();

        return () => cancelAnimationFrame(requestId);
    }, [frameIndex, imagesSeqArr, scaleImage]);

    return (
        <div className={styles.hero_image_sequence_container}>
            <canvas className={styles.image_sequence_canvas} ref={heroCanvasRef} />
            <div
                className={styles.image_sequence_scroll_tracker}
                ref={imgSeqScrollTrackerRef}
            />
        </div>
    );
};
export default HeroImgSeq;
