'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle, ShoppingBag, ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';
import styles from './page.module.css';

export default function OrderConfirmationPage({ params }: { params: { id: string } }) {
    // In a real app, you might want to fetch the order details here to confirm existence
    // For now, we'll just display the success state with the ID from params

    return (
        <div className={styles.page}>
            <motion.div
                className={styles.card}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <motion.div
                    className={styles.iconWrapper}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring' }}
                >
                    <CheckCircle size={40} />
                </motion.div>

                <h1 className={styles.title}>Order Confirmed!</h1>
                <p className={styles.message}>
                    Thank you for your purchase. Your order has been placed successfully and is being processed.
                </p>

                <div className={styles.orderDetails}>
                    <div className={styles.detailRow}>
                        <span className={styles.label}>Order ID:</span>
                        <span className={styles.value}>#{params.id.slice(-6).toUpperCase()}</span>
                    </div>
                    <div className={styles.detailRow}>
                        <span className={styles.label}>Date:</span>
                        <span className={styles.value}>{new Date().toLocaleDateString()}</span>
                    </div>
                    <div className={styles.detailRow}>
                        <span className={styles.label}>Status:</span>
                        <span className={styles.value} style={{ color: '#FBC02D' }}>Processing</span>
                    </div>
                </div>

                <div className={styles.actions}>
                    <Link href="/products">
                        <Button variant="outline">
                            <ShoppingBag size={18} className="mr-2" />
                            Continue Shopping
                        </Button>
                    </Link>
                    <Link href="/orders">
                        <Button>
                            View My Orders
                            <ArrowRight size={18} className="ml-2" />
                        </Button>
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
