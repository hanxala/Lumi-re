import { Product, Category } from '@/types';

// Categories
export const categories: Category[] = [
    {
        id: 'chandeliers',
        name: 'Chandeliers',
        slug: 'chandeliers',
        description: 'Elegant crystal and modern chandeliers for grand spaces',
        image: 'https://picsum.photos/seed/chandeliers/800/600',
    },
    {
        id: 'pendants',
        name: 'Pendant Lights',
        slug: 'pendant-lights',
        description: 'Contemporary pendant lights for kitchens and dining areas',
        image: 'https://picsum.photos/seed/pendants/800/600',
    },
    {
        id: 'table-lamps',
        name: 'Table Lamps',
        slug: 'table-lamps',
        description: 'Stylish table lamps for desks and bedside tables',
        image: 'https://picsum.photos/seed/table-lamps/800/600',
    },
    {
        id: 'floor-lamps',
        name: 'Floor Lamps',
        slug: 'floor-lamps',
        description: 'Modern floor lamps for ambient and task lighting',
        image: 'https://picsum.photos/seed/floor-lamps/800/600',
    },
    {
        id: 'wall-sconces',
        name: 'Wall Sconces',
        slug: 'wall-sconces',
        description: 'Decorative wall-mounted lighting fixtures',
        image: 'https://picsum.photos/seed/wall-sconces/800/600',
    },
    {
        id: 'decorative',
        name: 'Decorative Items',
        slug: 'decorative-items',
        description: 'Elegant home decor accessories and accents',
        image: 'https://picsum.photos/seed/decorative/800/600',
    },
];



