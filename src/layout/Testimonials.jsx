import { useCallback, useRef, useState } from 'react';
import { m } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

import { useGlobalContext } from '../store';
import { testimonialsSectionData } from '../utils/website-data';

import redirectArrowIcon from '../assets/images/icons/redirect-arrow-icon.svg';
import quotesLeftIcon from '../assets/images/icons/quotes-left-icon.svg';

import styles from './Testimonials.module.css';

gsap.registerPlugin(ScrollTrigger);

const { testimonialsHeadingSubtitle, testimonialsInfoArr } = testimonialsSectionData;
const textClassNamesArr = [
    `${styles.testimonial_text_1}`,
    `${styles.testimonial_text_2}`,
    `${styles.testimonial_text_3}`,
    `${styles.testimonial_text_4}`,
];

const Testimonials = () => {
    const { setActivateVisionSection } = useGlobalContext();

    const activeTestimonialImgRef = useRef(null);
    const testimonialImagesArrRef = useRef([]);
    const stickyImagesContRef = useRef(null);
    const gsapContainerRef = useRef(null);

    const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);

    const handleActiveImageHighlight = useCallback(coords => {
        activeTestimonialImgRef.current.style.width = `${coords.width}px`;
        activeTestimonialImgRef.current.style.height = `${coords.height}px`;
        activeTestimonialImgRef.current.style.transform = `translate(${0}px, ${coords.top}px)`;

        activeTestimonialImgRef.current.classList.add(`${styles.visible}`);
    }, []);

    const handleTestimonialChange = idx => {
        setActiveTestimonialIdx(idx);

        const currentTestimonialImgRef = testimonialImagesArrRef.current[idx];

        const testimonialsLayoutWrapperPaddingVert = Number.parseFloat(
            window.getComputedStyle(stickyImagesContRef.current).paddingTop
        );

        const coords = {
            width: currentTestimonialImgRef.getBoundingClientRect().width,
            height: currentTestimonialImgRef.getBoundingClientRect().height,

            top:
                currentTestimonialImgRef.getBoundingClientRect().top -
                stickyImagesContRef.current.getBoundingClientRect().top -
                testimonialsLayoutWrapperPaddingVert,
            left: currentTestimonialImgRef.getBoundingClientRect().left,
        };

        handleActiveImageHighlight(coords);
    };

    useGSAP(
        () => {
            const gsapProperties = {
                stagger: 0.5,
                color: '#fff',
                duration: 35,
                ease: 'power2.in',
            };

            gsap.to(`.${styles.testimonial_text_1}>span`, {
                scrollTrigger: {
                    trigger: `.${styles.testimonial_text_1}>span`,
                    start: 'top bottom-=15%',
                    end: 'bottom center-=20%',
                    scrub: 1.2,
                },
                ...gsapProperties,
            });

            gsap.to(`.${styles.testimonial_text_2}>span`, {
                scrollTrigger: {
                    trigger: `.${styles.testimonial_text_2}>span`,
                    start: 'top bottom-=15%',
                    end: 'bottom center-=20%',
                    scrub: 1.2,
                },
                ...gsapProperties,
            });

            gsap.to(`.${styles.testimonial_text_3}>span`, {
                scrollTrigger: {
                    trigger: `.${styles.testimonial_text_3}>span`,
                    start: 'top bottom-=15%',
                    end: 'bottom center-=20%',
                    scrub: 1.2,
                },
                ...gsapProperties,
            });

            gsap.to(`.${styles.testimonial_text_4}>span`, {
                scrollTrigger: {
                    trigger: `.${styles.testimonial_text_4}>span`,
                    start: 'top bottom-=15%',
                    end: 'bottom center-=20%',
                    scrub: 1.2,
                },
                ...gsapProperties,
            });
        },
        { scope: gsapContainerRef }
    );

    return (
        <section className={`section ${styles.testimonials_section}`}>
            <div className={`section_container ${styles.testimonials_section_container}`}>
                <div className={`section_headings`}>
                    <h2>The Testimonials</h2>
                    <p>{testimonialsHeadingSubtitle}</p>
                </div>
                <div className={styles.testimonials_layout_wrapper} ref={gsapContainerRef}>
                    <ul className={styles.sticky_images_container} ref={stickyImagesContRef}>
                        <span
                            className={styles.active_testimonial_image_highlight}
                            ref={activeTestimonialImgRef}
                        ></span>
                        {testimonialsInfoArr.map(
                            (
                                {
                                    testimonialCompanyName,
                                    testimonialPersonImage,
                                    testimonialCompanyImage,
                                },
                                idx
                            ) => {
                                return (
                                    <li
                                        className={`${styles.testimonial_image_container} ${
                                            idx === activeTestimonialIdx ? `${styles.active}` : ''
                                        }`}
                                        key={idx}
                                        ref={el => (testimonialImagesArrRef.current[idx] = el)}
                                    >
                                        <picture className={styles.testimonial_person_img}>
                                            <source
                                                srcSet={testimonialPersonImage.M}
                                                media="(min-width: 1050px)"
                                            />
                                            <img
                                                src={testimonialPersonImage.LM}
                                                alt={`${testimonialCompanyName} testimonial person picture`}
                                            />
                                        </picture>
                                        <picture className={styles.testimonial_company_img}>
                                            <source
                                                srcSet={testimonialCompanyImage.M}
                                                media="(min-width: 1050px)"
                                            />
                                            <img
                                                src={testimonialCompanyImage.LM}
                                                alt={`${testimonialCompanyName} testimonial logo picture`}
                                            />
                                        </picture>
                                    </li>
                                );
                            }
                        )}
                    </ul>
                    <ul className={styles.testimonials_content_layout_wrapper}>
                        {testimonialsInfoArr.map(
                            (
                                {
                                    text,
                                    testimonialPersonName,
                                    testimonialPersonDesignation,
                                    testimonialPersonSocialLinks,
                                },
                                idx
                            ) => (
                                <m.li
                                    key={idx}
                                    className={`${styles.testimonial_content_container}`}
                                    onViewportEnter={() => handleTestimonialChange(idx)}
                                    viewport={{
                                        margin: `${window.innerWidth < 1050 ? -35 : -49}%`,
                                    }}
                                >
                                    <p
                                        className={`${styles.testimonial_text} ${textClassNamesArr[idx]}`}
                                    >
                                        {text.split('').map((el, id) => (
                                            <span key={id}>{el}</span>
                                        ))}
                                        <span className={styles.testimonial_quotes_container}>
                                            <img src={quotesLeftIcon} alt="Testimonial quotes icon" />
                                        </span>
                                    </p>
                                    <div className={styles.testimonial_extra_info_container}>
                                        <p
                                            className={`body_text_500 ${styles.testimonial_person_info}`}
                                        >
                                            <span className={styles.testimonial_name}>
                                                {testimonialPersonName},
                                            </span>{' '}
                                            <span className={styles.testimonial_designation}>
                                                {testimonialPersonDesignation}
                                            </span>
                                        </p>
                                        <ul
                                            className={
                                                styles.testimonial_person_social_list_container
                                            }
                                        >
                                            {testimonialPersonSocialLinks.map(
                                                ({ media, link }, id) => (
                                                    <li key={id}>
                                                        <a
                                                            href={link}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="link_text body_text_300"
                                                        >
                                                            <span className="link_word">
                                                                {media}
                                                            </span>{' '}
                                                            <span className="redirect_arrow">
                                                                <img
                                                                    src={redirectArrowIcon}
                                                                    alt="Redirect arrow icon"
                                                                />
                                                            </span>
                                                        </a>
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </div>
                                </m.li>
                            )
                        )}
                    </ul>
                </div>
            </div>
            <m.div
                className={styles.vision_section_activation_viewport_check}
                onViewportEnter={() => setActivateVisionSection(true)}
                viewport={{ margin: '-49%' }}
            />
        </section>
    );
};
export default Testimonials;
