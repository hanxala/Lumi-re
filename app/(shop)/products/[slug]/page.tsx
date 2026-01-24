'use client';

import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import {
    ChevronLeft,
    Star,
    ShoppingCart,
    ShieldCheck,
    Truck,
    RotateCcw,
    Minus,
    Plus,
    Check
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Breadcrumbs from '@/components/ui/Breadcrumbs';


import { getProductBySlug } from '@/data/products';

import { useCartStore } from '@/lib/store';
import { staggerContainer, slideUp } from '@/lib/animations';

import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';
import styles from './page.module.css';

export default function ProductDetailPage() {
    const params = useParams();
    const router = useRouter();
    const slug = params.slug as string;
    const product = getProductBySlug(slug);


    const [quantity, setQuantity] = useState(1);
    const [mainImage, setMainImage] = useState(product?.images[0] || '');
    const [isAdded, setIsAdded] = useState(false);

    const addItem = useCartStore((state) => state.addItem);

    if (!product) {
        return (
            <div className={styles.notFound}>
                <div className={styles.container}>
                    <h1>Product Not Found</h1>
                    <p>The product you are looking for does not exist or has been removed.</p>
                    <Link href="/products" className={styles.backButton}>
                        <ChevronLeft size={20} />
                        Back to Products
                    </Link>
                </div>
            </div>
        );
    }

    const handleAddToCart = () => {
        addItem(product, quantity);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    const relatedProducts = products
        .filter((p) => p.category.id === product.category.id && p.id !== product.id)
        .slice(0, 4);

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                {/* Breadcrumbs */}
                <Breadcrumbs
                    items={[
                        { label: 'Products', href: '/products' },
                        { label: product.category.name, href: `/products?category=${product.category.id}` },
                        { label: product.name }
                    ]}
                />


                <div className={styles.content}>
                    {/* Image Gallery */}
                    <motion.div
                        className={styles.gallery}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className={styles.mainImageContainer}>
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={mainImage}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className={styles.mainImageWrapper}
                                >
                                    <Image
                                        src={mainImage}
                                        alt={product.name}
                                        fill
                                        className={styles.mainImage}
                                        priority
                                    />
                                </motion.div>
                            </AnimatePresence>
                        </div>
                        {product.images.length > 1 && (
                            <div className={styles.thumbnails}>
                                {product.images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        className={`${styles.thumbnail} ${mainImage === img ? styles.activeThumbnail : ''}`}
                                        onClick={() => setMainImage(img)}
                                    >
                                        <Image src={img} alt={`${product.name} thumbnail ${idx + 1}`} fill />
                                    </button>
                                ))}
                            </div>
                        )}
                    </motion.div>

                    {/* Product Info */}
                    <motion.div
                        className={styles.info}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {product.isNewArrival && <span className={styles.newBadge}>New Arrival</span>}
                        <h1 className={styles.title}>{product.name}</h1>

                        <div className={styles.ratingAndReviews}>
                            <div className={styles.stars}>
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={18}
                                        fill={i < Math.floor(product.rating) ? "var(--accent-glow)" : "none"}
                                        stroke={i < Math.floor(product.rating) ? "var(--accent-glow)" : "var(--text-muted)"}
                                    />
                                ))}
                            </div>
                            <span className={styles.reviewCount}>({product.reviewCount} reviews)</span>
                        </div>

                        <div className={styles.priceContainer}>
                            {product.salePrice ? (
                                <>
                                    <span className={styles.salePrice}>${product.salePrice}</span>
                                    <span className={styles.originalPrice}>${product.price}</span>
                                    <span className={styles.discountBadge}>
                                        -{Math.round(((product.price - product.salePrice) / product.price) * 100)}%
                                    </span>
                                </>
                            ) : (
                                <span className={styles.price}>${product.price}</span>
                            )}
                        </div>

                        <p className={styles.description}>{product.description}</p>

                        <div className={styles.actions}>
                            <div className={styles.quantity}>
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className={styles.quantityBtn}
                                >
                                    <Minus size={18} />
                                </button>
                                <span className={styles.quantityValue}>{quantity}</span>
                                <button
                                    onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                                    className={styles.quantityBtn}
                                >
                                    <Plus size={18} />
                                </button>
                            </div>

                            <button
                                className={`${styles.addToCart} ${isAdded ? styles.added : ''}`}
                                onClick={handleAddToCart}
                                disabled={!product.inStock}
                            >
                                {isAdded ? (
                                    <>
                                        <Check size={20} />
                                        Added to Cart
                                    </>
                                ) : (
                                    <>
                                        <ShoppingCart size={20} />
                                        {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                                    </>
                                )}
                            </button>
                        </div>

                        <div className={styles.trustSignals}>
                            <div className={styles.trustItem}>
                                <Truck size={20} />
                                <div>
                                    <h4>Free Shipping</h4>
                                    <p>On orders over $500</p>
                                </div>
                            </div>
                            <div className={styles.trustItem}>
                                <RotateCcw size={20} />
                                <div>
                                    <h4>30-Day Returns</h4>
                                    <p>Hassle-free guarantee</p>
                                </div>
                            </div>
                            <div className={styles.trustItem}>
                                <ShieldCheck size={20} />
                                <div>
                                    <h4>Secure Payment</h4>
                                    <p>Protected by Lumière</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Detailed Sections */}
                <div className={styles.detailsGrid}>
                    <motion.section
                        className={styles.detailSection}
                        variants={slideUp}

                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <h3>Key Features</h3>
                        <ul className={styles.featureList}>
                            {product.features.map((feature, i) => (
                                <li key={i}>{feature}</li>
                            ))}
                        </ul>
                    </motion.section>

                    <motion.section
                        className={styles.detailSection}
                        variants={slideUp}

                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <h3>Specifications</h3>
                        <div className={styles.specTable}>
                            {product.specifications.map((spec, i) => (
                                <div key={i} className={styles.specRow}>
                                    <span className={styles.specLabel}>{spec.label}</span>
                                    <span className={styles.specValue}>{spec.value}</span>
                                </div>
                            ))}
                        </div>
                    </motion.section>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <section className={styles.relatedSection}>
                        <h2 className={styles.sectionTitle}>Related Products</h2>
                        <motion.div
                            className={styles.relatedGrid}
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            {relatedProducts.map((p) => (
                                <ProductCard key={p.id} product={p} />
                            ))}
                        </motion.div>
                    </section>
                )}
            </div>
        </div>
    );
}
