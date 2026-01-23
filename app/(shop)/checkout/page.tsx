'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useAuth } from '@clerk/nextjs';
import { useCartStore } from '@/lib/store';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import styles from './page.module.css';


export default function CheckoutPage() {
    const router = useRouter();
    const { userId, isLoaded } = useAuth();
    const { items, getSubtotal, getTax, getShipping, getTotal, clearCart } = useCartStore();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
    });

    if (isLoaded && !userId) {
        router.push('/sign-in?redirect_url=/checkout');
        return null;
    }

    if (items.length === 0) {
        router.push('/cart');
        return null;
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const orderData = {
                items: items.map(item => ({
                    product: item.product._id || item.product.id, // Handle both ID formats
                    quantity: item.quantity,
                    price: item.product.salePrice || item.product.price,
                    name: item.product.name,
                    image: item.product.images[0]
                })),
                shippingAddress: formData,
                paymentMethod: 'COD',
                subtotal: getSubtotal(),
                tax: getTax(),
                shippingCost: getShipping(),
                totalAmount: getTotal(),
            };

            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || 'Failed to place order');
            }

            const order = await response.json();

            clearCart();
            toast.success('Order placed successfully!');
            router.push(`/order-confirmation/${order._id}`);

        } catch (error) {
            console.error('Checkout error:', error);
            toast.error('Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <motion.div
                    className={styles.formSection}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className={styles.sectionTitle}>Shipping Information</h2>
                    <form id="checkout-form" onSubmit={handleSubmit}>
                        <div className={styles.formGrid}>
                            <Input
                                label="First Name"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                                placeholder="John"
                            />
                            <Input
                                label="Last Name"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                                placeholder="Doe"
                            />
                            <Input
                                label="Email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="john@example.com"
                                className={styles.fullWidth}
                            />
                            <Input
                                label="Phone"
                                name="phone"
                                type="tel"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                placeholder="+1 (555) 000-0000"
                                className={styles.fullWidth}
                            />
                            <Input
                                label="Address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                required
                                placeholder="123 Main St"
                                className={styles.fullWidth}
                            />
                            <Input
                                label="City"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                required
                                placeholder="New York"
                            />
                            <Input
                                label="State / Province"
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                required
                                placeholder="NY"
                            />
                            <Input
                                label="Zip / Postal Code"
                                name="zipCode"
                                value={formData.zipCode}
                                onChange={handleChange}
                                required
                                placeholder="10001"
                            />
                            <Input
                                label="Country"
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                                required
                                placeholder="United States"
                            />
                        </div>
                    </form>
                </motion.div>

                <motion.div
                    className={styles.summarySection}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <div className={styles.summaryCard}>
                        <h2 className={styles.sectionTitle}>Order Summary</h2>

                        <div className={styles.itemsList}>
                            {items.map((item) => (
                                <div key={item.product.id} className={styles.item}>
                                    <div className={styles.itemImage}>
                                        <Image
                                            src={item.product.images[0]}
                                            alt={item.product.name}
                                            fill
                                            style={{ objectFit: 'cover' }}
                                        />
                                    </div>
                                    <div className={styles.itemInfo}>
                                        <p className={styles.itemName}>{item.product.name}</p>
                                        <div className={styles.itemMeta}>
                                            <span>Qty: {item.quantity}</span>
                                            <span>${(item.product.salePrice || item.product.price).toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className={styles.paymentMethods}>
                            <h3 className={styles.sectionTitle} style={{ fontSize: '1.1rem' }}>Payment Method</h3>
                            <label className={styles.paymentOption}>
                                <input
                                    type="radio"
                                    name="payment"
                                    checked
                                    readOnly
                                    className={styles.radio}
                                />
                                <span className={styles.paymentLabel}>Cash on Delivery (COD)</span>
                            </label>
                        </div>

                        <div className={styles.totals}>
                            <div className={styles.row}>
                                <span>Subtotal</span>
                                <span>${getSubtotal().toFixed(2)}</span>
                            </div>
                            <div className={styles.row}>
                                <span>Tax (10%)</span>
                                <span>${getTax().toFixed(2)}</span>
                            </div>
                            <div className={styles.row}>
                                <span>Shipping</span>
                                <span>{getShipping() === 0 ? 'Free' : `$${getShipping().toFixed(2)}`}</span>
                            </div>
                            <div className={styles.totalRow}>
                                <span>Total</span>
                                <span>${getTotal().toFixed(2)}</span>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            form="checkout-form"
                            fullWidth
                            size="lg"
                            className="mt-6"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Processing...' : 'Place Order'}
                        </Button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
