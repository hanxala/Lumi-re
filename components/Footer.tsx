'use client';

import { motion } from 'framer-motion';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';
import styles from './Footer.module.css';

const footerLinks = {
    shop: [
        { name: 'All Products', href: '/products' },
        { name: 'Chandeliers', href: '/products?category=chandeliers' },
        { name: 'Pendant Lights', href: '/products?category=pendants' },
        { name: 'Table Lamps', href: '/products?category=table-lamps' },
    ],
    company: [
        { name: 'About Us', href: '/about' },
        { name: 'Contact', href: '/contact' },
        { name: 'Shipping & Returns', href: '/shipping' },
        { name: 'Privacy Policy', href: '/privacy' },
    ],
    support: [
        { name: 'FAQ', href: '/faq' },
        { name: 'Installation Guide', href: '/installation' },
        { name: 'Warranty', href: '/warranty' },
        { name: 'Care Instructions', href: '/care' },
    ],
};

const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
];

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.grid}>
                    {/* Brand Section */}
                    <div className={styles.brandSection}>
                        <h3 className={styles.brandName}>Lumière</h3>
                        <p className={styles.brandDescription}>
                            Defying conventions with our curated collection of premium lighting and home decor.
                        </p>
                        <div className={styles.social}>
                            {socialLinks.map((social) => (
                                <motion.a
                                    key={social.label}
                                    href={social.href}
                                    className={styles.socialLink}
                                    aria-label={social.label}
                                    whileHover={{ scale: 1.1, y: -3 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <social.icon size={20} />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Shop Links */}
                    <div className={styles.linkSection}>
                        <h4 className={styles.linkTitle}>Shop</h4>
                        <ul className={styles.linkList}>
                            {footerLinks.shop.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className={styles.link}>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div className={styles.linkSection}>
                        <h4 className={styles.linkTitle}>Company</h4>
                        <ul className={styles.linkList}>
                            {footerLinks.company.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className={styles.link}>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div className={styles.linkSection}>
                        <h4 className={styles.linkTitle}>Support</h4>
                        <ul className={styles.linkList}>
                            {footerLinks.support.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className={styles.link}>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Section */}
                    <div className={styles.linkSection}>
                        <h4 className={styles.linkTitle}>Contact</h4>
                        <ul className={styles.contactList}>
                            <li className={styles.contactItem}>
                                <MapPin size={16} />
                                <span>Mumbai, India</span>
                            </li>
                            <li className={styles.contactItem}>
                                <Phone size={16} />
                                <span>+91 8779603467</span>
                            </li>
                            <li className={styles.contactItem}>
                                <Mail size={16} />
                                <span>hanzalakhan0799@gmail.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Newsletter */}
                <div className={styles.newsletter}>
                    <h4 className={styles.newsletterTitle}>Subscribe to our newsletter</h4>
                    <p className={styles.newsletterDescription}>
                        Get the latest updates on new products and exclusive offers.
                    </p>
                    <form className={styles.newsletterForm}>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className={styles.newsletterInput}
                        />
                        <motion.button
                            type="submit"
                            className={styles.newsletterButton}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Subscribe
                        </motion.button>
                    </form>
                </div>

                {/* Bottom Bar */}
                <div className={styles.bottom}>
                    <p className={styles.copyright}>
                        © {new Date().getFullYear()} Lumière. All rights reserved.
                    </p>
                    <div className={styles.payments}>
                        <span className={styles.paymentText}>We accept:</span>
                        <div className={styles.paymentIcons}>
                            <span>💳</span>
                            <span>💵</span>
                            <span>🏦</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
