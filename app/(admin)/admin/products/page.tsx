'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import {
    Plus,
    Search,
    Filter,
    MoreHorizontal,
    Edit2,
    Trash2,
    ExternalLink
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

import { staggerContainer, staggerItem } from '@/lib/animations';
import styles from './page.module.css';

export default function AdminProducts() {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch('/api/products');
                if (res.ok) {
                    const data = await res.json();
                    setProducts(data);
                }
            } catch (error) {
                console.error('Failed to fetch products', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this product?')) return;

        try {
            // TODO: Implement delete API
            // await fetch(`/api/products/${id}`, { method: 'DELETE' });
            alert('Delete functionality to be implemented');
        } catch (error) {
            console.error('Failed to delete product', error);
        }
    };

    if (loading) {
        return <div className={styles.container}>Loading products...</div>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.headerInfo}>
                    <h1>Products</h1>
                    <p>Manage your store inventory ({products.length} products)</p>
                </div>
                <Link href="/admin/products/new" className={styles.addNew}>
                    <Plus size={20} />
                    Add New Product
                </Link>
            </div>

            {/* Filters and Search */}
            <div className={styles.controls}>
                <div className={styles.searchWrapper}>
                    <Search size={20} className={styles.searchIcon} />
                    <input type="text" placeholder="Search products..." className={styles.searchInput} />
                </div>
                <div className={styles.filterGroup}>
                    <button className={styles.filterBtn}>
                        <Filter size={18} />
                        Filter
                    </button>
                    <select className={styles.select}>
                        <option>Status: All</option>
                        <option>In Stock</option>
                        <option>Out of Stock</option>
                    </select>
                </div>
            </div>

            {/* Products Table */}
            <motion.div
                className={styles.tableWrapper}
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
            >
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Status</th>
                            <th className={styles.actionsHeader}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length === 0 ? (
                            <tr>
                                <td colSpan={6} className={styles.empty}>No products found</td>
                            </tr>
                        ) : (
                            products.map((product) => (
                                <motion.tr key={product._id} variants={staggerItem} className={styles.row}>
                                    <td className={styles.productCell}>
                                        <div className={styles.imgWrapper}>
                                            <Image
                                                src={product.images[0]}
                                                alt={product.name}
                                                width={48}
                                                height={48}
                                                className={styles.pImg}
                                            />
                                        </div>
                                        <div className={styles.pInfo}>
                                            <p className={styles.pName}>{product.name}</p>
                                            <p className={styles.pSlug}>{product.slug}</p>
                                        </div>
                                    </td>
                                    <td>
                                        <span className={styles.categoryBadge}>{(typeof product.category === 'object' ? product.category?.name : product.category) || product.categoryId || 'Uncategorized'}</span>
                                    </td>
                                    <td>
                                        <div className={styles.priceInfo}>
                                            <p className={styles.currentPrice}>${product.salePrice || product.price}</p>
                                            {product.salePrice && <p className={styles.oldPrice}>${product.price}</p>}
                                        </div>
                                    </td>
                                    <td>
                                        <p className={styles.stockCount}>{product.stockCount} units</p>
                                    </td>
                                    <td>
                                        <span className={`${styles.statusBadge} ${product.inStock ? styles.instock : styles.outofstock}`}>
                                            {product.inStock ? 'In Stock' : 'Out of Stock'}
                                        </span>
                                    </td>
                                    <td>
                                        <div className={styles.actions}>
                                            <Link href={`/admin/products/${product._id}/edit`} className={styles.actionBtn}>
                                                <Edit2 size={18} />
                                            </Link>
                                            <Link href={`/products/${product.slug}`} target="_blank" className={styles.actionBtn}>
                                                <ExternalLink size={18} />
                                            </Link>
                                            <button
                                                className={`${styles.actionBtn} ${styles.delete}`}
                                                onClick={() => handleDelete(product._id)}
                                            >
                                                <Trash2 size={18} />
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
