import { useState } from 'react';
import finalAssetsArr from '../utils/website-data';

let loadingPercentageTracker = 0,
    progressCirclePathLength = 283;

const pageLoadingPercentageTextEl = document.querySelector('.loading_percentage_text');
const progressCircleSVG = document.querySelector('.preloader_progress_circle_svg');
const welcomeTextEl = document.querySelector('.welcome_text_container');

function ShowImages({ assetsArr, setImagesLoaded }) {
    const onLoad = () => {
        loadingPercentageTracker++;

        let percentage = Math.ceil((loadingPercentageTracker / assetsArr.length) * 100);
        if (percentage >= 99) percentage = 100;

        const strokeDashOffsetVal =
            progressCirclePathLength - Math.ceil(progressCirclePathLength * (percentage / 100));

        pageLoadingPercentageTextEl.classList.add('appear');
        pageLoadingPercentageTextEl.textContent = `${percentage}%`;

        progressCircleSVG.style.setProperty('--dashoffset-val', strokeDashOffsetVal);

        if (loadingPercentageTracker === assetsArr.length - 1) {
            setImagesLoaded(true);

            setTimeout(() => {
                progressCircleSVG.classList.add('completion');

                progressCircleSVG.addEventListener('transitionend', () => {
                    welcomeTextEl.classList.add('appear');
                });
            }, 1000);
        }
    };

    return (
        <div style={{ opacity: '0', visibility: 'hidden', pointerEvents: 'none' }}>
            {assetsArr.map((asset, index) => (
                <img src={asset} onLoad={() => onLoad(index)} key={index} />
            ))}
        </div>
    );
}

const AssetsPreloader = ({ children }) => {
    const [imagesLoaded, setImagesLoaded] = useState(false);

    return (
        <>
            {!imagesLoaded && (
                <ShowImages assetsArr={finalAssetsArr} setImagesLoaded={setImagesLoaded} />
            )}
            {imagesLoaded && children}
        </>
    );
};
export default AssetsPreloader;
