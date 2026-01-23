'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import styles from './page.module.css';

export default function ContactPage() {
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        alert("Thanks for contacting us! We'll get back to you soon.");
    };

    const handleWhatsApp = () => {
        window.open('https://wa.me/918779603467', '_blank');
    };

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <motion.div
                    className={styles.header}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className={styles.title}>Get in Touch</h1>
                    <p className={styles.subtitle}>
                        Have questions? We'd love to hear from you.
                    </p>
                </motion.div>

                <div className={styles.content}>
                    {/* Contact Info */}
                    <motion.div
                        className={styles.infoSection}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className={styles.infoCard}>
                            <h3>Contact Information</h3>
                            <div className={styles.infoItem}>
                                <Phone className={styles.icon} size={20} />
                                <div>
                                    <span className={styles.label}>Phone</span>
                                    <p>+91 8779603467</p>
                                </div>
                            </div>
                            <div className={styles.infoItem}>
                                <Mail className={styles.icon} size={20} />
                                <div>
                                    <span className={styles.label}>Email</span>
                                    <p>hanzalakhan0799@gmail.com</p>
                                </div>
                            </div>
                            <div className={styles.infoItem}>
                                <MapPin className={styles.icon} size={20} />
                                <div>
                                    <span className={styles.label}>Location</span>
                                    <p>Mumbai, India</p>
                                </div>
                            </div>
                        </div>

                        <div className={styles.whatsappCard}>
                            <MessageCircle size={32} className={styles.waIcon} />
                            <h3>Chat with us on WhatsApp</h3>
                            <p>For quick queries and support</p>
                            <Button
                                onClick={handleWhatsApp}
                                className={styles.waButton}
                                fullWidth
                            >
                                Open WhatsApp
                            </Button>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        className={styles.formSection}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <form onSubmit={handleSubmit} className={styles.form}>
                            <h3>Send us a Message</h3>
                            <div className={styles.formGroup}>
                                <Input label="Name" placeholder="Your Name" required />
                                <Input label="Email" type="email" placeholder="Your Email" required />
                            </div>
                            <Input label="Subject" placeholder="Inquiry Subject" required />

                            <div className={styles.textareaGroup}>
                                <label>Message</label>
                                <textarea
                                    className={styles.textarea}
                                    rows={5}
                                    placeholder="How can we help you?"
                                    required
                                />
                            </div>

                            <Button type="submit" size="lg" icon={<Send size={18} />}>
                                Send Message
                            </Button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
