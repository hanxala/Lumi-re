'use client';

import { motion } from 'framer-motion';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '@/lib/store';
import Button from '@/components/ui/Button';
import { fadeIn, staggerContainer, staggerItem } from '@/lib/animations';
import styles from './page.module.css';

export default function CartPage() {
    const { items, updateQuantity, removeItem, getSubtotal, getTax, getShipping, getTotal } = useCartStore();

    const subtotal = getSubtotal();
    const tax = getTax();
    const shipping = getShipping();
    const total = getTotal();

    if (items.length === 0) {
        return (
            <div className={styles.page}>
                <div className={styles.container}>
                    <motion.div
                        className={styles.emptyState}
                        variants={fadeIn}
                        initial="hidden"
                        animate="visible"
                    >
                        <ShoppingBag size={64} className={styles.emptyIcon} />
                        <h2 className={styles.emptyTitle}>Your cart is empty</h2>
                        <p className={styles.emptyDescription}>
                            Add some products to get started!
                        </p>
                        <Link href="/products">
                            <Button size="lg">Continue Shopping</Button>
                        </Link>
                    </motion.div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <motion.h1
                    className={styles.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    Shopping Cart
                </motion.h1>

                <div className={styles.content}>
                    {/* Cart Items */}
                    <motion.div
                        className={styles.items}
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                    >
                        {items.map((item) => (
                            <motion.div
                                key={item.product.id}
                                className={styles.item}
                                variants={staggerItem}
                            >
                                <div className={styles.itemImage}>
                                    <Image
                                        src={item.product.images[0]}
                                        alt={item.product.name}
                                        fill
                                        className={styles.image}
                                    />
                                </div>

                                <div className={styles.itemDetails}>
                                    <h3 className={styles.itemName}>{item.product.name}</h3>
                                    <p className={styles.itemCategory}>{item.product.category.name}</p>
                                    <p className={styles.itemPrice}>
                                        ${item.product.salePrice || item.product.price}
                                    </p>
                                </div>

                                <div className={styles.itemActions}>
                                    <div className={styles.quantity}>
                                        <button
                                            className={styles.quantityButton}
                                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                            aria-label="Decrease quantity"
                                        >
                                            <Minus size={16} />
                                        </button>
                                        <span className={styles.quantityValue}>{item.quantity}</span>
                                        <button
                                            className={styles.quantityButton}
                                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                            aria-label="Increase quantity"
                                        >
                                            <Plus size={16} />
                                        </button>
                                    </div>

                                    <p className={styles.itemTotal}>
                                        ${((item.product.salePrice || item.product.price) * item.quantity).toFixed(2)}
                                    </p>

                                    <button
                                        className={styles.removeButton}
                                        onClick={() => removeItem(item.product.id)}
                                        aria-label="Remove item"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Order Summary */}
                    <motion.div
                        className={styles.summary}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h2 className={styles.summaryTitle}>Order Summary</h2>

                        <div className={styles.summaryRow}>
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>

                        <div className={styles.summaryRow}>
                            <span>Tax (10%)</span>
                            <span>${tax.toFixed(2)}</span>
                        </div>

                        <div className={styles.summaryRow}>
                            <span>Shipping</span>
                            <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                        </div>

                        {subtotal < 500 && subtotal > 0 && (
                            <p className={styles.freeShippingNote}>
                                Add ${(500 - subtotal).toFixed(2)} more for free shipping!
                            </p>
                        )}

                        <div className={styles.summaryDivider} />

                        <div className={styles.summaryRow + ' ' + styles.total}>
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>

                        <Link href="/checkout">
                            <Button size="lg" fullWidth>
                                Proceed to Checkout
                            </Button>
                        </Link>

                        <Link href="/products">
                            <Button size="lg" variant="outline" fullWidth>
                                Continue Shopping
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
