import { useState } from 'react';
import { AnimatePresence, LazyMotion, domAnimation, m } from 'framer-motion';
import { useLocation, useOutlet } from 'react-router-dom';

import { Header } from '../layout';
import { Aside } from '../components';

const AnimatedOutlet = () => {
    const o = useOutlet();
    const [outlet] = useState(o);

    return <>{outlet}</>;
};

const pageTransitionDuration = window.innerWidth <= 1050 ? 0.5 : 0.8;
const pageTransitionVariants = {
    initial: {
        clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)',
        transition: { duration: pageTransitionDuration },
    },
    animate: {
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        transition: { duration: pageTransitionDuration, staggerChildren: 0.1 },
    },
    exit: {
        clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)',
        transition: { duration: pageTransitionDuration },
    },
};

const RootLayout = () => {
    const location = useLocation();

    return (
        <LazyMotion features={domAnimation} strict>
            <Header />
            <AnimatePresence mode="wait" initial={false}>
                <m.div
                    key={location.pathname}
                    variants={pageTransitionVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                >
                    <AnimatedOutlet />
                </m.div>
            </AnimatePresence>
            <Aside />
        </LazyMotion>
    );
};
export default RootLayout;
