'use client';

import { motion } from 'framer-motion';
import {
    ChevronLeft,
    Save,
    Image as ImageIcon,
    Plus,
    Trash2,
    X
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { categories } from '@/data/products';
import styles from './page.module.css';

export default function NewProduct() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [features, setFeatures] = useState<string[]>(['']);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: 'lighting', // Default or first category
        price: '',
        salePrice: '',
        stockCount: '',
        images: ['https://picsum.photos/seed/placeholder/800/600'], // Placeholder image
        inStock: true,
        isFeatured: false,
        isNewArrival: false
    });

    const addFeature = () => setFeatures([...features, '']);
    const removeFeature = (index: number) => setFeatures(features.filter((_, i) => i !== index));
    const updateFeature = (index: number, val: string) => {
        const newFeatures = [...features];
        newFeatures[index] = val;
        setFeatures(newFeatures);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target as HTMLInputElement;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }));
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            const payload = {
                ...formData,
                price: parseFloat(formData.price),
                salePrice: formData.salePrice ? parseFloat(formData.salePrice) : undefined,
                stockCount: parseInt(formData.stockCount),
                features: features.filter(f => f.trim() !== '')
            };

            const res = await fetch('/api/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!res.ok) throw new Error('Failed to create product');

            router.push('/admin/products');
        } catch (error) {
            console.error('Error creating product:', error);
            alert('Failed to create product');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Link href="/admin/products" className={styles.backBtn}>
                    <ChevronLeft size={20} />
                    Back to Products
                </Link>
                <div className={styles.actions}>
                    <button className={styles.draftBtn}>Save Draft</button>
                    <button className={styles.publishBtn} onClick={handleSubmit} disabled={isSubmitting}>
                        <Save size={18} />
                        {isSubmitting ? 'Publishing...' : 'Publish Product'}
                    </button>
                </div>
            </div>

            <div className={styles.formGrid}>
                {/* Left Column: Basic Info */}
                <div className={styles.formSection}>
                    <div className={styles.card}>
                        <h3>Basic Information</h3>
                        <div className={styles.field}>
                            <label>Product Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="e.g. Modern Desk Lamp"
                                className={styles.input}
                            />
                        </div>
                        <div className={styles.field}>
                            <label>Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Describe your product..."
                                className={styles.textarea}
                                rows={5}
                            ></textarea>
                        </div>
                        <div className={styles.row}>
                            <div className={styles.field}>
                                <label>Category</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className={styles.select}
                                >
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className={styles.field}>
                                <label>SKU</label>
                                <input type="text" placeholder="SKU-001" className={styles.input} />
                            </div>
                        </div>
                    </div>

                    <div className={styles.card}>
                        <h3>Pricing & Stock</h3>
                        <div className={styles.row}>
                            <div className={styles.field}>
                                <label>Base Price ($)</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    placeholder="0.00"
                                    className={styles.input}
                                />
                            </div>
                            <div className={styles.field}>
                                <label>Sale Price ($)</label>
                                <input
                                    type="number"
                                    name="salePrice"
                                    value={formData.salePrice}
                                    onChange={handleChange}
                                    placeholder="0.00"
                                    className={styles.input}
                                />
                            </div>
                        </div>
                        <div className={styles.row}>
                            <div className={styles.field}>
                                <label>Stock Quantity</label>
                                <input
                                    type="number"
                                    name="stockCount"
                                    value={formData.stockCount}
                                    onChange={handleChange}
                                    placeholder="0"
                                    className={styles.input}
                                />
                            </div>
                            <div className={styles.field}>
                                <label>Low Stock Warning</label>
                                <input type="number" placeholder="5" className={styles.input} />
                            </div>
                        </div>
                    </div>

                    <div className={styles.card}>
                        <h3>Features</h3>
                        <div className={styles.featuresList}>
                            {features.map((feature, index) => (
                                <div key={index} className={styles.featureRow}>
                                    <input
                                        type="text"
                                        value={feature}
                                        onChange={(e) => updateFeature(index, e.target.value)}
                                        placeholder="Add a key feature..."
                                        className={styles.input}
                                    />
                                    <button onClick={() => removeFeature(index)} className={styles.removeBtn}>
                                        <X size={18} />
                                    </button>
                                </div>
                            ))}
                            <button onClick={addFeature} className={styles.addFeatureBtn}>
                                <Plus size={16} />
                                Add Another Feature
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Column: Media & Organization */}
                <div className={styles.sidebarSection}>
                    <div className={styles.card}>
                        <h3>Product Media</h3>
                        <div className={styles.uploadArea}>
                            <ImageIcon size={48} className={styles.uploadIcon} />
                            <p>Click to upload or drag and drop</p>
                            <span>PNG, JPG up to 10MB</span>
                            <button className={styles.uploadBtn}>Upload Images</button>
                        </div>
                        <div className={styles.mediaGallery}>
                            {/* Placeholder for uploaded images */}
                        </div>
                    </div>

                    <div className={styles.card}>
                        <h3>Organization</h3>
                        <div className={styles.field}>
                            <label>Tags</label>
                            <input type="text" placeholder="modern, wood, desk, lamp" className={styles.input} />
                            <p className={styles.hint}>Separate tags with commas</p>
                        </div>
                        <div className={styles.checkboxGroup}>
                            <label className={styles.checkbox}>
                                <input
                                    type="checkbox"
                                    name="isFeatured"
                                    checked={formData.isFeatured}
                                    onChange={handleChange}
                                />
                                <span>Feature on Homepage</span>
                            </label>
                            <label className={styles.checkbox}>
                                <input
                                    type="checkbox"
                                    name="isNewArrival"
                                    checked={formData.isNewArrival}
                                    onChange={handleChange}
                                />
                                <span>Mark as New Arrival</span>
                            </label>
                            <label className={styles.checkbox}>
                                <input type="checkbox" />
                                <span>Mark as Bestseller</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