// Products
export const products: Product[] = [
    // Chandeliers
    {
        id: 'ch-001',
        name: 'Crystal Palace Chandelier',
        slug: 'crystal-palace-chandelier',
        description: 'A stunning crystal chandelier featuring cascading crystals and gold-plated arms. Perfect for grand dining rooms and entryways.',
        price: 1299,
        salePrice: 999,
        images: [
            'https://picsum.photos/seed/ch-001-1/800/600',
            'https://picsum.photos/seed/ch-001-2/800/600',
        ],


        category: categories[0],
        rating: 4.8,
        reviewCount: 124,
        inStock: true,
        stockCount: 15,
        features: [
            'Hand-cut crystal prisms',
            'Gold-plated metal frame',
            'Adjustable chain length',
            'Dimmable with compatible switch',
            'Easy installation',
        ],
        specifications: [
            { label: 'Dimensions', value: '24" W x 28" H' },
            { label: 'Weight', value: '35 lbs' },
            { label: 'Bulb Type', value: 'E12 Candelabra (not included)' },
            { label: 'Number of Lights', value: '8' },
            { label: 'Material', value: 'Crystal, Metal' },
            { label: 'Finish', value: 'Gold' },
        ],
        tags: ['luxury', 'crystal', 'traditional', 'dining room'],
        isFeatured: true,
        isBestseller: true,
    },
    {
        id: 'ch-002',
        name: 'Modern Geometric Chandelier',
        slug: 'modern-geometric-chandelier',
        description: 'Contemporary chandelier with geometric metal frame and integrated LED lights. Ideal for modern living spaces.',
        price: 899,
        images: ['https://picsum.photos/seed/ch-002/800/600'],


        category: categories[0],
        rating: 4.6,
        reviewCount: 89,
        inStock: true,
        stockCount: 22,
        features: [
            'Geometric metal design',
            'Integrated LED lights',
            'Energy efficient',
            'Matte black finish',
            'Contemporary style',
        ],
        specifications: [
            { label: 'Dimensions', value: '30" W x 32" H' },
            { label: 'Weight', value: '28 lbs' },
            { label: 'Bulb Type', value: 'Integrated LED' },
            { label: 'Wattage', value: '60W' },
            { label: 'Material', value: 'Metal' },
            { label: 'Finish', value: 'Matte Black' },
        ],
        tags: ['modern', 'geometric', 'led', 'living room'],
        isNewArrival: true,
    },

    // Pendant Lights
    {
        id: 'pd-001',
        name: 'Brass Geometric Pendant',
        slug: 'brass-geometric-pendant',
        description: 'Minimalist pendant light with brass geometric frame. Perfect for kitchen islands and dining tables.',
        price: 249,
        images: ['https://picsum.photos/seed/pd-001/800/600'],


        category: categories[1],
        rating: 4.7,
        reviewCount: 156,
        inStock: true,
        stockCount: 45,
        features: [
            'Geometric brass frame',
            'Adjustable cord length',
            'Warm brass finish',
            'Modern minimalist design',
            'Easy installation',
        ],
        specifications: [
            { label: 'Dimensions', value: '12" W x 14" H' },
            { label: 'Weight', value: '6 lbs' },
            { label: 'Bulb Type', value: 'E26 Medium Base (not included)' },
            { label: 'Max Wattage', value: '60W' },
            { label: 'Material', value: 'Brass' },
            { label: 'Cord Length', value: 'Adjustable up to 72"' },
        ],
        tags: ['modern', 'brass', 'kitchen', 'minimalist'],
        isFeatured: true,
    },
    {
        id: 'pd-002',
        name: 'Glass Globe Pendant',
        slug: 'glass-globe-pendant',
        description: 'Elegant glass globe pendant with antique brass hardware. Creates beautiful ambient lighting.',
        price: 189,
        salePrice: 149,
        images: ['https://picsum.photos/seed/pd-002/800/600'],


        category: categories[1],
        rating: 4.5,
        reviewCount: 98,
        inStock: true,
        stockCount: 38,
        features: [
            'Clear glass globe',
            'Antique brass hardware',
            'Vintage-inspired design',
            'Adjustable height',
            'Versatile placement',
        ],
        specifications: [
            { label: 'Dimensions', value: '10" Diameter' },
            { label: 'Weight', value: '5 lbs' },
            { label: 'Bulb Type', value: 'E26 Medium Base (not included)' },
            { label: 'Max Wattage', value: '60W' },
            { label: 'Material', value: 'Glass, Brass' },
            { label: 'Finish', value: 'Antique Brass' },
        ],
        tags: ['vintage', 'glass', 'brass', 'ambient'],
        isBestseller: true,
    },

    // Table Lamps
    {
        id: 'tl-001',
        name: 'Marble & Gold Table Lamp',
        slug: 'marble-gold-table-lamp',
        description: 'Luxurious table lamp featuring a marble base with gold accents and cream fabric shade.',
        price: 329,
        images: ['https://picsum.photos/seed/tl-001/800/600'],


        category: categories[2],
        rating: 4.9,
        reviewCount: 203,
        inStock: true,
        stockCount: 28,
        features: [
            'Natural marble base',
            'Gold metal accents',
            'Cream pleated fabric shade',
            'Inline on/off switch',
            'Luxury design',
        ],
        specifications: [
            { label: 'Dimensions', value: '16" W x 26" H' },
            { label: 'Weight', value: '12 lbs' },
            { label: 'Bulb Type', value: 'E26 Medium Base (not included)' },
            { label: 'Max Wattage', value: '100W' },
            { label: 'Material', value: 'Marble, Metal, Fabric' },
            { label: 'Finish', value: 'Gold, Cream' },
        ],
        tags: ['luxury', 'marble', 'gold', 'bedside'],
        isFeatured: true,
        isBestseller: true,
    },
    {
        id: 'tl-002',
        name: 'Ceramic Coastal Table Lamp',
        slug: 'ceramic-coastal-table-lamp',
        description: 'Coastal-inspired ceramic table lamp with textured base and linen shade.',
        price: 179,
        images: ['https://picsum.photos/seed/tl-002/800/600'],


        category: categories[2],
        rating: 4.4,
        reviewCount: 76,
        inStock: true,
        stockCount: 41,
        features: [
            'Textured ceramic base',
            'Natural linen shade',
            'Coastal design',
            'Neutral color palette',
            'Versatile style',
        ],
        specifications: [
            { label: 'Dimensions', value: '14" W x 24" H' },
            { label: 'Weight', value: '8 lbs' },
            { label: 'Bulb Type', value: 'E26 Medium Base (not included)' },
            { label: 'Max Wattage', value: '75W' },
            { label: 'Material', value: 'Ceramic, Linen' },
            { label: 'Finish', value: 'White, Natural' },
        ],
        tags: ['coastal', 'ceramic', 'neutral', 'bedroom'],
        isNewArrival: true,
    },

    // Floor Lamps
    {
        id: 'fl-001',
        name: 'Arc Floor Lamp with Marble Base',
        slug: 'arc-floor-lamp-marble',
        description: 'Modern arc floor lamp featuring a brass finish and white marble base. Perfect for reading corners.',
        price: 449,
        images: ['https://picsum.photos/seed/fl-001/800/600'],


        category: categories[3],
        rating: 4.7,
        reviewCount: 142,
        inStock: true,
        stockCount: 19,
        features: [
            'Arched brass arm',
            'White marble base',
            'Dome shade',
            'Adjustable height',
            'Stable and sturdy',
        ],
        specifications: [
            { label: 'Dimensions', value: '65" Reach x 70" H' },
            { label: 'Weight', value: '45 lbs' },
            { label: 'Bulb Type', value: 'E26 Medium Base (not included)' },
            { label: 'Max Wattage', value: '100W' },
            { label: 'Material', value: 'Metal, Marble' },
            { label: 'Finish', value: 'Brass, White' },
        ],
        tags: ['modern', 'arc', 'marble', 'reading'],
        isFeatured: true,
    },
    {
        id: 'fl-002',
        name: 'Tripod Floor Lamp',
        slug: 'tripod-floor-lamp',
        description: 'Scandinavian-style tripod floor lamp with wooden legs and fabric shade.',
        price: 299,
        salePrice: 249,
        images: ['https://picsum.photos/seed/fl-002/800/600'],


        category: categories[3],
        rating: 4.6,
        reviewCount: 118,
        inStock: true,
        stockCount: 33,
        features: [
            'Natural wood tripod base',
            'Fabric drum shade',
            'Scandinavian design',
            'Foot switch',
            'Adjustable legs',
        ],
        specifications: [
            { label: 'Dimensions', value: '20" W x 60" H' },
            { label: 'Weight', value: '15 lbs' },
            { label: 'Bulb Type', value: 'E26 Medium Base (not included)' },
            { label: 'Max Wattage', value: '75W' },
            { label: 'Material', value: 'Wood, Fabric' },
            { label: 'Finish', value: 'Natural Oak, White' },
        ],
        tags: ['scandinavian', 'tripod', 'wood', 'living room'],
    },

    // Wall Sconces
    {
        id: 'ws-001',
        name: 'Vintage Brass Wall Sconce',
        slug: 'vintage-brass-wall-sconce',
        description: 'Ornate vintage-style wall sconce with brass finish and frosted glass shade.',
        price: 159,
        images: ['https://picsum.photos/seed/ws-001/800/600'],


        category: categories[4],
        rating: 4.8,
        reviewCount: 167,
        inStock: true,
        stockCount: 52,
        features: [
            'Vintage brass design',
            'Frosted glass shade',
            'Ornate detailing',
            'Hardwired installation',
            'Classic elegance',
        ],
        specifications: [
            { label: 'Dimensions', value: '8" W x 12" H x 6" D' },
            { label: 'Weight', value: '3 lbs' },
            { label: 'Bulb Type', value: 'E26 Medium Base (not included)' },
            { label: 'Max Wattage', value: '60W' },
            { label: 'Material', value: 'Metal, Glass' },
            { label: 'Finish', value: 'Antique Brass' },
        ],
        tags: ['vintage', 'brass', 'hallway', 'classic'],
        isBestseller: true,
    },
    {
        id: 'ws-002',
        name: 'Modern Black Wall Sconce',
        slug: 'modern-black-wall-sconce',
        description: 'Sleek modern wall sconce with matte black finish and adjustable arm.',
        price: 129,
        images: ['https://picsum.photos/seed/ws-002/800/600'],


        category: categories[4],
        rating: 4.5,
        reviewCount: 94,
        inStock: true,
        stockCount: 67,
        features: [
            'Matte black finish',
            'Adjustable swing arm',
            'Modern minimalist design',
            'Hardwired or plug-in option',
            'Versatile placement',
        ],
        specifications: [
            { label: 'Dimensions', value: '6" W x 10" H x 12" D (extended)' },
            { label: 'Weight', value: '2.5 lbs' },
            { label: 'Bulb Type', value: 'E26 Medium Base (not included)' },
            { label: 'Max Wattage', value: '60W' },
            { label: 'Material', value: 'Metal' },
            { label: 'Finish', value: 'Matte Black' },
        ],
        tags: ['modern', 'black', 'adjustable', 'bedroom'],
        isNewArrival: true,
    },

    // Decorative Items
    {
        id: 'dc-001',
        name: 'Gold Geometric Vase',
        slug: 'gold-geometric-vase',
        description: 'Elegant ceramic vase with gold geometric pattern. Perfect centerpiece for any room.',
        price: 89,
        images: ['https://picsum.photos/seed/dc-001/800/600'],


        category: categories[5],
        rating: 4.7,
        reviewCount: 213,
        inStock: true,
        stockCount: 78,
        features: [
            'Ceramic construction',
            'Gold geometric pattern',
            'Cream base color',
            'Waterproof interior',
            'Versatile decor piece',
        ],
        specifications: [
            { label: 'Dimensions', value: '8" W x 14" H' },
            { label: 'Weight', value: '4 lbs' },
            { label: 'Material', value: 'Ceramic' },
            { label: 'Finish', value: 'Cream with Gold' },
            { label: 'Care', value: 'Wipe clean with damp cloth' },
        ],
        tags: ['decorative', 'vase', 'gold', 'centerpiece'],
        isFeatured: true,
    },
    {
        id: 'dc-002',
        name: 'Crystal Decorative Bowl',
        slug: 'crystal-decorative-bowl',
        description: 'Hand-cut crystal bowl with elegant design. Perfect for entryway or coffee table.',
        price: 149,
        salePrice: 119,
        images: ['https://picsum.photos/seed/dc-002/800/600'],


        category: categories[5],
        rating: 4.6,
        reviewCount: 87,
        inStock: true,
        stockCount: 34,
        features: [
            'Hand-cut crystal',
            'Elegant design',
            'Heavy weight',
            'Versatile use',
            'Gift-ready packaging',
        ],
        specifications: [
            { label: 'Dimensions', value: '12" Diameter x 4" H' },
            { label: 'Weight', value: '6 lbs' },
            { label: 'Material', value: 'Lead-free Crystal' },
            { label: 'Care', value: 'Hand wash only' },
        ],
        tags: ['crystal', 'bowl', 'luxury', 'gift'],
    },
];

// Helper functions
export function getProductById(id: string): Product | undefined {
    return products.find((product) => product.id === id);
}

export function getProductBySlug(slug: string): Product | undefined {
    return products.find((product) => product.slug === slug);
}

export function getProductsByCategory(categoryId: string): Product[] {
    return products.filter((product) => product.category.id === categoryId);
}

export function getFeaturedProducts(): Product[] {
    return products.filter((product) => product.isFeatured);
}

export function getBestsellers(): Product[] {
    return products.filter((product) => product.isBestseller);
}

export function getNewProducts(): Product[] {
    return products.filter((product) => product.isNewArrival);
}

export function searchProducts(query: string): Product[] {
    const lowercaseQuery = query.toLowerCase();
    return products.filter(
        (product) =>
            product.name.toLowerCase().includes(lowercaseQuery) ||
            product.description.toLowerCase().includes(lowercaseQuery) ||
            product.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery))
    );
}
