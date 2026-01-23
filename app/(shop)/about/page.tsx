'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Award, Zap, Users, Globe } from 'lucide-react';
import styles from './page.module.css';

export default function AboutPage() {
    return (
        <div className={styles.page}>
            <div className={styles.container}>
                {/* Hero Section */}
                <motion.section
                    className={styles.hero}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className={styles.title}>Our Story</h1>
                    <p className={styles.subtitle}>
                        Crafting elegance and innovation in every piece of decor.
                    </p>
                </motion.section>

                {/* Main Content */}
                <div className={styles.content}>
                    <motion.div
                        className={styles.textBlock}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2>Who We Are</h2>
                        <p>
                            Founded by <strong>Hanzala Khan</strong>, AntiGravity is a premier destination for modern home aesthetics.
                            Based in the vibrant city of <strong>Mumbai, India</strong>, we are dedicated to bringing you a curated collection
                            of lighting, furniture, and decor that defies conventions.
                        </p>
                        <p>
                            We believe that your home should be a reflection of your personality—bold, unique, and timeless.
                            Our team scours the globe to find pieces that are not just functional but also artistic statements.
                        </p>
                    </motion.div>

                    <motion.div
                        className={styles.imageBlock}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className={styles.imageWrapper}>
                            <Image
                                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000"
                                alt="Our Studio"
                                fill
                                className={styles.image}
                            />
                        </div>
                    </motion.div>
                </div>

                {/* Values Grid */}
                <section className={styles.values}>
                    <h2 className={styles.sectionTitle}>Our Values</h2>
                    <div className={styles.grid}>
                        <div className={styles.card}>
                            <Award className={styles.icon} size={40} />
                            <h3>Excellence</h3>
                            <p>We settle for nothing less than the best in quality and design.</p>
                        </div>
                        <div className={styles.card}>
                            <Zap className={styles.icon} size={40} />
                            <h3>Innovation</h3>
                            <p>Pushing boundaries to bring you futuristic and modern aesthetics.</p>
                        </div>
                        <div className={styles.card}>
                            <Users className={styles.icon} size={40} />
                            <h3>Customer First</h3>
                            <p>Your satisfaction is our priority. We are here to serve you.</p>
                        </div>
                        <div className={styles.card}>
                            <Globe className={styles.icon} size={40} />
                            <h3>Global Vision</h3>
                            <p>Bringing international trends to your doorstep in India.</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
