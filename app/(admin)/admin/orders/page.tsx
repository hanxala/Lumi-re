'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import {
    Search,
    Filter,
    Download,
    Eye,
    MoreVertical,
    CheckCircle,
    Clock,
    Truck,
    AlertCircle
} from 'lucide-react';
import { staggerContainer, staggerItem } from '@/lib/animations';
import styles from './page.module.css';

const orders = [
    { id: '#ORD-7231', customer: 'John Doe', email: 'john@example.com', date: 'Oct 21, 2026', total: '$1,299.00', status: 'Delivered', method: 'Credit Card' },
    { id: '#ORD-7230', customer: 'Sarah Smith', email: 'sarah@example.com', date: 'Oct 21, 2026', total: '$249.00', status: 'Processing', method: 'PayPal' },
    { id: '#ORD-7229', customer: 'Robert Johnson', email: 'rob@example.com', date: 'Oct 20, 2026', total: '$329.00', status: 'Shipped', method: 'Credit Card' },
    { id: '#ORD-7228', customer: 'Emily Brown', email: 'emily@example.com', date: 'Oct 20, 2026', total: '$449.00', status: 'Pending', method: 'COD' },
    { id: '#ORD-7227', customer: 'Michael Wilson', email: 'mike@example.com', date: 'Oct 19, 2026', total: '$899.00', status: 'Cancelled', method: 'Credit Card' },
];

const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
        case 'delivered': return <CheckCircle size={14} />;
        case 'processing': return <Clock size={14} />;
        case 'shipped': return <Truck size={14} />;
        case 'pending': return <AlertCircle size={14} />;
        default: return null;
    }
};

export default function AdminOrders() {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await fetch('/api/admin/orders');
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

        fetchOrders();
    }, []);

    if (loading) {
        return <div className={styles.loading}>Loading orders...</div>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.headerInfo}>
                    <h1>Orders</h1>
                    <p>Manage and track customer orders</p>
                </div>
                <button className={styles.exportBtn}>
                    <Download size={20} />
                    Export Orders
                </button>
            </div>

            {/* Filters */}
            <div className={styles.controls}>
                <div className={styles.searchWrapper}>
                    <Search size={20} className={styles.searchIcon} />
                    <input type="text" placeholder="Search orders by ID, customer..." className={styles.searchInput} />
                </div>
                <div className={styles.filterGroup}>
                    <button className={styles.filterBtn}>
                        <Filter size={18} />
                        Filter
                    </button>
                    <select className={styles.select}>
                        <option>Status: All</option>
                        <option>Pending</option>
                        <option>Processing</option>
                        <option>Shipped</option>
                        <option>Delivered</option>
                        <option>Cancelled</option>
                    </select>
                </div>
            </div>

            {/* Orders Table */}
            <motion.div
                className={styles.tableWrapper}
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
            >
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Date</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Method</th>
                            <th className={styles.actionsHeader}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length === 0 ? (
                            <tr>
                                <td colSpan={7} className={styles.empty}>No orders found</td>
                            </tr>
                        ) : (
                            orders.map((order) => (
                                <motion.tr key={order._id} variants={staggerItem} className={styles.row}>
                                    <td>
                                        <span className={styles.orderId}>#{order._id.slice(-6).toUpperCase()}</span>
                                    </td>
                                    <td>
                                        <div className={styles.customerInfo}>
                                            <p className={styles.customerName}>
                                                {order.shippingAddress?.firstName} {order.shippingAddress?.lastName}
                                            </p>
                                            <p className={styles.customerEmail}>{order.user?.email || 'N/A'}</p>
                                        </div>
                                    </td>
                                    <td>
                                        <p className={styles.date}>{new Date(order.createdAt).toLocaleDateString()}</p>
                                    </td>
                                    <td>
                                        <p className={styles.total}>${order.totalAmount.toFixed(2)}</p>
                                    </td>
                                    <td>
                                        <span className={`${styles.statusBadge} ${styles[order.status.toLowerCase()]}`}>
                                            {getStatusIcon(order.status)}
                                            {order.status}
                                        </span>
                                    </td>
                                    <td>
                                        <p className={styles.method}>{order.paymentMethod}</p>
                                    </td>
                                    <td>
                                        <div className={styles.actions}>
                                            <button className={styles.actionBtn}>
                                                <Eye size={18} />
                                            </button>
                                            <button className={styles.actionBtn}>
                                                <MoreVertical size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))
                        )}
                    </tbody>
                </table>
            </motion.div>
        </div>
    );
}
