/* eslint-disable react/no-unescaped-entities */

import { useState, useRef } from 'react';
import { AnimatePresence, m } from 'framer-motion';

import { knownForSectionData } from '../utils/website-data';

import arrowIcon from '../assets/images/icons/arrow-icon.svg';
import videoPlayIcon from '../assets/images/icons/video-play-icon.svg';

import styles from './KnownFor.module.css';

const { knownForHeadingSubtitle, knownForInfoArr } = knownForSectionData;
const carouselsOrderClassName = [
    `${styles.curr_carousel}`,
    `${styles.next_carousel}`,
    `${styles.prev_carousel}`,
];

const animateValue = 10;
const carouselTextVariants = {
    enter: direction => {
        return {
            zIndex: 0,
            y: direction > 0 ? animateValue : -animateValue,
            opacity: 0,
        };
    },
    center: {
        zIndex: 1,
        y: 0,
        opacity: 1,
    },
    exit: direction => {
        return {
            zIndex: 0,
            y: direction < 0 ? animateValue : -animateValue,
            opacity: 0,
        };
    },
};

const KnownFor = () => {
    const carouselsListRef = useRef(null);
    const carouselVideoLayoutWrappersArrRef = useRef([]);
    const carouselVideosArrRef = useRef([]);
    const carouselVideosProgressArrRef = useRef([]);

    const [[carouselChangeTracker, direction], setCarouselChangeTracker] = useState([0, 0]);
    const [disableOnCarouselChange, setDisableOnCarouselChange] = useState(false);

    let currCarouselIdx = carouselChangeTracker % knownForInfoArr.length;
    if (currCarouselIdx < 0) {
        currCarouselIdx += knownForInfoArr.length;
    }

    const handleCarouselTrackerChange = newDirection => {
        setCarouselChangeTracker([carouselChangeTracker + newDirection, newDirection]);
    };

    const playCurrentCarouselVideo = () => {
        const currVideoLayoutWrapperEl = carouselVideoLayoutWrappersArrRef.current[currCarouselIdx];
        const currVideoEl = carouselVideosArrRef.current[currCarouselIdx];

        currVideoLayoutWrapperEl.classList.add(`${styles.video_playing}`);
        currVideoEl.play();
    };

    const pauseCurrentCarouselVideo = () => {
        const currVideoLayoutWrapperEl = carouselVideoLayoutWrappersArrRef.current[currCarouselIdx];
        const currVideoEl = carouselVideosArrRef.current[currCarouselIdx];

        currVideoLayoutWrapperEl.classList.remove(`${styles.video_playing}`);
        currVideoEl.pause();
    };

    const handleCurrCarouselVideoProgress = () => {
        const currVideoEl = carouselVideosArrRef.current[currCarouselIdx];
        const currVideoProgressBarEl = carouselVideosProgressArrRef.current[currCarouselIdx];

        const progressPercentage = (currVideoEl.currentTime / currVideoEl.duration) * 100;
        currVideoProgressBarEl.style.width = `${progressPercentage}%`;
    };

    const handleCurrCarouselVideoClick = () => {
        const currVideoLayoutWrapperEl = carouselVideoLayoutWrappersArrRef.current[currCarouselIdx];

        if (currVideoLayoutWrapperEl.classList.contains(`${styles.video_playing}`))
            pauseCurrentCarouselVideo();
        else playCurrentCarouselVideo();
    };

    const handleCarouselChange = newDirection => {
        setDisableOnCarouselChange(true);
        pauseCurrentCarouselVideo();

        const currCarouselEl = carouselsListRef.current.querySelector(`.${styles.curr_carousel}`);
        const nextCarouselEl = carouselsListRef.current.querySelector(`.${styles.next_carousel}`);
        const prevCarouselEl = carouselsListRef.current.querySelector(`.${styles.prev_carousel}`);

        currCarouselEl.classList.remove(`${styles.curr_carousel}`);
        nextCarouselEl.classList.remove(`${styles.next_carousel}`);
        prevCarouselEl.classList.remove(`${styles.prev_carousel}`);

        if (newDirection === 'right') {
            currCarouselEl.classList.add(`${styles.prev_carousel}`);
            nextCarouselEl.classList.add(`${styles.curr_carousel}`);
            prevCarouselEl.classList.add(`${styles.next_carousel}`);

            handleCarouselTrackerChange(1);
        } else {
            currCarouselEl.classList.add(`${styles.next_carousel}`);
            nextCarouselEl.classList.add(`${styles.prev_carousel}`);
            prevCarouselEl.classList.add(`${styles.curr_carousel}`);

            handleCarouselTrackerChange(-1);
        }

        setTimeout(() => {
            setDisableOnCarouselChange(false);
        }, 1000);
    };

    const handleSectionLeaveVideoPause = () => {
        pauseCurrentCarouselVideo();
    };

    return (
        <m.section
            className={`section ${styles.known_for_section}`}
            onViewportLeave={handleSectionLeaveVideoPause}
        >
            <div className={`section_container ${styles.known_for_section_container}`}>
                <div className={`section_headings ${styles.known_for_section_headings}`}>
                    <h2>I'm known for...</h2>
                    <p>{knownForHeadingSubtitle}</p>
                </div>
                <div className={styles.carousels_layout_wrapper}>
                    <div className={styles.carousels_container}>
                        <button
                            className={`${styles.carousels_btn} ${styles.carousels_btn_left} ${
                                disableOnCarouselChange ? `${styles.disable_btn}` : ''
                            }`}
                            onClick={() => handleCarouselChange('left')}
                            disabled={disableOnCarouselChange}
                        >
                            <div
                                className={`${styles.arrow_icon_container} ${styles.left_arrow_icon_container}`}
                            >
                                <img src={arrowIcon} alt="KnownFor carousels left arrow icon" />
                            </div>
                        </button>
                        <ul className={styles.carousels_list} ref={carouselsListRef}>
                            <li
                                className={`${styles.curr_video_static_background} ${
                                    disableOnCarouselChange ? `${styles.hide}` : ''
                                }`}
                            ></li>
                            {knownForInfoArr.map(
                                (
                                    {
                                        id,
                                        knownForText,
                                        knownForVideo,
                                        knownForVideoThumbnail,
                                        removeVideoScreenAnimationOverlay,
                                    },
                                    idx
                                ) => (
                                    <li
                                        key={id}
                                        className={`${styles.carousel} ${carouselsOrderClassName[idx]}`}
                                    >
                                        <div
                                            className={styles.carousel_video_layout_wrapper}
                                            onClick={handleCurrCarouselVideoClick}
                                            ref={el =>
                                                (carouselVideoLayoutWrappersArrRef.current[idx] =
                                                    el)
                                            }
                                        >
                                            <div className={styles.video_border_effect}></div>
                                            <div className={styles.video_container}>
                                                <video
                                                    src={knownForVideo}
                                                    ref={el =>
                                                        (carouselVideosArrRef.current[idx] = el)
                                                    }
                                                    loop
                                                    onTimeUpdate={handleCurrCarouselVideoProgress}
                                                    preload="auto"
                                                    poster={knownForVideoThumbnail}
                                                >
                                                    HTML5 video not supported by your browser.
                                                </video>
                                                <div
                                                    className={`${
                                                        styles.video_screen_animation_overlay
                                                    } ${
                                                        removeVideoScreenAnimationOverlay
                                                            ? `${styles.remove}`
                                                            : ''
                                                    }`}
                                                ></div>
                                                <div
                                                    className={
                                                        styles.video_backup_thumbnail_container
                                                    }
                                                >
                                                    <img
                                                        src={knownForVideoThumbnail}
                                                        alt={`${knownForText} video backup thumbnail`}
                                                    />
                                                </div>
                                            </div>
                                            <div className={styles.video_info_container}>
                                                <div
                                                    className={styles.video_progress_bar}
                                                    ref={el =>
                                                        (carouselVideosProgressArrRef.current[idx] =
                                                            el)
                                                    }
                                                ></div>
                                                <button className={styles.video_play_btn}>
                                                    <img
                                                        src={videoPlayIcon}
                                                        alt="KnownFor carousels video play button"
                                                    />
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                )
                            )}
                        </ul>
                        <button
                            className={`${styles.carousels_btn} ${styles.carousels_btn_right} ${
                                disableOnCarouselChange ? `${styles.disable_btn}` : ''
                            }`}
                            onClick={() => handleCarouselChange('right')}
                            disabled={disableOnCarouselChange}
                        >
                            <div className={styles.arrow_icon_container}>
                                <img src={arrowIcon} alt="KnownFor carousels right arrow icon" />
                            </div>
                        </button>
                    </div>
                    <div className={styles.carousels_text_container}>
                        <AnimatePresence initial={false} custom={direction} mode="wait">
                            <m.p
                                key={carouselChangeTracker}
                                custom={direction}
                                variants={carouselTextVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{
                                    y: { type: 'spring', stiffness: 200, damping: 20 },
                                    opacity: { duration: 0.5 },
                                }}
                            >
                                <span>{knownForInfoArr[currCarouselIdx].knownForText}</span>
                            </m.p>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </m.section>
    );
};
export default KnownFor;
