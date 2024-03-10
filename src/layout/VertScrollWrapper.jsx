import { useState } from 'react';
import { m, useReducedMotion } from 'framer-motion';

import { Hero, KnownFor } from './';
import { HeroImgSeq, HeroParticles } from '../components';

import styles from './VertScrollWrapper.module.css';

const VertScrollWrapper = () => {
    const isReduced = useReducedMotion();
    const [isHeroParticlesVisible, setHeroParticlesVisibility] = useState(!isReduced);

    return (
        <m.section
            className={`${styles.vert_scroll_wrapper}`}
            onViewportEnter={() => setHeroParticlesVisibility(true)}
            onViewportLeave={() => setHeroParticlesVisibility(false)}
        >
            <Hero />
            {!isReduced && isHeroParticlesVisible && <HeroParticles />}
            <HeroImgSeq />
            <KnownFor />
        </m.section>
    );
};

export default VertScrollWrapper;
