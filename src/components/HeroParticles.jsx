import { useEffect, useState } from 'react';

import styles from './HeroParticles.module.css';

const heroParticlesCount = 60;
let firstTimeLoad = true;

const HeroParticles = () => {
    const [isHeroParticlesVisible, setIsHeroParticlesVisible] = useState(false);

    useEffect(() => {
        if (firstTimeLoad) {
            setTimeout(() => {
                setIsHeroParticlesVisible(true);
                firstTimeLoad = false;
            }, 7000);
        } else {
            setIsHeroParticlesVisible(true);
        }
    }, []);

    return (
        <div className={styles.hero_particles_layout_wrapper}>
            {isHeroParticlesVisible && (
                <div className={styles.hero_particles_sticky_parent}>
                    {Array.from({ length: heroParticlesCount }, (_, i) => i + 1).map(num => (
                        <div key={num} className={styles.firefly} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default HeroParticles;
