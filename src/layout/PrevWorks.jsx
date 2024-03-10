import { useRef, useState } from 'react';
import { AnimatePresence, m, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'framer-motion';

import { useGlobalContext } from '../store';
import { previousWorksSectionData } from '../utils/website-data';
import useCheckMobileScreen from '../hooks/use-mobileScreen';

import redirectArrowIcon from '../assets/images/icons/redirect-arrow-icon.svg';
import closeIcon from '../assets/images/icons/close-icon.svg';

import styles from './PrevWorks.module.css';

const {
    previousWorksHeadingSubtitle,
    previousWorksInfoArr,
    prevWorksSectionBgSL,
    prevWorksSectionBgLL,
    prevWorksSectionBgM,
} = previousWorksSectionData;

const clipPathTransitionDuration = window.innerWidth < 1050 ? 0.3 : 0.5;
const comparisionContentContVariants = {
    initial: {
        clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)',
        transition: { duration: clipPathTransitionDuration },
    },
    animate: {
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        transition: {
            duration: clipPathTransitionDuration,
            delay: 0.5,
            delayChildren: 1,
            staggerChildren: 0.5,
        },
    },
    exit: {
        opacity: 0,
        transition: {
            duration: 0.4,
            when: 'afterChildren',
        },
    },
};

const writingsContVariants = {
    initial: { opacity: 0, y: '35px' },
    animate: { opacity: 1, y: 0, duration: 0.7 },
    exit: { opacity: 0, duration: 0.5 },
};

const imgComparisonContVariant = {
    initial: { opacity: 0, scale: 0.4 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, duration: 0.5 },
};

