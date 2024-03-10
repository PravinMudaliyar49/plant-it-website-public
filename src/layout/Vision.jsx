import { useRef } from 'react';
import { useMotionValueEvent, useTransform, useReducedMotion } from 'framer-motion';

import { useGlobalContext } from '../store';
import useCheckMobileScreen from '../hooks/use-mobileScreen';
import { visionSectionData } from '../utils/website-data';

import styles from './Vision.module.css';

const { visionBgLM, visionBgSL, visionBgLL, visionBgM, plantsPlantedCount } = visionSectionData;
const plantsPlantedAnimationNumbersArr = [
    `0720582${plantsPlantedCount[0]}`,
    `0034567${plantsPlantedCount[1]}`,
    `0295520${plantsPlantedCount[2]}`,
    '*+*+*+*+',
];

const Vision = () => {
    const { footerEmptySpaceScrollYProgress, activateVisionSection } = useGlobalContext();

    const visionImgContRef = useRef(null);
    const visionContentContRef = useRef(null);

    const isMobile = useCheckMobileScreen();
    const isReduced = useReducedMotion();

    useMotionValueEvent(footerEmptySpaceScrollYProgress, 'change', latest => {
        if (latest > 0.4) {
            visionContentContRef.current.classList.add(`${styles.hide}`);
        } else {
            visionContentContRef.current.classList.remove(`${styles.hide}`);
        }
    });

    const visionImgParallaxTransform = useTransform(
        footerEmptySpaceScrollYProgress,
        [0, 1],
        [0, 9]
    );
    useMotionValueEvent(visionImgParallaxTransform, 'change', latest => {
        if (isMobile || isReduced) return;

        visionImgContRef.current.animate(
            { transform: `translateY(-${latest}%)` },
            { duration: 600, fill: 'forwards' }
        );
    });

    return (
        <section className={`section ${styles.vision_section}`}>
            <div className={styles.vision_section_container}>
                <div className={styles.vision_section_img_container} ref={visionImgContRef}>
                    <picture>
                        <source srcSet={visionBgM} media="(min-width: 1900px)" />
                        <source srcSet={visionBgLL} media="(min-width: 1450px)" />
                        <source srcSet={visionBgSL} media="(min-width: 751px)" />
                        <img src={visionBgLM} alt={`Vision image Abhishek picture`} />
                    </picture>
                </div>
                <div
                    className={`${styles.vision_section_content_container} ${
                        activateVisionSection ? `${styles.animate_text}` : ''
                    }`}
                    ref={visionContentContRef}
                >
                    <p className={`${styles.vision_text}`}>
                        My vision is to make <br className={styles.first_vision_text_breakpoint} />{' '}
                        this world a greener & better{' '}
                        <br className={styles.second_vision_text_breakpoint} /> place to live.
                    </p>
                    <div className={styles.plants_planted_layout_wrapper}>
                        <p className={`${styles.plants_planted_text}`}>Plants planted...</p>
                        <div className={styles.plants_planted_animation_layout_wrapper}>
                            {plantsPlantedAnimationNumbersArr.map((str, idx) => (
                                <div
                                    className={styles.plants_planted_animation_container}
                                    key={idx}
                                >
                                    <div
                                        className={`${styles.plants_planted_count_slider} ${
                                            styles[`plants_planted_count_slider_${idx + 1}`]
                                        }`}
                                    >
                                        {str.split('').map((ch, idx) => (
                                            <span
                                                key={idx}
                                                className={styles.planted_planted_digit}
                                            >
                                                {ch}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default Vision;
