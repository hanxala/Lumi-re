'use client';

import { motion } from 'framer-motion';
import { ShoppingCart, Eye, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { useCartStore } from '@/lib/store';
import { staggerItem } from '@/lib/animations';
import styles from './ProductCard.module.css';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const addItem = useCartStore((state) => state.addItem);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        addItem(product);
    };

    const discount = product.salePrice
        ? Math.round(((product.price - product.salePrice) / product.price) * 100)
        : 0;

    return (
        <motion.div
            className={styles.card}
            variants={staggerItem}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
        >
            <Link href={`/products/${product.slug}`} className={styles.link}>
                <div className={styles.imageContainer}>
                    <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className={styles.image}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />

                    {/* Badges */}
                    <div className={styles.badges}>
                        {product.isNew && <span className={styles.badge + ' ' + styles.new}>New</span>}
                        {product.isBestseller && <span className={styles.badge + ' ' + styles.bestseller}>Bestseller</span>}
                        {discount > 0 && <span className={styles.badge + ' ' + styles.sale}>-{discount}%</span>}
                    </div>

                    {/* Overlay Actions */}
                    <div className={styles.overlay}>
                        <motion.button
                            className={styles.actionButton}
                            onClick={handleAddToCart}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <ShoppingCart size={20} />
                        </motion.button>
                        <motion.div
                            className={styles.actionButton}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <Eye size={20} />
                        </motion.div>
                    </div>
                </div>

                <div className={styles.content}>
                    <p className={styles.category}>{product.category.name}</p>
                    <h3 className={styles.title}>{product.name}</h3>

                    {/* Rating */}
                    <div className={styles.rating}>
                        <div className={styles.stars}>
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    size={14}
                                    fill={i < Math.floor(product.rating) ? 'var(--color-primary)' : 'none'}
                                    stroke={i < Math.floor(product.rating) ? 'var(--color-primary)' : 'var(--color-border)'}
                                />
                            ))}
                        </div>
                        <span className={styles.reviewCount}>({product.reviewCount})</span>
                    </div>

                    {/* Price */}
                    <div className={styles.priceContainer}>
                        {product.salePrice ? (
                            <>
                                <span className={styles.salePrice}>${product.salePrice}</span>
                                <span className={styles.originalPrice}>${product.price}</span>
                            </>
                        ) : (
                            <span className={styles.price}>${product.price}</span>
                        )}
                    </div>

                    {/* Stock Status */}
                    {!product.inStock && (
                        <p className={styles.outOfStock}>Out of Stock</p>
                    )}
                </div>
            </Link>
        </motion.div>
    );
}