const PrevWorks = () => {
    const { setIsPrevWorkModalOpen } = useGlobalContext();
    const isReduced = useReducedMotion();

    const prevWorksSectionRef = useRef(null);
    const prevWorksContRef = useRef(null);
    const prevWorkImagesArrRef = useRef([]);
    const prevWorkBoxesArrRef = useRef([]);
    const smallerDevicesScrollHandlerRef = useRef(null);

    const imgComparisonLayoutWrapperRef = useRef(null);
    const imgComparisonContRef = useRef(null);
    const secondComparisonImgContRef = useRef(null);
    const comparisonSliderHandleRef = useRef(null);

    const [currWorkIdx, setCurrWorkIdx] = useState(-1);
    const [isComparisonSliderLocked, setIsComparisonSliderLocked] = useState(false);
    const isMobileScreen = useCheckMobileScreen();

    const offsetArr = ['0 0.2', `1 ${isMobileScreen ? -0.6 : 0.7}`];
    const { scrollYProgress: prevWorksSectionScrollYProgress } = useScroll({
        target: prevWorksSectionRef,
        offset: offsetArr,
    });

    const prevWorksContTransformX = useTransform(prevWorksSectionScrollYProgress, [0, 1], [0, 120]);
    useMotionValueEvent(prevWorksContTransformX, 'change', latest => {
        const translateXVal = 50 - latest;
        const translateYVal = latest - 10;

        if (isMobileScreen) {
            if (translateYVal < 0) return;

            smallerDevicesScrollHandlerRef.current.animate(
                { transform: `translateY(-${translateYVal}%)` },
                { duration: 600, fill: 'forwards' }
            );

            return;
        }

        prevWorksContRef.current.animate(
            { transform: `translateX(${translateXVal}%)` },
            { duration: 2000, fill: 'forwards' }
        );

        if(isReduced) return;

        prevWorkImagesArrRef.current.forEach(img => {
            if (latest > 100) latest = 100;
            img.animate({ objectPosition: `${latest}% 50%` }, { duration: 2000, fill: 'forwards' });
        });
    });

    function imgComparisonContMouseMove(event) {
        const clientRect = imgComparisonContRef.current.getBoundingClientRect();
        const centerPosition = {
            x: clientRect.left + clientRect.width / 2,
            y: clientRect.top + clientRect.height / 2,
        };

        let angle = Math.atan2(event.pageX - centerPosition.x, 0) * (15 / Math.PI);
        imgComparisonContRef.current.style.transform = `rotateY(${angle}deg)`;

        if (isComparisonSliderLocked) return;

        const imgComparisonLayoutPaddingLeft = Number.parseFloat(
            window.getComputedStyle(imgComparisonLayoutWrapperRef.current).paddingLeft
        );
        const sliderLeftX = imgComparisonContRef.current.offsetLeft;
        const sliderWidth = imgComparisonContRef.current.clientWidth;
        const sliderHandleWidth = comparisonSliderHandleRef.current.clientWidth;

        let mouseX =
            (event.clientX - imgComparisonLayoutPaddingLeft || event.touches[0].clientX) -
            sliderLeftX;
        if (mouseX < 0) mouseX = 0;
        else if (mouseX > sliderWidth) mouseX = sliderWidth;

        const secondComparisonImgContWidth = `${((1 - mouseX / sliderWidth) * 100).toFixed(4)}%`;
        const comparisonSliderHandleLeft = `calc(${((mouseX / sliderWidth) * 100).toFixed(4)}% - ${
            sliderHandleWidth / 2
        }px)`;

        secondComparisonImgContRef.current.animate(
            { width: secondComparisonImgContWidth },
            { duration: 700, fill: 'forwards' }
        );
        comparisonSliderHandleRef.current.animate(
            { left: comparisonSliderHandleLeft },
            { duration: 700, fill: 'forwards' }
        );
    }

    function imgComparisonContMouseDown(event) {
        if (isComparisonSliderLocked) setIsComparisonSliderLocked(false);
        imgComparisonContMouseMove(event);
    }

    function imgComparisonContMouseUp() {
        if (!isComparisonSliderLocked) setIsComparisonSliderLocked(true);
    }

    function imgComparisonContMouseLeave() {
        imgComparisonContRef.current.style.transform = `rotateY(0deg)`;
        if (isComparisonSliderLocked) setIsComparisonSliderLocked(false);
    }

    const handlePrevWorkBoxClick = workId => {
        if (workId !== -1) {
            setIsPrevWorkModalOpen(true);

            document.body.classList.add('stop_page_scroll', 'prevent_lenis');
            document.body.setAttribute('data-lenis-prevent', '');
        } else {
            setTimeout(
                () => {
                    setIsPrevWorkModalOpen(false);
                },
                isMobileScreen ? 150 : 700
            );

            document.body.classList.remove('stop_page_scroll', 'prevent_lenis');
            document.body.removeAttribute('data-lenis-prevent', '');
        }

        setCurrWorkIdx(workId);
    };

    const handlePrevWorkInfoRevealSmallerDevices = idx => {
        if (isMobileScreen) {
            prevWorkBoxesArrRef.current.forEach((prevBox, id) => {
                if (id === idx) {
                    prevBox.classList.add(`${styles.prev_work_mobile_info_reveal}`);
                } else {
                    prevBox.classList.remove(`${styles.prev_work_mobile_info_reveal}`);
                }
            });
        }
    };

    return (
        <section className={`section ${styles.prev_works_section}`} ref={prevWorksSectionRef}>
            <div className={`section_container`}>
                <div className={styles.prev_works_vertical_scroller}>
                    <div className={styles.prev_works_hor_scroll_container}>
                        <div className={`section_headings`}>
                            <h2>My Previous Works</h2>
                            <p>{previousWorksHeadingSubtitle}</p>
                        </div>
                        <div className={styles.prev_works_boxes_container} ref={prevWorksContRef}>
                            <div
                                className={styles.prev_work_boxes_smaller_devices_scroll_handler}
                                ref={smallerDevicesScrollHandlerRef}
                            >
                                {previousWorksInfoArr.map(
                                    ({ id, workCompany, workTitle, workThumbnail }, idx) => (
                                        <m.div
                                            key={id}
                                            className={styles.prev_work_box}
                                            onClick={() => handlePrevWorkBoxClick(idx)}
                                            onViewportEnter={() =>
                                                isMobileScreen &&
                                                handlePrevWorkInfoRevealSmallerDevices(idx)
                                            }
                                            viewport={{ margin: '-49%' }}
                                            ref={el => (prevWorkBoxesArrRef.current[idx] = el)}
                                        >
                                            <picture className={styles.prev_work_thumbnail_img}>
                                                <source
                                                    srcSet={workThumbnail.M}
                                                    media="(min-width: 1450px)"
                                                />
                                                <source
                                                    srcSet={workThumbnail.SL}
                                                    media="(min-width: 1050px)"
                                                />
                                                <img
                                                    src={workThumbnail.LM}
                                                    alt={`${workCompany} work thumbnail image`}
                                                    ref={el =>
                                                        (prevWorkImagesArrRef.current[idx] = el)
                                                    }
                                                />
                                            </picture>
                                            <div className={styles.prev_work_content_container}>
                                                <div className={styles.prev_work_writing_container}>
                                                    <h3 className="body_text_800">{workCompany}</h3>
                                                    <p className="body_text_500">{workTitle}</p>
                                                </div>
                                                <button
                                                    className={`body_text_400 ${styles.prev_work_expand_btn}`}
                                                >
                                                    View
                                                </button>
                                            </div>
                                        </m.div>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <AnimatePresence>
                    {currWorkIdx > -1 && (
                        <m.div
                            className={styles.images_comparison_layout_wrapper}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            exit={{ opacity: 0, transition: { delay: isMobileScreen ? 0 : 0.7 } }}
                            ref={imgComparisonLayoutWrapperRef}
                        >
                            <button
                                className={styles.images_comparison_close_btn}
                                onClick={() => handlePrevWorkBoxClick(-1)}
                            >
                                <img src={closeIcon} alt="Previous work modal close icon" />
                            </button>
                            <m.div
                                className={styles.images_comparison_content_container}
                                variants={comparisionContentContVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                            >
                                <m.div
                                    variants={writingsContVariants}
                                    className={styles.prev_work_comparison_writings_container}
                                >
                                    <h3>
                                        {`${currWorkIdx + 1}. ${
                                            previousWorksInfoArr[currWorkIdx].workCompany
                                        }`}
                                    </h3>
                                    {previousWorksInfoArr[currWorkIdx].workShortDescription}
                                    {previousWorksInfoArr[currWorkIdx].moreInfoLink && (
                                        <a
                                            href={`https://abhiplantit.com/${previousWorksInfoArr[currWorkIdx].moreInfoLink}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="link_text body_text_500"
                                        >
                                            <span
                                                className={`link_word ${styles.prev_work_content_more_info_text}`}
                                            >
                                                More Info
                                            </span>{' '}
                                            <span className="redirect_arrow">
                                                <img
                                                    src={redirectArrowIcon}
                                                    alt="Redirect arrow icon"
                                                />
                                            </span>
                                        </a>
                                    )}
                                </m.div>
                                <m.div
                                    className={`${styles.images_comparison_container} ${
                                        !previousWorksInfoArr[currWorkIdx].workBeforePic
                                            ? `${styles.img_unavailability_styling}`
                                            : ''
                                    }`}
                                    ref={imgComparisonContRef}
                                    onMouseMove={imgComparisonContMouseMove}
                                    onTouchMove={imgComparisonContMouseMove}
                                    onMouseDown={imgComparisonContMouseDown}
                                    onTouchStart={imgComparisonContMouseDown}
                                    onMouseUp={imgComparisonContMouseUp}
                                    onTouchEnd={imgComparisonContMouseUp}
                                    onMouseLeave={imgComparisonContMouseLeave}
                                    variants={imgComparisonContVariant}
                                >
                                    {previousWorksInfoArr[currWorkIdx].workBeforePic ? (
                                        <picture className={styles.first_comparison_img}>
                                            <source
                                                srcSet={
                                                    previousWorksInfoArr[currWorkIdx].workBeforePic
                                                        .LL
                                                }
                                                media="(min-width: 1450px)"
                                            />
                                            <source
                                                srcSet={
                                                    previousWorksInfoArr[currWorkIdx].workBeforePic
                                                        .SL
                                                }
                                                media="(min-width: 1050px)"
                                            />
                                            <img
                                                src={
                                                    previousWorksInfoArr[currWorkIdx].workBeforePic
                                                        .SM
                                                }
                                                alt={`${previousWorksInfoArr[currWorkIdx].workCompany} work before image`}
                                            />
                                        </picture>
                                    ) : (
                                        <p
                                            className={`body_text_900 ${styles.prev_work_img_unavailability_backup_text}`}
                                        >
                                            COMING SOON...
                                        </p>
                                    )}
                                    <div
                                        className={styles.second_comparison_img_container}
                                        ref={secondComparisonImgContRef}
                                    >
                                        {previousWorksInfoArr[currWorkIdx].workAfterPic && (
                                            <picture className={styles.second_comparison_img}>
                                                <source
                                                    srcSet={
                                                        previousWorksInfoArr[currWorkIdx]
                                                            .workAfterPic.LL
                                                    }
                                                    media="(min-width: 1450px)"
                                                />
                                                <source
                                                    srcSet={
                                                        previousWorksInfoArr[currWorkIdx]
                                                            .workAfterPic.SL
                                                    }
                                                    media="(min-width: 1050px)"
                                                />
                                                <img
                                                    src={
                                                        previousWorksInfoArr[currWorkIdx]
                                                            .workAfterPic.SM
                                                    }
                                                    alt={`${previousWorksInfoArr[currWorkIdx].workCompany} work after image`}
                                                />
                                            </picture>
                                        )}
                                    </div>
                                    <div
                                        className={styles.handles_container}
                                        ref={comparisonSliderHandleRef}
                                    >
                                        <div className={styles.handle_line}></div>
                                        <div className={styles.handle_circle}>
                                            <span className={styles.chevron_left}>&lt;</span>
                                            <span className={styles.chevron_right}>&gt;</span>
                                        </div>
                                        <div className={styles.handle_line}></div>
                                    </div>
                                    <div className={`body_text_400 ${styles.labels_container}`}>
                                        <span className={styles.label_before}>Before</span>
                                        <span className={styles.label_after}>After</span>
                                    </div>
                                </m.div>
                            </m.div>
                        </m.div>
                    )}
                </AnimatePresence>
            </div>
            <div className={styles.prev_works_bg_layout_wrapper}>
                <div className={styles.prev_works_bg_img_container}>
                    <picture>
                        <source srcSet={prevWorksSectionBgM} media="(min-width: 1900px)" />
                        <source srcSet={prevWorksSectionBgLL} media="(min-width: 1450px)" />
                        <img
                            src={prevWorksSectionBgSL}
                            alt={`Previous works section background image`}
                        />
                    </picture>
                </div>
            </div>
        </section>
    );
};
export default PrevWorks;
