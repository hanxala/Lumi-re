'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Search, Menu, X, User } from 'lucide-react';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useCartStore } from '@/lib/store';
import styles from './Header.module.css';

const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
];

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const itemCount = useCartStore((state) => state.getItemCount());

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                {/* Logo */}
                <Link href="/" className={styles.logo}>
                    <motion.span
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        Lumière
                    </motion.span>
                </Link>

                {/* Desktop Navigation */}
                <nav className={styles.nav}>
                    {navLinks.map((link, index) => (
                        <motion.div
                            key={link.href}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Link href={link.href} className={styles.navLink}>
                                {link.name}
                            </Link>
                        </motion.div>
                    ))}
                </nav>

                {/* Actions */}
                <div className={styles.actions}>
                    {/* Search */}
                    <motion.button
                        className={styles.iconButton}
                        onClick={() => setSearchOpen(!searchOpen)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <Search size={20} />
                    </motion.button>

                    {/* Cart */}
                    <Link href="/cart" className={styles.cartButton}>
                        <motion.div
                            className={styles.iconButton}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <ShoppingCart size={20} />
                            {mounted && itemCount > 0 && (
                                <motion.span
                                    className={styles.badge}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                                >
                                    {itemCount}
                                </motion.span>
                            )}
                        </motion.div>
                    </Link>

                    {/* Authentication */}
                    <div className={styles.authWrapper}>
                        <SignedIn>
                            <div className={styles.userButtonWrapper}>
                                <UserButton afterSignOutUrl="/">
                                    <UserButton.MenuItems>
                                        <UserButton.Link
                                            label="Dashboard"
                                            labelIcon={<User size={14} />}
                                            href="/admin"
                                        />
                                    </UserButton.MenuItems>
                                </UserButton>
                            </div>
                        </SignedIn>
                        <SignedOut>
                            <SignInButton mode="modal">
                                <motion.button
                                    className={styles.iconButton}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <User size={20} />
                                </motion.button>
                            </SignInButton>
                        </SignedOut>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <motion.button
                        className={styles.mobileMenuButton}
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </motion.button>
                </div>
            </div>

            {/* Search Bar */}
            <AnimatePresence>
                {searchOpen && (
                    <motion.div
                        className={styles.searchBar}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className={styles.container}>
                            <input
                                type="text"
                                placeholder="Search for products..."
                                className={styles.searchInput}
                                autoFocus
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        className={styles.mobileMenu}
                        initial={{ x: '-100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100%' }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                        <nav className={styles.mobileNav}>
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={styles.mobileNavLink}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile Menu Backdrop */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        className={styles.backdrop}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setMobileMenuOpen(false)}
                    />
                )}
            </AnimatePresence>
        </header>
    );
}
