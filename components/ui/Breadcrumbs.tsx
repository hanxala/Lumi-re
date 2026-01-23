'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import styles from './Breadcrumbs.module.css';

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
    return (
        <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
            <ol className={styles.list}>
                <li className={styles.item}>
                    <Link href="/" className={styles.link}>
                        <Home size={16} />
                        <span className="sr-only">Home</span>
                    </Link>
                </li>

                {items.map((item, index) => {
                    const isLast = index === items.length - 1;

                    return (
                        <li key={index} className={styles.item}>
                            <ChevronRight size={16} className={styles.separator} />
                            {isLast || !item.href ? (
                                <span className={styles.current} aria-current="page">
                                    {item.label}
                                </span>
                            ) : (
                                <Link href={item.href} className={styles.link}>
                                    {item.label}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
