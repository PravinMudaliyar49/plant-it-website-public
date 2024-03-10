import HomePage from '../pages/Home';
import BlogsPage from '../pages/Blogs';
import BlogContentPage from '../pages/BlogContent';

export const routes = [
    {
        path: '/',
        element: <HomePage />,
    },
    {
        path: '/blogs',
        element: <BlogsPage />,
    },
    {
        path: '/blogs/:blogId',
        element: <BlogContentPage />,
    },
];

export const navLinks = [
    { id: 1, link: '/', name: 'Home' },
    { id: 2, link: '/blogs', name: 'Blogs' },
];
