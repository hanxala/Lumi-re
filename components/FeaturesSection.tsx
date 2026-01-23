'use client';

import { motion } from 'framer-motion';
import { Truck, ShieldCheck, Clock, HeartHandshake } from 'lucide-react';
import { staggerContainer, staggerItem } from '@/lib/animations';
import styles from './FeaturesSection.module.css';

const features = [
    {
        icon: Truck,
        title: 'Free Shipping',
        description: 'Enjoy free shipping on all orders over $500. We ensure safe and timely delivery to your doorstep.'
    },
    {
        icon: ShieldCheck,
        title: 'Secure Payment',
        description: 'Shop with confidence using our secure payment gateways. Your data is protected with 256-bit encryption.'
    },
    {
        icon: Clock,
        title: '24/7 Support',
        description: 'Our dedicated support team is available round the clock to assist you with any queries or concerns.'
    },
    {
        icon: HeartHandshake,
        title: 'Quality Guarantee',
        description: 'We stand by the quality of our products. If you are not satisfied, return within 30 days for a full refund.'
    }
];

export default function FeaturesSection() {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <motion.div
                    className={styles.header}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className={styles.title}>Why Choose Us</h2>
                    <p className={styles.subtitle}>
                        We are committed to providing the best shopping experience for our customers.
                    </p>
                </motion.div>

                <motion.div
                    className={styles.grid}
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <motion.div
                                key={index}
                                className={styles.feature}
                                variants={staggerItem}
                            >
                                <div className={styles.iconWrapper}>
                                    <Icon size={32} />
                                </div>
                                <h3 className={styles.featureTitle}>{feature.title}</h3>
                                <p className={styles.featureDescription}>{feature.description}</p>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
