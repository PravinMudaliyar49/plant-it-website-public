import { useCallback, useState } from 'react';
import { useMotionValue } from 'framer-motion';

import { GlobalContext } from './global-context';

const GlobalProvider = ({ children }) => {
    const [isHeaderVisible, setIsHeaderVisible] = useState(true);
    const [isNavbarVisible, setIsNavbarVisible] = useState(true);
    const [isFloatingPageScrollTopVisibile, setIsFloatingPageScrollTopVisibile] = useState(false);
    const [isPrevWorkModalOpen, setIsPrevWorkModalOpen] = useState(false);
    const [footerEmptySpaceScrollYProgress, setFooterEmptySpaceScrollYProgress] = useState(
        useMotionValue(0)
    );
    const [activateVisionSection, setActivateVisionSection] = useState(false);

    const handleHeaderVisibility = useCallback(param => {
        setIsHeaderVisible(param);
    }, []);

    const handleNavbarVisibility = useCallback(param => {
        setIsNavbarVisible(param);
    }, []);

    return (
        <GlobalContext.Provider
            value={{
                isHeaderVisible,
                isNavbarVisible,
                isPrevWorkModalOpen,
                isFloatingPageScrollTopVisibile,
                footerEmptySpaceScrollYProgress,
                activateVisionSection,
                setFooterEmptySpaceScrollYProgress,
                setActivateVisionSection,
                setIsPrevWorkModalOpen,
                handleHeaderVisibility,
                handleNavbarVisibility,
                setIsFloatingPageScrollTopVisibile,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalProvider;
