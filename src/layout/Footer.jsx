import { useEffect, useRef } from 'react';
import { useScroll } from 'framer-motion';

import { useGlobalContext } from '../store';
import { homeFooterData } from '../utils/website-data';
import { handleCommunityCTAClick } from '../utils/helpers';

import primaryWebsite2DLogo from '../assets/images/logos/primary-2D-logo.png';
import grassGraphic from '../assets/images/graphics/grass-graphic.svg';
import whatsappIcon from '../assets/images/icons/whatsapp-icon.svg';
import redirectArrowIcon from '../assets/images/icons/redirect-arrow-icon.svg';

import styles from './Footer.module.css';

const { abhishekInstaLink, abhishekLinkedInLink, pravinCTALink } = homeFooterData;

const Footer = () => {
    const { setFooterEmptySpaceScrollYProgress } = useGlobalContext();

    const emptySpaceVisionAppearanceRef = useRef(null);

    const { scrollYProgress: emptySpaceScrollYProgress } = useScroll({
        target: emptySpaceVisionAppearanceRef,
        offset: ['1 1', '1 0.2'],
    });

    useEffect(() => {
        setFooterEmptySpaceScrollYProgress(emptySpaceScrollYProgress);
    }, [setFooterEmptySpaceScrollYProgress, emptySpaceScrollYProgress]);

    return (
        <footer className={`section ${styles.primary_footer}`}>
            <div className={`section_container ${styles.primary_footer_container}`}>
                <div
                    className={styles.empty_space_for_vision_appearance}
                    ref={emptySpaceVisionAppearanceRef}
                ></div>
                <div className={styles.primary_footer_layout_wrapper}>
                    <div className={styles.grass_graphic_container}>
                        <img src={grassGraphic} alt="Footer grass graphic" />
                    </div>
                    <div className={styles.footer_content_container}>
                        <div className={styles.footer_content_cta_container}>
                            <h2>
                                Join my WhatsApp{' '}
                                <br className={styles.footer_content_cta_line_break} /> community
                            </h2>
                            <button
                                className={styles.footer_cta_btn}
                                onClick={handleCommunityCTAClick}
                            >
                                <span className="body_text_500">Community</span>
                                <span className={styles.whatsapp_icon_container}>
                                    <img src={whatsappIcon} alt="Whatsapp icon" />
                                </span>
                            </button>
                        </div>
                        <ul className={styles.social_media_list}>
                            <li className={styles.social_icon_container}>
                                <a
                                    href={abhishekInstaLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        x="0px"
                                        y="0px"
                                        viewBox="0 0 64 64"
                                        className={`${styles.social_media_svg_icon}`}
                                    >
                                        <path d="M 21.580078 7 C 13.541078 7 7 13.544938 7 21.585938 L 7 42.417969 C 7 50.457969 13.544938 57 21.585938 57 L 42.417969 57 C 50.457969 57 57 50.455062 57 42.414062 L 57 21.580078 C 57 13.541078 50.455062 7 42.414062 7 L 21.580078 7 z M 47 15 C 48.104 15 49 15.896 49 17 C 49 18.104 48.104 19 47 19 C 45.896 19 45 18.104 45 17 C 45 15.896 45.896 15 47 15 z M 32 19 C 39.17 19 45 24.83 45 32 C 45 39.17 39.169 45 32 45 C 24.83 45 19 39.169 19 32 C 19 24.831 24.83 19 32 19 z M 32 23 C 27.029 23 23 27.029 23 32 C 23 36.971 27.029 41 32 41 C 36.971 41 41 36.971 41 32 C 41 27.029 36.971 23 32 23 z"></path>
                                    </svg>
                                </a>
                            </li>
                            <li className={styles.social_icon_container}>
                                <a
                                    href={abhishekLinkedInLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        x="0px"
                                        y="0px"
                                        viewBox="0 0 50 50"
                                        className={`${styles.social_media_svg_icon}`}
                                    >
                                        <path d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z"></path>
                                    </svg>
                                </a>
                            </li>
                        </ul>
                        <div className={styles.footer_last_row_container}>
                            <div className={styles.logo_container}>
                                <img src={primaryWebsite2DLogo} alt="Plant it 2D logo" />
                            </div>
                            <p className={`body_text_300 ${styles.footer_copyright_text}`}>
                                &copy; {new Date().getFullYear()} <b>Abhishek Kumbhar</b>. All
                                rights reserved.
                            </p>
                            <p className={`body_text_200 ${styles.pravin_cta_container}`}>
                                Designed and built by{' '}
                                <a
                                    href={pravinCTALink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="link_text"
                                >
                                    <span className={`link_word ${styles.pravin_cta_text}`}>
                                        pravinm.tech
                                    </span>{' '}
                                    <span className="redirect_arrow">
                                        <img src={redirectArrowIcon} alt="Redirect arrow icon" />
                                    </span>
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};
export default Footer;
