import { useEffect } from 'react';

import { Vision, MemoVertScrollWrapper, PrevWorks, Testimonials, Footer } from '../layout';
import { handlePreloaderVisibility } from '../utils/helpers';

import styles from './Home.module.css';

const HomePage = () => {
    useEffect(() => {
        handlePreloaderVisibility();
    }, []);

    return (
        <>
            <Vision />
            <main className={styles.main}>
                <MemoVertScrollWrapper />
                <PrevWorks />
                <Testimonials />
            </main>
            <Footer />
        </>
    );
};

export default HomePage;
