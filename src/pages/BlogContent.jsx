/* eslint-disable react/no-unescaped-entities */

import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { useGlobalContext } from '../store';
import { handlePreloaderVisibility, handleWindowScrollToTop } from '../utils/helpers';
import { blogPagesData } from '../utils/website-data';

import styles from './BlogContent.module.css';

const { blogsContentDataArr } = blogPagesData;

const blogContentJSXArr = [
    <>
        <p>
            Hey there! Have you ever imagined having a cool spot online where people who love plants
            hang out and chat about all things green? Well, guess what? That’s exactly what our
            WhatsApp community is all about! It’s like stumbling upon a secret garden on your phone,
            where we share tips, stories, and laughs about gardening.
        </p>
        <p>
            Let me plant a seed in your head: Imagine logging into our community session and being
            greeted by a bunch of friendly faces, all eager to talk about their latest plant
            milestones and gardening achievements. Whether someone just successfully propagated
            their favorite plant or discovered a new gardening hack, there’s always something
            exciting happening in our little green corner of the internet.
        </p>
        <p>
            Now, here’s the really cool part: Every month, we host special sessions where
            experienced gardeners share their wisdom with the community. They cover topics like how
            to create the perfect soil mix for your plants or the best ways to get rid of those hard
            bugs. Whether you’re a newbie just starting out or a seasoned pro looking to expand your
            knowledge, you’ll always learn something new and interesting during these sessions.
        </p>
        <p>
            But wait, there’s more! Every few months, we also organize awesome giveaways for our
            members. Yep, you heard that right! You could win some seriously cool stuff, like rare
            plant specimens or high-quality gardening tools to take your garden to the next level.
            It’s like a festival for plant lovers, and who doesn’t love getting presents, right?
        </p>
        <p>
            But you know what the absolute best part of our WhatsApp community is? It’s the sense of
            friendship and unity that we’ve built together. When things get tough in your
            garden—whether you’re dealing with stubborn pests or struggling to keep a plant
            alive—we’re all here to help. We share tips, give advice, and cheer each other on
            through the highs and lows of gardening. Because let’s face it, no one gardens alone in
            our community!
        </p>
        <p>
            So, if you’re someone who loves plants or even if you’re just a little curious about
            joining our green community, we’d love to have you on board! Let’s come together to make
            our gardens—and our friendships—grow and flourish. See you in the community!
        </p>
        <p>
            I will soon share the details on how to join this community. Bookmark this page and stay
            tuned for updates.
        </p>
    </>,
    <>
        <p>
            My journey into garden design started with a simple love for plants and gardening.
            People even started calling me the 'plant boy' cuz of it! Things got interesting when my
            neighbor, who runs a café, asked me to beautify his place with some greenery.
        </p>
        <p>
            Now, I didn't know much, but I was full of enthusiasm. Ready with Google research and
            some friendly advice, I got to work. That's when I came across fabric grow bags – a
            game-changer! With a lil help from the café staff, we transformed the space, even
            setting up a plant bed to add more greenery.
        </p>
        <p>
            Of course, it wasn't easy at all! We had some playful pets trying to spoil our fabric
            grow bags, but still, we managed the plants to thrive. Additionally, I added a Rangoon
            creeper set up in the bed, covering half the name board, suggested by the café owner and
            my neighbor, Srinivas.
        </p>
        <p>
            Through projects like these, I discovered the world of landscaping and all its
            possibilities. And thanks to happy clients spreading the word, I found myself
            overwhelmed with more projects and opportunities than I could handle.
        </p>
        <p>
            Looking back, what started as a hobby has turned into a wild ride in garden designing.
            With each project, I'm learning and growing, excited to see where this green journey
            takes me next!
        </p>
    </>,
];

