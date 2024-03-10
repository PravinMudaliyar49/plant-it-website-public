export const handleWindowScrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
};

export const handlePreloaderVisibility = () => {
    const preloaderScreen = document.querySelector('.preloader_screen_container');
    const lastWelcomeTextSpan = document.querySelector('.last_wlc_text_span');

    if (preloaderScreen && !preloaderScreen.classList.contains('hide')) {
        lastWelcomeTextSpan.addEventListener('transitionend', () => {
            setTimeout(() => {
                preloaderScreen.classList.add('hide');
            }, 500);
        });

        preloaderScreen.addEventListener('animationend', () => {
            preloaderScreen.classList.add('remove');
            document.body.classList.remove('stop_page_scroll');
        });
    }
};

export const handleCommunityCTAClick = () => {
    alert('Coming soon (May 2024)...');
};

export function createReadableCustomDateObj(date) {
    return {
        date: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
        time: `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
    };
}

export function getTimestampDiffMins(prevTimestamp, newTimestamp = new Date().getTime()) {
    return Math.floor((newTimestamp - prevTimestamp) / 60000);
}
