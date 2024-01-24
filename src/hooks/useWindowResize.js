import { useState, useEffect } from 'react';

const useWindowResize = () => {
    const [isDrawerOpen, setDrawerOpen] = useState(window.innerWidth > 800);

    const handleResize = (state) => {
        setDrawerOpen(state);
    };

    useEffect(() => {
        window.addEventListener('resize', () => handleResize(window.innerWidth > 800));
        return () => {
            window.removeEventListener('resize', () => handleResize(window.innerWidth > 800));
        };
    }, []);

    return {
        isDrawerOpen,
        handleResize
    };
};

export default useWindowResize;