const BlogContentPage = () => {
    const { handleNavbarVisibility } = useGlobalContext();
    const { blogId } = useParams();

    const [currBlogViewsCount, setCurrBlogViewsCount] = useState(1);

    const currBlogIdx = blogsContentDataArr.findIndex(obj => obj.id === blogId);
    const { blogTitle, blogPublishedDate, blogThumbnail, blogBiggerIntro, blogContentTags } =
        blogsContentDataArr[currBlogIdx];

    useEffect(() => {
        handleNavbarVisibility(true);
        handleWindowScrollToTop();
        handlePreloaderVisibility();
    }, [handleNavbarVisibility]);

    const handleBlogShareClick = () => {
        navigator.clipboard.writeText(`https://abhiplantit.com/blogs/${blogId}`);
        alert(`"${blogTitle.slice(0, -1)}" blog's link copied!`);
    };

    return (
        <main className={styles.blog_content_page_main}>
            <section className={`section ${styles.blog_content_page_intro_section}`}>
                <div
                    className={`section_container ${styles.blog_content_page_intro_section_container}`}
                >
                    <h1 className={styles.blog_intro_title_container}>
                        <span className={`body_text_400 ${styles.blog_intro_published_date}`}>
                            {blogPublishedDate}
                        </span>
                        <p>{blogTitle}</p>
                    </h1>
                    <p className={`body_text_600 ${styles.blog_intro_long_paragraph}`}>
                        {blogBiggerIntro}
                    </p>
                    <div className={styles.blog_intro_extra_info_container}>
                        {
                            <ul className={styles.blog_intro_tags_list}>
                                {blogContentTags.map(tag => (
                                    <li key={tag} className="body_text_400">
                                        {tag}
                                    </li>
                                ))}
                            </ul>
                        }
                        <button
                            className={`${styles.blog_cta_btn} ${styles.share_icon_btn}`}
                            onClick={handleBlogShareClick}
                        >
                            <span className="body_text_400">Share</span>
                            <svg viewBox="0 0 24 24" fill="none">
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M15.22 4.93a.42.42 0 0 1-.12.13h.01a.45.45 0 0 1-.29.08.52.52 0 0 1-.3-.13L12.5 3v7.07a.5.5 0 0 1-.5.5.5.5 0 0 1-.5-.5V3.02l-2 2a.45.45 0 0 1-.57.04h-.02a.4.4 0 0 1-.16-.3.4.4 0 0 1 .1-.32l2.8-2.8a.5.5 0 0 1 .7 0l2.8 2.8a.42.42 0 0 1 .07.5zm-.1.14zm.88 2h1.5a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-11a2 2 0 0 1-2-2v-10a2 2 0 0 1 2-2H8a.5.5 0 0 1 .35.14c.1.1.15.22.15.35a.5.5 0 0 1-.15.35.5.5 0 0 1-.35.15H6.4c-.5 0-.9.4-.9.9v10.2a.9.9 0 0 0 .9.9h11.2c.5 0 .9-.4.9-.9V8.96c0-.5-.4-.9-.9-.9H16a.5.5 0 0 1 0-1z"
                                    fill="var(--color)"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className={styles.blog_thumbnail_container}>
                    <picture>
                        <source srcSet={blogThumbnail.SL} media="(min-width: 750px)" />
                        <img src={blogThumbnail.LM} alt={`${blogTitle} thumbnail picture`} />
                    </picture>
                </div>
            </section>
            <section className={`section ${styles.blog_content_writings_section}`}>
                <div className={styles.blog_content_writings_section_container}>
                    <div className={styles.blog_content_writings_container}>
                        {blogContentJSXArr[currBlogIdx]}
                    </div>
                </div>
            </section>
            <section className={`section ${styles.blog_content_page_footer}`}>
                <div className={styles.blog_content_page_footer_container}>
                    <div className={styles.blog_footer_first_row}>
                        <p className={`body_text_500 ${styles.blog_footer_views_count}`}>
                            <span className="body_text_600">{currBlogViewsCount}</span> view
                            {+currBlogViewsCount === 1 ? '' : 's'}
                        </p>
                        <button
                            className={`${styles.blog_cta_btn} ${styles.share_icon_btn}`}
                            onClick={handleBlogShareClick}
                        >
                            <span className="body_text_500">Share</span>
                            <svg viewBox="0 0 24 24" fill="none">
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M15.22 4.93a.42.42 0 0 1-.12.13h.01a.45.45 0 0 1-.29.08.52.52 0 0 1-.3-.13L12.5 3v7.07a.5.5 0 0 1-.5.5.5.5 0 0 1-.5-.5V3.02l-2 2a.45.45 0 0 1-.57.04h-.02a.4.4 0 0 1-.16-.3.4.4 0 0 1 .1-.32l2.8-2.8a.5.5 0 0 1 .7 0l2.8 2.8a.42.42 0 0 1 .07.5zm-.1.14zm.88 2h1.5a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-11a2 2 0 0 1-2-2v-10a2 2 0 0 1 2-2H8a.5.5 0 0 1 .35.14c.1.1.15.22.15.35a.5.5 0 0 1-.15.35.5.5 0 0 1-.35.15H6.4c-.5 0-.9.4-.9.9v10.2a.9.9 0 0 0 .9.9h11.2c.5 0 .9-.4.9-.9V8.96c0-.5-.4-.9-.9-.9H16a.5.5 0 0 1 0-1z"
                                    fill="var(--color)"
                                />
                            </svg>
                        </button>
                    </div>
                    <div className={styles.blog_footer_second_row}>
                        <h3 className={`body_text_900 ${styles.blog_form_feedback_title}`}>
                            Liked the content? <br className={styles.feedback_title_line_break} />{' '}
                            I'd love to hear your feedback...
                        </h3>
                        <form className={styles.blog_content_feedback_form}>
                            <div className={styles.feedback_form_left_container}>
                                <div className={styles.form_row}>
                                    <label
                                        htmlFor="name"
                                        className={`body_text_300 ${styles.form_input_label}`}
                                    >
                                        Your full name *
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        className={`body_text_400 ${styles.form_input}`}
                                        name="username"
                                        required
                                        pattern="^\S+\s+\S+$"
                                        title="The name should consist of exactly two words."
                                    />
                                </div>
                                <div className={styles.form_row}>
                                    <label
                                        htmlFor="email"
                                        className={`body_text_300 ${styles.form_input_label}`}
                                    >
                                        Your email *
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        className={`body_text_400 ${styles.form_input}`}
                                        name="useremail"
                                        required
                                        title="Please enter a valid email."
                                    />
                                </div>
                            </div>
                            <div className={styles.feedback_form_right_container}>
                                <div className={styles.form_row}>
                                    <label
                                        htmlFor="message"
                                        className={`body_text_300 ${styles.form_input_label}`}
                                    >
                                        Anything you'd like to say *
                                    </label>
                                    <textarea
                                        id="message"
                                        rows={2}
                                        className={`body_text_400 ${styles.form_input}`}
                                        name="usertext"
                                        required
                                    />
                                </div>
                                <button
                                    className={`body_text_500 ${styles.feedback_form_submit_btn} ${styles.temp_disable_stylings}`}
                                    disabled
                                >
                                    Coming soon (May 2024)
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className={styles.blog_footer_third_row}>
                        <Link to="/blogs">
                            <button className={`body_text_500 ${styles.blogs_page_return_btn}`}>
                                Back to Blogs page
                            </button>
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
};
export default BlogContentPage;
