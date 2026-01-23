'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Save, Image as ImageIcon, Plus, Trash2, CheckCircle, UploadCloud } from 'lucide-react';
import styles from './page.module.css';

export default function AdminSettings() {
    const [activeTab, setActiveTab] = useState('general');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Settings data
    const [settings, setSettings] = useState({
        storeName: '',
        supportEmail: '',
        currency: 'USD',
        maintenanceMode: false
    });

    // Hero Slides data
    const [slides, setSlides] = useState<any[]>([]);
    const [newSlide, setNewSlide] = useState({
        title: '',
        description: '',
        image: '',
        ctaText: 'Shop Now',
        ctaLink: '/products',
        isActive: true
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [settingsRes, slidesRes] = await Promise.all([
                    fetch('/api/admin/settings'),
                    fetch('/api/admin/hero')
                ]);

                if (settingsRes.ok) {
                    const data = await settingsRes.json();
                    // Merge with defaults to ensure fields exist
                    setSettings(prev => ({ ...prev, ...data }));
                }
                if (slidesRes.ok) setSlides(await slidesRes.json());
            } catch (error) {
                console.error('Failed to fetch data', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleSettingsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target as HTMLInputElement;
        setSettings(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }));
    };

    const saveSettings = async () => {
        setSaving(true);
        try {
            const res = await fetch('/api/admin/settings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(settings)
            });
            if (res.ok) alert('Settings saved successfully!');
        } catch (error) {
            alert('Failed to save settings');
        } finally {
            setSaving(false);
        }
    };

    const addSlide = async () => {
        try {
            const res = await fetch('/api/admin/hero', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newSlide)
            });
            if (res.ok) {
                const savedSlide = await res.json();
                setSlides([savedSlide, ...slides]);
                setNewSlide({
                    title: '',
                    description: '',
                    image: '',
                    ctaText: 'Shop Now',
                    ctaLink: '/products',
                    isActive: true
                });
            }
        } catch (error) {
            alert('Failed to add slide');
        }
    };

    const deleteSlide = async (id: string) => {
        if (!confirm('Delete this slide?')) return;
        try {
            const res = await fetch(`/api/admin/hero?id=${id}`, { method: 'DELETE' });
            if (res.ok) {
                setSlides(slides.filter(s => s._id !== id));
            }
        } catch (error) {
            alert('Failed to delete slide');
        }
    };

    if (loading) return <div className={styles.container}>Loading settings...</div>;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Settings</h1>
            </div>

            <div className={styles.tabs}>
                <button
                    className={`${styles.tab} ${activeTab === 'general' ? styles.active : ''}`}
                    onClick={() => setActiveTab('general')}
                >
                    General
                </button>
                <button
                    className={`${styles.tab} ${activeTab === 'hero' ? styles.active : ''}`}
                    onClick={() => setActiveTab('hero')}
                >
                    Hero Banner
                </button>
            </div>

            <div className={styles.content}>
                {activeTab === 'general' ? (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={styles.section}
                    >
                        <h2>Store Configuration</h2>
                        <div className={styles.grid}>
                            <div className={styles.field}>
                                <label>Store Name</label>
                                <input
                                    type="text"
                                    name="storeName"
                                    value={settings.storeName}
                                    onChange={handleSettingsChange}
                                    className={styles.input}
                                />
                            </div>
                            <div className={styles.field}>
                                <label>Support Email</label>
                                <input
                                    type="email"
                                    name="supportEmail"
                                    value={settings.supportEmail}
                                    onChange={handleSettingsChange}
                                    className={styles.input}
                                />
                            </div>
                            <div className={styles.field}>
                                <label>Currency</label>
                                <select
                                    name="currency"
                                    value={settings.currency}
                                    onChange={handleSettingsChange}
                                    className={styles.select}
                                >
                                    <option value="USD">USD ($)</option>
                                    <option value="EUR">EUR (€)</option>
                                    <option value="GBP">GBP (£)</option>
                                    <option value="INR">INR (₹)</option>
                                </select>
                            </div>
                        </div>
                        <div className={styles.toggleField}>
                            <label className={styles.switch}>
                                <input
                                    type="checkbox"
                                    name="maintenanceMode"
                                    checked={settings.maintenanceMode}
                                    onChange={handleSettingsChange}
                                />
                                <span className={styles.slider}></span>
                            </label>
                            <span>Maintenance Mode</span>
                        </div>

                        <div className={styles.actions}>
                            <button className={styles.saveBtn} onClick={saveSettings} disabled={saving}>
                                <Save size={18} />
                                {saving ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={styles.section}
                    >
                        <h2>Hero Slides</h2>

                        {/* New Slide Form */}
                        <div className={styles.addSlideForm}>
                            <h3>Add New Slide</h3>
                            <div className={styles.grid}>
                                <input
                                    placeholder="Title"
                                    value={newSlide.title}
                                    onChange={e => setNewSlide({ ...newSlide, title: e.target.value })}
                                    className={styles.input}
                                />
                                <input
                                    placeholder="Description"
                                    value={newSlide.description}
                                    onChange={e => setNewSlide({ ...newSlide, description: e.target.value })}
                                    className={styles.input}
                                />
                                <input
                                    placeholder="Image URL"
                                    value={newSlide.image}
                                    onChange={e => setNewSlide({ ...newSlide, image: e.target.value })}
                                    className={styles.input}
                                />
                                <div className={styles.halfGrid}>
                                    <input
                                        placeholder="Button Text"
                                        value={newSlide.ctaText}
                                        onChange={e => setNewSlide({ ...newSlide, ctaText: e.target.value })}
                                        className={styles.input}
                                    />
                                    <input
                                        placeholder="Button Link"
                                        value={newSlide.ctaLink}
                                        onChange={e => setNewSlide({ ...newSlide, ctaLink: e.target.value })}
                                        className={styles.input}
                                    />
                                </div>
                            </div>
                            <button className={styles.addBtn} onClick={addSlide}>
                                <Plus size={18} /> Add Slide
                            </button>
                        </div>

                        {/* Slides List */}
                        <div className={styles.slidesList}>
                            {slides.map(slide => (
                                <div key={slide._id} className={styles.slideItem}>
                                    <div className={styles.slideImage} style={{ backgroundImage: `url(${slide.image})` }} />
                                    <div className={styles.slideInfo}>
                                        <h4>{slide.title}</h4>
                                        <p>{slide.description}</p>
                                    </div>
                                    <button
                                        className={styles.deleteBtn}
                                        onClick={() => deleteSlide(slide._id)}
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
