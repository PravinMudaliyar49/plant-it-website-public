import { useRef } from 'react';
import { m, useMotionValueEvent, useScroll } from 'framer-motion';

import { useGlobalContext } from '../store';
import { handleWindowScrollToTop } from '../utils/helpers';

import upChevronIcon from '../assets/images/icons/up-chevron-icon.svg';

import styles from './FloatingPageScrollTop.module.css';

const pageScrollYMark = 0.005;

const FloatingPageScrollTop = () => {
    const {
        isFloatingPageScrollTopVisibile,
        isPrevWorkModalOpen,
        setIsFloatingPageScrollTopVisibile,
    } = useGlobalContext();

    const svgProgressCircleRef = useRef(null);

    const { scrollYProgress: pageScrollYProgress } = useScroll();
    useMotionValueEvent(pageScrollYProgress, 'change', latest => {
        if (latest > pageScrollYMark) {
            setIsFloatingPageScrollTopVisibile(true);
        } else {
            setIsFloatingPageScrollTopVisibile(false);
        }

        let r = 70;
        let g = 190;
        let b = 200 - latest * 300;

        let alpha = 0.5 + latest;

        if (b <= 50) {
            b = 0;
            g = 190 + (latest - 0.5) * 150;
        }

        svgProgressCircleRef.current.style.stroke = `rgba(${r},${g},${b},${alpha})`;
    });

    return (
        <div
            className={`${styles.floating_scroll_top_container} ${
                isFloatingPageScrollTopVisibile ? `${styles.appear}` : ''
            } ${isPrevWorkModalOpen ? `${styles.hide}` : ''}`}
            onClick={handleWindowScrollToTop}
        >
            <svg className={styles.svg_circle_container} viewBox="0 0 100 100">
                <circle
                    cx="50"
                    cy="50"
                    r="45"
                    pathLength="1"
                    className={`${styles.svg_circle} ${styles.bg_transparent}`}
                />
                <m.circle
                    cx="50"
                    cy="50"
                    r="45"
                    className={`${styles.svg_circle}`}
                    style={{ pathLength: pageScrollYProgress }}
                    ref={svgProgressCircleRef}
                />
            </svg>
            <button className={styles.up_chevron_container}>
                <img src={upChevronIcon} alt="Up chevron icon for floating scroll to top" />
            </button>
        </div>
    );
};
export default FloatingPageScrollTop;
