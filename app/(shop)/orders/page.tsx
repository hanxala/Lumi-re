'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Package, ChevronRight, Clock, MapPin, CreditCard } from 'lucide-react';
import { useAuth } from '@clerk/nextjs';
import Button from '@/components/ui/Button';
import { fadeIn, staggerContainer, staggerItem } from '@/lib/animations';
import styles from './page.module.css';

interface OrderItem {
    name: string;
    image: string;
    quantity: number;
    price: number;
}

interface Order {
    _id: string;
    items: OrderItem[];
    totalAmount: number;
    status: string;
    paymentMethod: string;
    createdAt: string;
    shippingAddress: {
        city: string;
        country: string;
    };
}

export default function OrdersPage() {
    const { isLoaded, userId } = useAuth();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            if (!userId) return;
            try {
                const res = await fetch('/api/orders');
                if (res.ok) {
                    const data = await res.json();
                    setOrders(data);
                }
            } catch (error) {
                console.error('Failed to fetch orders', error);
            } finally {
                setLoading(false);
            }
        };

        if (isLoaded) {
            fetchOrders();
        }
    }, [isLoaded, userId]);

    if (!isLoaded || loading) {
        return (
            <div className={styles.loading}>
                <div className={styles.spinner} />
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className={styles.emptyState}>
                <Package size={64} className={styles.emptyIcon} />
                <h2>No orders yet</h2>
                <p>Start shopping to see your orders here.</p>
                <Link href="/products">
                    <Button>Start Shopping</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <h1 className={styles.title}>My Orders</h1>

                <motion.div
                    className={styles.ordersList}
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                >
                    {orders.map((order) => (
                        <motion.div
                            key={order._id}
                            className={styles.orderCard}
                            variants={staggerItem}
                        >
                            <div className={styles.orderHeader}>
                                <div className={styles.orderInfo}>
                                    <span className={styles.orderId}>Order #{order._id.slice(-6).toUpperCase()}</span>
                                    <span className={styles.orderDate}>
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                                <div className={`${styles.statusBadge} ${styles[order.status.toLowerCase()]}`}>
                                    {order.status}
                                </div>
                            </div>

                            <div className={styles.itemsPreview}>
                                {order.items.map((item, index) => (
                                    <div key={index} className={styles.itemThumb}>
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            className={styles.thumbImage}
                                        />
                                        {item.quantity > 1 && (
                                            <span className={styles.qtyBadge}>{item.quantity}</span>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div className={styles.orderDetails}>
                                <div className={styles.detailItem}>
                                    <Clock size={16} />
                                    <span>Estimated Delivery: 3-5 Business Days</span>
                                </div>
                                <div className={styles.detailItem}>
                                    <MapPin size={16} />
                                    <span>{order.shippingAddress.city}, {order.shippingAddress.country}</span>
                                </div>
                                <div className={styles.detailItem}>
                                    <CreditCard size={16} />
                                    <span>{order.paymentMethod} - ${order.totalAmount.toFixed(2)}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
