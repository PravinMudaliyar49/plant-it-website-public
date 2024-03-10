import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useGlobalContext } from '../store';
import { handlePreloaderVisibility, handleWindowScrollToTop } from '../utils/helpers';
import { blogPagesData } from '../utils/website-data';

import styles from './Blogs.module.css';

const {
    blogsPageThumbnailLM,
    blogsPageThumbnailSL,
    blogsPageThumbnailLL,
    blogsPageThumbnailM,
    blogsIntroSubtitle,
    blogsContentDataArr,
    dummyBlogsFirebaseDataArr,
} = blogPagesData;

const BlogsPage = () => {
    const { handleNavbarVisibility } = useGlobalContext();
    const [blogsViewsCountArr, setBlogsViewsCountArr] = useState(
        Array(dummyBlogsFirebaseDataArr.length).fill(0)
    );

    useEffect(() => {
        handleNavbarVisibility(true);
        handleWindowScrollToTop();
        handlePreloaderVisibility();
    }, [handleNavbarVisibility]);

    return (
        <main className={`${styles.blogs_page_main}`}>
            <section className={`section ${styles.blogs_page_intro_section}`}>
                <div className={styles.blogs_intro_banner_img_container}>
                    <picture>
                        <source srcSet={blogsPageThumbnailM} media="(min-width: 1900px)" />
                        <source srcSet={blogsPageThumbnailLL} media="(min-width: 1450px)" />
                        <source srcSet={blogsPageThumbnailSL} media="(min-width: 750px)" />
                        <img src={blogsPageThumbnailLM} alt="Blogs page thumbnail picture" />
                    </picture>
                </div>
                <div className={styles.blogs_page_intro_writings_container}>
                    <h2 className={styles.blogs_page_intro_heading}>My Insights.</h2>
                    <p className={`body_text_600 ${styles.blogs_page_intro_paragraph}`}>
                        {blogsIntroSubtitle}
                    </p>
                </div>
            </section>
            <section className={styles.blogs_page_content_section}>
                <ul className={`section_container ${styles.blogs_content_column_list}`}>
                    {blogsContentDataArr.map(
                        (
                            {
                                id,
                                blogTitle,
                                blogPublishedDate,
                                blogShortIntro,
                                blogReadMinsTime,
                                blogContentTags,
                            },
                            idx
                        ) => {
                            const blogViewsCount = blogsViewsCountArr[idx];

                            const viewStr = blogViewsCount === 1 ? '' : 's';
                            const readMinStr = blogReadMinsTime === 1 ? '' : 's';

                            return (
                                <li key={id} className={styles.blog_content_container}>
                                    <Link to={id} className={styles.blog_content_link}>
                                        <div className={styles.blog_content_left_container}>
                                            <h3 className={`${styles.blog_title}`}>{blogTitle}</h3>
                                            <p
                                                className={`body_text_500 ${styles.blog_short_intro}`}
                                            >
                                                {blogShortIntro}
                                            </p>
                                            <ul
                                                className={`body_text_500 ${styles.sm_blog_extra_info_container}`}
                                            >
                                                <li>
                                                    {blogViewsCount} view{viewStr}
                                                </li>
                                                <li>
                                                    {blogReadMinsTime} min{readMinStr} read
                                                </li>
                                            </ul>
                                            <ul
                                                className={`body_text_500 ${styles.blog_content_tags}`}
                                            >
                                                {blogContentTags.map(tag => (
                                                    <li key={tag}>{tag}</li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className={styles.blog_content_right_container}>
                                            <span className={`${styles.blog_published_date}`}>
                                                {blogPublishedDate}
                                            </span>
                                            <ul
                                                className={`body_text_500 ${styles.blog_extra_info_container}`}
                                            >
                                                <li>
                                                    {blogViewsCount} view{viewStr}
                                                </li>
                                                <li>
                                                    {blogReadMinsTime} min{readMinStr} read
                                                </li>
                                            </ul>
                                        </div>
                                    </Link>
                                </li>
                            );
                        }
                    )}
                </ul>
            </section>
        </main>
    );
};
export default BlogsPage;
