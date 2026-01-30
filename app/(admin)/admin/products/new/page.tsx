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
import { toast } from 'react-hot-toast';
import { categories } from '@/data/products';
import styles from './page.module.css';

export default function NewProduct() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [features, setFeatures] = useState<string[]>(['']);
    const [specifications, setSpecifications] = useState<{ label: string; value: string }[]>([{ label: '', value: '' }]);
    const [tagsInput, setTagsInput] = useState('');
    const [imagesInput, setImagesInput] = useState('https://picsum.photos/seed/placeholder/800/600');

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: 'chandeliers', // Default to first category ID
        price: '',
        salePrice: '',
        stockCount: '',
        sku: '',
        inStock: true,
        isFeatured: false,
        isNewArrival: false,
        isBestseller: false
    });

    const addFeature = () => setFeatures([...features, '']);
    const removeFeature = (index: number) => setFeatures(features.filter((_, i) => i !== index));
    const updateFeature = (index: number, val: string) => {
        const newFeatures = [...features];
        newFeatures[index] = val;
        setFeatures(newFeatures);
    };

    const addSpec = () => setSpecifications([...specifications, { label: '', value: '' }]);
    const removeSpec = (index: number) => setSpecifications(specifications.filter((_, i) => i !== index));
    const updateSpec = (index: number, field: 'label' | 'value', val: string) => {
        const newSpecs = [...specifications];
        newSpecs[index][field] = val;
        setSpecifications(newSpecs);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target as HTMLInputElement;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }));
    };

    const handleSubmit = async () => {
        if (!formData.name || !formData.price || !formData.category) {
            toast.error('Please fill in required fields');
            return;
        }

        setIsSubmitting(true);
        const loadingToast = toast.loading('Publishing product...');

        try {
            const payload = {
                ...formData,
                price: parseFloat(formData.price),
                salePrice: formData.salePrice ? parseFloat(formData.salePrice) : undefined,
                stockCount: parseInt(formData.stockCount || '0'),
                images: imagesInput.split(',').map(img => img.trim()).filter(img => img !== ''),
                features: features.filter(f => f.trim() !== ''),
                tags: tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag !== ''),
                specifications: specifications.filter(s => s.label.trim() !== '' && s.value.trim() !== '')
            };

            const res = await fetch('/api/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!res.ok) {
                const errorData = await res.text();
                throw new Error(errorData || 'Failed to create product');
            }

            toast.success('Product published successfully!', { id: loadingToast });
            router.push('/admin/products');
        } catch (error: any) {
            console.error('Error creating product:', error);
            toast.error(error.message || 'Failed to create product', { id: loadingToast });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const loadingToast = toast.loading('Uploading image...');
        try {
            const formData = new FormData();
            formData.append('file', file);

            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            });

            if (!res.ok) throw new Error('Upload failed');

            const data = await res.json();
            const newImages = imagesInput ? `${imagesInput}, ${data.url}` : data.url;
            setImagesInput(newImages);
            toast.success('Image uploaded successfully!', { id: loadingToast });
        } catch (error) {
            console.error('Upload error:', error);
            toast.error('Failed to upload image', { id: loadingToast });
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
                            <label>Product Name <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="e.g. Modern Desk Lamp"
                                className={styles.input}
                                required
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
                                <label>Category <span className="text-red-500">*</span></label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className={styles.select}
                                    required
                                >
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className={styles.field}>
                                <label>SKU</label>
                                <input
                                    type="text"
                                    name="sku"
                                    value={formData.sku}
                                    onChange={handleChange}
                                    placeholder="SKU-001"
                                    className={styles.input}
                                />
                            </div>
                        </div>
                    </div>

                    <div className={styles.card}>
                        <h3>Pricing & Stock</h3>
                        <div className={styles.row}>
                            <div className={styles.field}>
                                <label>Base Price ($) <span className="text-red-500">*</span></label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    placeholder="0.00"
                                    className={styles.input}
                                    required
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
                        <h3>Specifications</h3>
                        <div className={styles.featuresList}>
                            {specifications.map((spec, index) => (
                                <div key={index} className={styles.row} style={{ gap: '1rem', marginBottom: '0.5rem' }}>
                                    <input
                                        type="text"
                                        value={spec.label}
                                        onChange={(e) => updateSpec(index, 'label', e.target.value)}
                                        placeholder="Label (e.g. Material)"
                                        className={styles.input}
                                    />
                                    <input
                                        type="text"
                                        value={spec.value}
                                        onChange={(e) => updateSpec(index, 'value', e.target.value)}
                                        placeholder="Value (e.g. Brass)"
                                        className={styles.input}
                                    />
                                    <button onClick={() => removeSpec(index)} className={styles.removeBtn}>
                                        <X size={18} />
                                    </button>
                                </div>
                            ))}
                            <button onClick={addSpec} className={styles.addFeatureBtn}>
                                <Plus size={16} />
                                Add Specification
                            </button>
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
                        <div className={styles.uploadArea} onClick={() => document.getElementById('image-upload')?.click()}>
                            <ImageIcon size={48} className={styles.uploadIcon} />
                            <p>Click to upload images</p>
                            <span>PNG, JPG up to 10MB</span>
                            <input
                                id="image-upload"
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                style={{ display: 'none' }}
                            />
                        </div>

                        <div className={styles.field} style={{ marginTop: '1.5rem' }}>
                            <label>Image URLs (comma separated)</label>
                            <textarea
                                value={imagesInput}
                                onChange={(e) => setImagesInput(e.target.value)}
                                placeholder="Paste URLs OR use upload button above"
                                className={styles.textarea}
                                rows={3}
                            ></textarea>
                        </div>

                        <div className={styles.mediaGallery}>
                            {imagesInput.split(',').map((url, i) => url.trim() && (
                                <div key={i} className={styles.mediaItem} style={{ position: 'relative' }}>
                                    <img src={url.trim()} alt={`Preview ${i}`} style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '4px' }} />
                                    <button
                                        className={styles.removeBtn}
                                        style={{ position: 'absolute', top: 5, right: 5, background: 'rgba(0,0,0,0.5)', color: 'white', borderRadius: '50%', padding: '2px' }}
                                        onClick={() => {
                                            const urls = imagesInput.split(',').map(u => u.trim());
                                            urls.splice(i, 1);
                                            setImagesInput(urls.join(', '));
                                        }}
                                    >
                                        <X size={14} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={styles.card}>
                        <h3>Organization</h3>
                        <div className={styles.field}>
                            <label>Tags</label>
                            <input
                                type="text"
                                value={tagsInput}
                                onChange={(e) => setTagsInput(e.target.value)}
                                placeholder="modern, wood, desk, lamp"
                                className={styles.input}
                            />
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
                                <input
                                    type="checkbox"
                                    name="isBestseller"
                                    checked={formData.isBestseller}
                                    onChange={handleChange}
                                />
                                <span>Mark as Bestseller</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
