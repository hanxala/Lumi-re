'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { products, categories } from '@/data/products';
import { staggerContainer } from '@/lib/animations';
import styles from './page.module.css';

export default function ProductsPage() {
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [sortBy, setSortBy] = useState<string>('featured');

    const filteredProducts = products.filter((product) => {
        if (selectedCategory === 'all') return true;
        return product.category.id === selectedCategory;
    });

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sortBy) {
            case 'price-asc':
                return (a.salePrice || a.price) - (b.salePrice || b.price);
            case 'price-desc':
                return (b.salePrice || b.price) - (a.salePrice || a.price);
            case 'rating':
                return b.rating - a.rating;
            case 'newest':
                return a.isNewArrival ? -1 : 1;
            default:
                return 0;
        }
    });

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                {/* Header */}
                <motion.div
                    className={styles.header}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className={styles.title}>Our Products</h1>
                    <p className={styles.description}>
                        Explore our complete collection of premium lighting and home decor
                    </p>
                </motion.div>

                {/* Filters */}
                <motion.div
                    className={styles.filters}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    <div className={styles.filterGroup}>
                        <label className={styles.filterLabel}>Category:</label>
                        <div className={styles.categoryButtons}>
                            <button
                                className={`${styles.categoryButton} ${selectedCategory === 'all' ? styles.active : ''
                                    }`}
                                onClick={() => setSelectedCategory('all')}
                            >
                                All Products
                            </button>
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    className={`${styles.categoryButton} ${selectedCategory === category.id ? styles.active : ''
                                        }`}
                                    onClick={() => setSelectedCategory(category.id)}
                                >
                                    {category.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className={styles.filterGroup}>
                        <label className={styles.filterLabel}>Sort by:</label>
                        <select
                            className={styles.select}
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="featured">Featured</option>
                            <option value="price-asc">Price: Low to High</option>
                            <option value="price-desc">Price: High to Low</option>
                            <option value="rating">Highest Rated</option>
                            <option value="newest">Newest</option>
                        </select>
                    </div>
                </motion.div>

                {/* Results Count */}
                <motion.p
                    className={styles.resultsCount}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    Showing {sortedProducts.length} products
                </motion.p>

                {/* Products Grid */}
                <motion.div
                    className={styles.grid}
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                >
                    {sortedProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </motion.div>

                {/* Empty State */}
                {sortedProducts.length === 0 && (
                    <motion.div
                        className={styles.emptyState}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <p>No products found in this category.</p>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
