import { NavLink } from 'react-router-dom';
import { useMotionValueEvent, useScroll } from 'framer-motion';

import { useGlobalContext } from '../store';
import { PlantitLogoCanvas } from '../components';
import { navLinks } from '../utils/constants';
import { handleCommunityCTAClick } from '../utils/helpers';

import whatsappIcon from '../assets/images/icons/whatsapp-icon.svg';

import styles from './Header.module.css';

const pageScrollYMark = 0.005;

const Header = () => {
    const {
        isHeaderVisible,
        isNavbarVisible,
        isPrevWorkModalOpen,
        footerEmptySpaceScrollYProgress,
        handleNavbarVisibility,
        handleHeaderVisibility,
    } = useGlobalContext();

    useMotionValueEvent(footerEmptySpaceScrollYProgress, 'change', latest => {
        if (isPrevWorkModalOpen) return;

        if (latest > 0.4) handleHeaderVisibility(false);
        else handleHeaderVisibility(true);
    });

    const { scrollYProgress: pageScrollYProgress } = useScroll();
    useMotionValueEvent(pageScrollYProgress, 'change', latest => {
        if (latest === 1) return;

        if (latest > pageScrollYMark) handleNavbarVisibility(false);
        else handleNavbarVisibility(true);
    });

    return (
        <header
            className={`${styles.primary_header} ${isHeaderVisible ? '' : `${styles.hide}`} ${
                isPrevWorkModalOpen ? `${styles.hide}` : ''
            }`}
        >
            <div className={`grabbable ${styles.website_3D_logo_container}`}>
                <PlantitLogoCanvas canvascamera={{ fov: 35, zoom: 0.8 }} />
            </div>
            <nav
                className={`${styles.navbar_container} ${isNavbarVisible ? '' : `${styles.hide}`}`}
            >
                <ul className={styles.navlist}>
                    {navLinks.map(obj => (
                        <li key={obj.id} className="body_text_300">
                            <NavLink
                                to={obj.link}
                                className={({ isActive }) =>
                                    `${styles.navlink} ${isActive ? `${styles.active}` : ''}`
                                }
                            >
                                {obj.name}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
            <button className={styles.navbar_contact_btn} onClick={handleCommunityCTAClick}>
                <span className={`body_text_500 ${styles.lm_text}`}>Join</span>
                <span className={`body_text_500 ${styles.sl_text}`}>Community</span>
                <span className={styles.whatsapp_icon_container}>
                    <img src={whatsappIcon} alt="Whatsapp icon" />
                </span>
            </button>
        </header>
    );
};
export default Header;
