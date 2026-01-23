'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, Tag, Star } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Button from './ui/Button';
import styles from './Hero.module.css';

const defaultSlides = [
    {
        _id: '1',
        badge: 'New Collection 2026',
        icon: Sparkles,
        title: 'Illuminate Your',
        highlight: ' Space',
        description: 'Discover our curated collection of premium lighting and home decor. Transform your living spaces with elegant designs.',
        image: 'https://picsum.photos/seed/lumiere1/1200/800',
        ctaLink: '/products',
        ctaText: 'Shop Now',
        color: '#D4AF37'
    },
    {
        _id: '2',
        badge: 'Special Offer',
        icon: Tag,
        title: 'Modern &',
        highlight: ' Minimalist',
        description: 'Get up to 30% off on our exclusive minimalist collection. Limited time offer for the season.',
        image: 'https://picsum.photos/seed/lumiere2/1200/800',
        ctaLink: '/products?category=minimalist',
        ctaText: 'View Offers',
        color: '#E53935'
    },
    {
        _id: '3',
        badge: 'Top Rated',
        icon: Star,
        title: 'Customer',
        highlight: ' Favorites',
        description: 'See what everyone is loving. Our best-selling chandeliers and lamps are back in stock.',
        image: 'https://picsum.photos/seed/lumiere3/1200/800',
        ctaLink: '/products?sort=rating',
        ctaText: 'Shop Best Sellers',
        color: '#43A047'
    }
];

export default function Hero() {
    const [slides, setSlides] = useState(defaultSlides);
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const fetchSlides = async () => {
            try {
                const res = await fetch('/api/hero');
                if (res.ok) {
                    const data = await res.json();
                    if (data && data.length > 0) {
                        // Map API data to component structure if needed, or use directly
                        setSlides(data.map((s: any) => ({
                            ...s,
                            icon: Sparkles, // Default icon or map based on badge
                            cta: s.ctaLink || '/products' // Ensure fallback
                        })));
                    }
                }
            } catch (error) {
                console.error("Failed to fetch hero slides, using default.", error);
            }
        };
        fetchSlides();
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(timer);
    }, [slides.length]);

    // Safe access to current slide
    const slide = slides[currentSlide] || defaultSlides[0];
    const BadgeIcon = slide.icon || Sparkles;

    return (
        <section className={styles.hero}>
            <div className={styles.container}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={slide._id}
                        className={styles.slide}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className={styles.content}>
                            <motion.div
                                className={styles.badge}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <BadgeIcon size={16} />
                                <span suppressHydrationWarning>{slide.badge || 'New'}</span>
                            </motion.div>

                            <motion.h1
                                className={styles.title}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            >
                                {slide.title}
                                <span className={styles.highlight}>{slide.highlight}</span>
                            </motion.h1>

                            <motion.p
                                className={styles.description}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                            >
                                {slide.description}
                            </motion.p>

                            <motion.div
                                className={styles.actions}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                            >
                                <Link href={slide.ctaLink || '#'}>
                                    <Button size="lg" icon={<ArrowRight size={20} />}>
                                        {slide.ctaText}
                                    </Button>
                                </Link>
                                <Link href="/about">
                                    <Button size="lg" variant="outline">
                                        Learn More
                                    </Button>
                                </Link>
                            </motion.div>

                            <motion.div
                                className={styles.stats}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1, delay: 0.8 }}
                            >
                                <div className={styles.stat}>
                                    <span className={styles.statNumber}>500+</span>
                                    <span className={styles.statLabel}>Products</span>
                                </div>
                                <div className={styles.statDivider} />
                                <div className={styles.stat}>
                                    <span className={styles.statNumber}>10K+</span>
                                    <span className={styles.statLabel}>Happy Customers</span>
                                </div>
                                <div className={styles.statDivider} />
                                <div className={styles.stat}>
                                    <span className={styles.statNumber}>4.9★</span>
                                    <span className={styles.statLabel}>Average Rating</span>
                                </div>
                            </motion.div>
                        </div>

                        <div className={styles.visual}>
                            <motion.div
                                className={styles.imageWrapper}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8 }}
                            >
                                <Image
                                    src={slide.image}
                                    alt={slide.title || 'Hero Image'}
                                    fill
                                    className={styles.heroImage}
                                    priority={true}
                                />
                            </motion.div>

                            <motion.div
                                className={styles.floatingElement + ' ' + styles.element1}
                                animate={{ y: [0, -20, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                            />
                            <motion.div
                                className={styles.floatingElement + ' ' + styles.element2}
                                animate={{ y: [0, -30, 0] }}
                                transition={{
                                    duration: 5,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                    delay: 0.5,
                                }}
                            />
                        </div>
                    </motion.div>
                </AnimatePresence>

                <div className={styles.controls}>
                    <div className={styles.dots}>
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                className={`${styles.dot} ${index === currentSlide ? styles.active : ''}`}
                                onClick={() => setCurrentSlide(index)}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>

                <div className={styles.scrollIndicator}>
                    <motion.div
                        className={styles.scrollMouse}
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />
                </div>
            </div>
        </section>
    );
}
