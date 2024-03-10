// For all the reference links, check the first-draft folder.

import { ReactLenis } from '@studio-freight/react-lenis';

function LenisSmoothScrolling({ children }) {
    const lenisOptions = {
        lerp: 0.1,
        wheelMultiplier: 0.6,
        smoothTouch: false,
        smooth: true,
    };

    return (
        <ReactLenis root options={lenisOptions}>
            {children}
        </ReactLenis>
    );
}
export default LenisSmoothScrolling;
