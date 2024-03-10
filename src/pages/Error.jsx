/* eslint-disable react/no-unescaped-entities */

import { Link } from 'react-router-dom';

import { handlePreloaderVisibility } from '../utils/helpers';

import errorGraphic from '../assets/images/graphics/error-graphic-404.svg';

import styles from './Error.module.css';
import { useEffect } from 'react';

const ErrorPage = () => {
    useEffect(() => {
        handlePreloaderVisibility();
    });

    return (
        <main className={styles.error_page_main}>
            <section className={`section`}>
                <div className={`section_container ${styles.error_section_container}`}>
                    <div className={styles.error_graphic_container}>
                        <img src={errorGraphic} alt="404 error graphic" />
                        <a
                            href="https://storyset.com/online"
                            className={styles.error_graphic_attribution}
                        >
                            Online illustrations by Storyset
                        </a>
                    </div>
                    <div className={styles.error_writings_container}>
                        <h2 className="body_text_900">Sorry, page couldn't be found!</h2>
                        <Link to="/">
                            <button className={`body_text_500 ${styles.go_back_btn}`}>
                                Go back to home page
                            </button>
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
};
export default ErrorPage;
