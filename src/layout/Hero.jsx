import { useEffect, useRef } from 'react';
import { m, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'framer-motion';

import { heroSectionData } from '../utils/website-data';
import useCheckMobileScreen from '../hooks/use-mobileScreen';

import styles from './Hero.module.css';

const {
    heroImgLM,
    heroImgSL,
    heroImgLL,
    heroImgM,
    heroVideo,
    heroCTAGraphicLeftLM,
    heroCTAGraphicBottomLM,
    heroCTAGraphicRightLM,
    heroCTAGraphicLeftM,
    heroCTAGraphicBottomM,
    heroCTAGraphicRightM,
    heroIntroParagraph,
    abhishekCTAGmail,
    abhishekProHeadshotLM,
    abhishekProHeadshotM,
} = heroSectionData;

let heroCenterParallaxY = 12;
if (window.innerWidth > 1450) {
    heroCenterParallaxY = 14;
}
if (window.innerWidth > 1900) {
    heroCenterParallaxY = 16;
}

const Hero = () => {
    const heroVideoRef = useRef(null);
    const heroSectionRef = useRef(null);
    const heroContentContRef = useRef(null);

    const isMobileScreen = useCheckMobileScreen();
    const isReduced = useReducedMotion();

    const { scrollYProgress: heroSectionScrollYProgress } = useScroll({
        target: heroSectionRef,
        offset: ['1 1', '1 0.5'],
    });

    const heroContentParallaxY = useTransform(
        heroSectionScrollYProgress,
        [0, 1],
        [0, heroCenterParallaxY]
    );

    useMotionValueEvent(heroContentParallaxY, 'change', latest => {
        if (isMobileScreen || isReduced) return;

        const y = 50 + latest;

        heroContentContRef.current.animate(
            { transform: `translate(-50%, -${y}%)` },
            { duration: 1200, fill: 'forwards' }
        );
    });

    const handleHeroVideoPlaying = state => {
        if (!heroVideoRef.current) return;

        if (state === 'play') {
            heroVideoRef.current.play();
        } else if (state === 'pause') {
            heroVideoRef.current.pause();
        }
    };

    const handleHeroCTAClick = () => {
        window.open(
            `mailto:${abhishekCTAGmail}?subject=Your%20Subject&body=Drop%20your%20message%20%20😄`
        );
    };

    useEffect(() => {
        try {
            // For iphone autoplaying issue:
            handleHeroVideoPlaying('play');
        } catch (err) {
            console.log(err);
        }
    }, []);

    return (
        <>
            <div className={styles.hero_img_container}>
                <picture className={styles.hero_img}>
                    <source srcSet={heroImgM} media="(min-width: 1900px)" />
                    <source srcSet={heroImgLL} media="(min-width: 1450px)" />
                    <source srcSet={heroImgSL} media="(min-width: 750px)" />
                    <img src={heroImgLM} alt="Home page full-screen hero image" />
                </picture>
            </div>
            <section className={`section ${styles.hero_section}`} ref={heroSectionRef}>
                <m.div
                    className={`section_container ${styles.hero_section_container}`}
                    onViewportEnter={() => handleHeroVideoPlaying('play')}
                    onViewportLeave={() => handleHeroVideoPlaying('pause')}
                >
                    <div className={styles.hero_center_content_container} ref={heroContentContRef}>
                        <div className={styles.hero_video_container}>
                            <video
                                src={heroVideo}
                                autoPlay
                                muted
                                loop
                                playsInline
                                poster={abhishekProHeadshotLM}
                                ref={heroVideoRef}
                                preload="auto"
                            >
                                HTML5 video not supported in your browser.
                            </video>
                            <div className={styles.hero_video_backup_thumbnail_container}>
                                <picture>
                                    <source
                                        srcSet={abhishekProHeadshotM}
                                        media="(min-width: 1150px)"
                                    />
                                    <img
                                        src={abhishekProHeadshotLM}
                                        alt="Abhishek professional headshot picture"
                                    />
                                </picture>
                            </div>
                        </div>
                        <div className={`${styles.hero_intro_text}`}>{heroIntroParagraph}</div>
                        <button className={styles.hero_cta_container} onClick={handleHeroCTAClick}>
                            <span className={`body_text_500 ${styles.cta}`}>Open Gmail</span>
                            <div className={styles.hero_cta_graphic_container}>
                                <picture
                                    className={`${styles.hero_cta_graphic} ${styles.hero_cta_graphic_left_img}`}
                                >
                                    <source
                                        srcSet={heroCTAGraphicLeftM}
                                        media="(min-width: 1050px)"
                                    />
                                    <img src={heroCTAGraphicLeftLM} alt="Hero CTA left graphic" />
                                </picture>
                                <picture
                                    className={`${styles.hero_cta_graphic} ${styles.hero_cta_graphic_bottom_img}`}
                                >
                                    <source
                                        srcSet={heroCTAGraphicBottomM}
                                        media="(min-width: 1050px)"
                                    />
                                    <img
                                        src={heroCTAGraphicBottomLM}
                                        alt="Hero CTA bottom graphic"
                                    />
                                </picture>
                                <picture
                                    className={`${styles.hero_cta_graphic} ${styles.hero_cta_graphic_right_img}`}
                                >
                                    <source
                                        srcSet={heroCTAGraphicRightM}
                                        media="(min-width: 1050px)"
                                    />
                                    <img src={heroCTAGraphicRightLM} alt="Hero CTA right graphic" />
                                </picture>
                            </div>
                        </button>
                    </div>
                </m.div>
            </section>
        </>
    );
};
export default Hero;
