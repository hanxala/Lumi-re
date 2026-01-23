'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { staggerContainer, staggerItem } from '@/lib/animations';
import styles from './CategoriesSection.module.css';

const categories = [
    {
        id: 'lighting',
        name: 'Lighting',
        image: 'https://picsum.photos/seed/cat1/800/600',
        count: 120
    },
    {
        id: 'furniture',
        name: 'Furniture',
        image: 'https://picsum.photos/seed/cat2/800/600',
        count: 85
    },
    {
        id: 'decor',
        name: 'Home Decor',
        image: 'https://picsum.photos/seed/cat3/800/600',
        count: 200
    }
];

export default function CategoriesSection() {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div>
                        <h2 className={styles.title}>Shop by Category</h2>
                        <span className={styles.subtitle}>Browse our wide range of collections</span>
                    </div>
                </div>

                <motion.div
                    className={styles.grid}
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {categories.map((category) => (
                        <Link href={`/products?category=${category.id}`} key={category.id}>
                            <motion.div
                                className={styles.card}
                                variants={staggerItem}
                            >
                                <div className={styles.imageWrapper}>
                                    <Image
                                        src={category.image}
                                        alt={category.name}
                                        fill
                                        className={styles.image}
                                    />
                                    <div className={styles.overlay}>
                                        <h3 className={styles.cardTitle}>{category.name}</h3>
                                        <div className={styles.cardLink}>
                                            Explore {category.count} Products <ArrowRight size={16} />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
