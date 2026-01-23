'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    DollarSign,
    ShoppingCart,
    Package,
    TrendingUp,
    Users,
    ArrowUpRight,
    ArrowDownRight
} from 'lucide-react';
import styles from './page.module.css';
import { staggerContainer, staggerItem } from '@/lib/animations';



export default function AdminDashboard() {
    const [stats, setStats] = useState({
        revenue: 0,
        orders: 0,
        products: 0,
        customers: 0,
        recentOrders: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch('/api/admin/stats');
                if (res.ok) {
                    const data = await res.json();
                    setStats(data);
                }
            } catch (error) {
                console.error('Failed to fetch stats', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const statCards = [
        {
            label: 'Total Revenue',
            value: `$${stats.revenue.toLocaleString()}`,
            change: '+12.5%', // Calculate real change if possible
            trend: 'up',
            icon: DollarSign,
            color: '#4ade80'
        },
        {
            label: 'Total Orders',
            value: stats.orders.toString(),
            change: '+8.2%',
            trend: 'up',
            icon: ShoppingCart,
            color: '#60a5fa'
        },
        {
            label: 'Total Products',
            value: stats.products.toString(),
            change: '+2.1%',
            trend: 'up',
            icon: Package,
            color: '#fbbf24'
        },
        {
            label: 'Active Customers',
            value: stats.customers.toString(),
            change: '-1.4%',
            trend: 'down',
            icon: Users,
            color: '#f472b6'
        },
    ];

    if (loading) {
        return <div className={styles.dashboard}>Loading dashboard...</div>;
    }

    return (
        <div className={styles.dashboard}>
            {/* Stats Grid */}
            <motion.div
                className={styles.statsGrid}
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
            >
                {statCards.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <motion.div
                            key={stat.label}
                            className={styles.statCard}
                            variants={staggerItem}
                        >
                            <div className={styles.statInfo}>
                                <span className={styles.statLabel}>{stat.label}</span>
                                <h3 className={styles.statValue}>{stat.value}</h3>
                                <div className={`${styles.statChange} ${styles[stat.trend]}`}>
                                    {stat.trend === 'up' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                                    <span>{stat.change}</span>
                                    <span className={styles.changePeriod}>from last month</span>
                                </div>
                            </div>
                            <div className={styles.statIconWrapper} style={{ backgroundColor: `${stat.color}15`, color: stat.color }}>
                                <Icon size={24} />
                            </div>
                        </motion.div>
                    );
                })}
            </motion.div>

            {/* Main Grid */}
            <div className={styles.mainGrid}>
                {/* Sales Chart Placeholder */}
                <motion.div
                    className={styles.chartSection}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <div className={styles.sectionHeader}>
                        <h3>Sales Overview</h3>
                        <div className={styles.sectionActions}>
                            <select className={styles.select}>
                                <option>Last 7 days</option>
                                <option>Last 30 days</option>
                                <option>Last Year</option>
                            </select>
                        </div>
                    </div>
                    <div className={styles.chartPlaceholder}>
                        <TrendingUp size={48} className={styles.chartIcon} />
                        <p>Sales analytics chart will be rendered here</p>
                    </div>
                </motion.div>

                {/* Recent Orders */}
                <motion.div
                    className={styles.ordersSection}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <div className={styles.sectionHeader}>
                        <h3>Recent Orders</h3>
                        <Link href="/admin/orders" className={styles.viewAll}>View All</Link>
                    </div>
                    <div className={styles.ordersList}>
                        {stats.recentOrders.length === 0 ? (
                            <p>No recent orders</p>
                        ) : (
                            stats.recentOrders.map((order: any) => (
                                <div key={order._id} className={styles.orderRow}>
                                    <div className={styles.orderMain}>
                                        <p className={styles.orderId}>#{order._id.slice(-6).toUpperCase()}</p>
                                        <p className={styles.orderCustomer}>
                                            {order.shippingAddress?.firstName} {order.shippingAddress?.lastName}
                                        </p>
                                    </div>
                                    <div className={styles.orderProduct}>
                                        <p>{order.items.length} Items</p>
                                        <p className={styles.orderDate}>{new Date(order.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <div className={styles.orderStatusWrapper}>
                                        <span className={`${styles.statusBadge} ${styles[order.status.toLowerCase()]}`}>
                                            {order.status}
                                        </span>
                                    </div>
                                    <div className={styles.orderAmount}>${order.totalAmount}</div>
                                </div>
                            ))
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
