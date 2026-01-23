'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Search, Filter, Mail, ShoppingBag, Calendar } from 'lucide-react';
import { staggerContainer, staggerItem } from '@/lib/animations';
import styles from './page.module.css';

export default function AdminCustomers() {
    const [customers, setCustomers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const res = await fetch('/api/admin/customers');
                if (res.ok) {
                    const data = await res.json();
                    setCustomers(data);
                }
            } catch (error) {
                console.error('Failed to fetch customers', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCustomers();
    }, []);

    if (loading) {
        return <div className={styles.container}>Loading customers...</div>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.headerInfo}>
                    <h1>Customers</h1>
                    <p>View your top buying customers ({customers.length} total)</p>
                </div>
            </div>

            {/* Controls */}
            <div className={styles.controls}>
                <div className={styles.searchWrapper}>
                    <Search size={20} className={styles.searchIcon} />
                    <input type="text" placeholder="Search customers..." className={styles.searchInput} />
                </div>
                <div className={styles.filterGroup}>
                    <button className={styles.filterBtn}>
                        <Filter size={18} />
                        Filter
                    </button>
                    <select className={styles.select}>
                        <option>Sort by: Total Spent</option>
                        <option>Sort by: Orders Count</option>
                        <option>Sort by: Newest</option>
                    </select>
                </div>
            </div>

            {/* Customers Table */}
            <motion.div
                className={styles.tableWrapper}
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
            >
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Customer</th>
                            <th>Contact</th>
                            <th>Orders</th>
                            <th>Total Spent</th>
                            <th>Last Active</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.length === 0 ? (
                            <tr>
                                <td colSpan={5} className={styles.empty}>No customers found</td>
                            </tr>
                        ) : (
                            customers.map((customer, index) => (
                                <motion.tr key={index} variants={staggerItem} className={styles.row}>
                                    <td className={styles.customerCell}>
                                        <div className={styles.avatar}>
                                            {customer.firstName?.charAt(0) || 'U'}
                                        </div>
                                        <div className={styles.customerInfo}>
                                            <p className={styles.name}>{customer.firstName} {customer.lastName}</p>
                                        </div>
                                    </td>
                                    <td>
                                        <div className={styles.contactInfo}>
                                            <Mail size={16} />
                                            <span>{customer._id || 'No Email'}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className={styles.statsInfo}>
                                            <ShoppingBag size={16} />
                                            <span>{customer.ordersCount}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <span className={styles.amount}>
                                            ${customer.totalSpent?.toFixed(2)}
                                        </span>
                                    </td>
                                    <td>
                                        <div className={styles.dateInfo}>
                                            <Calendar size={16} />
                                            <span>{new Date(customer.lastOrderDate).toLocaleDateString()}</span>
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
