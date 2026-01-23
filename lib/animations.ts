import { Variants } from 'framer-motion';

// Fade In Animation
export const fadeIn: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.6,
            ease: 'easeOut',
        },
    },
};

// Slide Up Animation
export const slideUp: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: 'easeOut',
        },
    },
};

// Slide Down Animation
export const slideDown: Variants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: 'easeOut',
        },
    },
};

// Slide Left Animation
export const slideLeft: Variants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.6,
            ease: 'easeOut',
        },
    },
};

// Slide Right Animation
export const slideRight: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.6,
            ease: 'easeOut',
        },
    },
};

// Scale In Animation
export const scaleIn: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.5,
            ease: 'easeOut',
        },
    },
};

// Stagger Container
export const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

// Stagger Item
export const staggerItem: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: 'easeOut',
        },
    },
};

// Hover Scale
export const hoverScale = {
    scale: 1.05,
    transition: {
        duration: 0.3,
        ease: 'easeInOut',
    },
};

// Hover Lift
export const hoverLift = {
    y: -8,
    transition: {
        duration: 0.3,
        ease: 'easeInOut',
    },
};

// Tap Scale
export const tapScale = {
    scale: 0.95,
};

// Page Transition
export const pageTransition: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.5,
            ease: 'easeOut',
        },
    },
    exit: {
        opacity: 0,
        x: 20,
        transition: {
            duration: 0.3,
            ease: 'easeIn',
        },
    },
};

// Modal Animation
export const modalBackdrop: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.3,
        },
    },
    exit: {
        opacity: 0,
        transition: {
            duration: 0.3,
        },
    },
};

export const modalContent: Variants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            duration: 0.3,
            ease: 'easeOut',
        },
    },
    exit: {
        opacity: 0,
        scale: 0.9,
        y: 20,
        transition: {
            duration: 0.2,
            ease: 'easeIn',
        },
    },
};

// Drawer Animation (for mobile menu)
export const drawerVariants: Variants = {
    hidden: { x: '-100%' },
    visible: {
        x: 0,
        transition: {
            duration: 0.3,
            ease: 'easeOut',
        },
    },
    exit: {
        x: '-100%',
        transition: {
            duration: 0.3,
            ease: 'easeIn',
        },
    },
};

// Number Counter Animation
export const counterAnimation = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
};

// Infinite Float
export const floatAnimation = {
    y: [0, -20, 0],
    transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
    },
};

// Pulse Animation
export const pulseAnimation = {
    scale: [1, 1.05, 1],
    transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
    },
};
