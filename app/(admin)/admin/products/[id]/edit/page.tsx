'use client';

import { motion } from 'framer-motion';
import {
    ChevronLeft,
    Save,
    Image as ImageIcon,
    Plus,
    Trash2,
    X,
    ArrowLeft
} from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { categories, getProductById } from '@/data/products';
import { Product } from '@/types';
import styles from './page.module.css';

export default function EditProduct() {
    const params = useParams();
    const router = useRouter();
    const productId = params.id as string;
    const product = getProductById(productId);

    const [features, setFeatures] = useState<string[]>(product?.features || ['']);

    useEffect(() => {
        if (!product) {
            router.push('/admin/products');
        }
    }, [product, router]);

    if (!product) return null;

    const addFeature = () => setFeatures([...features, '']);
    const removeFeature = (index: number) => setFeatures(features.filter((_, i) => i !== index));
    const updateFeature = (index: number, val: string) => {
        const newFeatures = [...features];
        newFeatures[index] = val;
        setFeatures(newFeatures);
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Link href="/admin/products" className={styles.backBtn}>
                    <ChevronLeft size={20} />
                    Back to Products
                </Link>
                <div className={styles.actions}>
                    <button className={styles.deleteBtn}>
                        <Trash2 size={18} />
                        Delete Product
                    </button>
                    <button className={styles.publishBtn}>
                        <Save size={18} />
                        Update Changes
                    </button>
                </div>
            </div>

            <div className={styles.formGrid}>
                {/* Left Column: Basic Info */}
                <div className={styles.formSection}>
                    <div className={styles.card}>
                        <h3>Edit Information: {product.name}</h3>
                        <div className={styles.field}>
                            <label>Product Name</label>
                            <input type="text" defaultValue={product.name} className={styles.input} />
                        </div>
                        <div className={styles.field}>
                            <label>Description</label>
                            <textarea defaultValue={product.description} className={styles.textarea} rows={5}></textarea>
                        </div>
                        <div className={styles.row}>
                            <div className={styles.field}>
                                <label>Category</label>
                                <select className={styles.select} defaultValue={product.category.id}>
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className={styles.field}>
                                <label>SKU (Locked)</label>
                                <input type="text" value={product.id} disabled className={styles.input} style={{ opacity: 0.5 }} />
                            </div>
                        </div>
                    </div>

                    <div className={styles.card}>
                        <h3>Pricing & Stock</h3>
                        <div className={styles.row}>
                            <div className={styles.field}>
                                <label>Base Price ($)</label>
                                <input type="number" defaultValue={product.price} className={styles.input} />
                            </div>
                            <div className={styles.field}>
                                <label>Sale Price ($)</label>
                                <input type="number" defaultValue={product.salePrice || 0} className={styles.input} />
                            </div>
                        </div>
                        <div className={styles.row}>
                            <div className={styles.field}>
                                <label>Stock Quantity</label>
                                <input type="number" defaultValue={product.stockCount} className={styles.input} />
                            </div>
                            <div className={styles.field}>
                                <label>Low Stock Warning</label>
                                <input type="number" defaultValue={5} className={styles.input} />
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
                        <div className={styles.mediaGallery}>
                            {product.images.map((img, i) => (
                                <div key={i} className={styles.mediaItem}>
                                    <img src={img} alt="" />
                                    <button className={styles.removeMediaBtn}><X size={14} /></button>
                                </div>
                            ))}
                        </div>
                        <div className={styles.uploadAreaSmall}>
                            <ImageIcon size={24} />
                            <span>Add more images</span>
                        </div>
                    </div>

                    <div className={styles.card}>
                        <h3>Organization</h3>
                        <div className={styles.field}>
                            <label>Tags</label>
                            <input type="text" defaultValue={product.tags.join(', ')} className={styles.input} />
                        </div>
                        <div className={styles.checkboxGroup}>
                            <label className={styles.checkbox}>
                                <input type="checkbox" defaultChecked={product.isFeatured} />
                                <span>Feature on Homepage</span>
                            </label>
                            <label className={styles.checkbox}>
                                <input type="checkbox" defaultChecked={product.isNewArrival} />
                                <span>Mark as New Arrival</span>
                            </label>
                            <label className={styles.checkbox}>
                                <input type="checkbox" defaultChecked={product.isBestseller} />
                                <span>Mark as Bestseller</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
