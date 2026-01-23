'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Users,
    Settings,
    LogOut,
    ChevronLeft,
    Menu
} from 'lucide-react';
import { UserButton } from '@clerk/nextjs';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import styles from './layout.module.css';

const adminLinks = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Products', href: '/admin/products', icon: Package },
    { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
    { name: 'Customers', href: '/admin/customers', icon: Users },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className={`${styles.layout} admin-dark`}>
            {/* Sidebar */}
            <motion.aside
                className={`${styles.sidebar} ${isMobileMenuOpen ? styles.mobileOpen : ''}`}
                animate={{
                    width: typeof window !== 'undefined' && window.innerWidth > 1024
                        ? (isSidebarOpen ? 280 : 80)
                        : (isMobileMenuOpen ? 280 : 0),
                    x: typeof window !== 'undefined' && window.innerWidth <= 1024
                        ? (isMobileMenuOpen ? 0 : -280)
                        : 0
                }}
                initial={false}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
                <div className={styles.sidebarHeader}>
                    {isSidebarOpen && (
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className={styles.brand}
                        >
                            Lumière Admin
                        </motion.span>
                    )}
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className={styles.toggleBtn}
                    >
                        {isSidebarOpen ? <ChevronLeft size={20} /> : <Menu size={20} />}
                    </button>
                </div>

                <nav className={styles.nav}>
                    {adminLinks.map((link) => {
                        const Icon = link.icon;
                        const isActive = pathname === link.href;

                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`${styles.navLink} ${isActive ? styles.active : ''}`}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <Icon size={22} className={styles.icon} />
                                {isSidebarOpen && (
                                    <motion.span
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                    >
                                        {link.name}
                                    </motion.span>
                                )}
                                {isActive && (
                                    <motion.div
                                        layoutId="active-indicator"
                                        className={styles.activeIndicator}
                                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                    />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                <div className={styles.sidebarFooter}>
                    <div className={styles.userSection}>
                        <UserButton afterSignOutUrl="/" />
                        {isSidebarOpen && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className={styles.userInfo}
                            >
                                <span className={styles.userName}>Admin User</span>
                                <span className={styles.userRole}>Store Manager</span>
                            </motion.div>
                        )}
                    </div>
                </div>
            </motion.aside>

            {/* Main Content */}
            <main className={styles.main}>
                <header className={styles.mainHeader}>
                    <button
                        className={styles.mobileMenuToggle}
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        <Menu size={24} />
                    </button>
                    <div className={styles.headerTitle}>
                        {adminLinks.find(l => l.href === pathname)?.name || 'Admin'}
                    </div>
                    <div className={styles.headerActions}>
                        <Link href="/" className={styles.viewSiteBtn}>
                            View Website
                        </Link>
                    </div>
                </header>
                <div className={styles.content}>
                    {children}
                </div>
            </main>

            {/* Mobile Backdrop */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        className={styles.backdrop}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsMobileMenuOpen(false)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
