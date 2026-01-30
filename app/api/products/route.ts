import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import connectDB from '@/lib/db';
import { Product } from '@/lib/models/Product';
// import { isAdmin } from '@/lib/admin'; // TODO: Implement admin check

export async function GET(req: Request) {
    try {
        await connectDB();

        const { searchParams } = new URL(req.url);
        const category = searchParams.get('category');
        const featured = searchParams.get('featured');

        let query: any = {};
        if (category) query.category = category; // Note: You might need to adjust this depending on how you store category (ID vs object)
        if (featured === 'true') query.isFeatured = true;

        const products = await Product.find(query).sort({ createdAt: -1 });
        return NextResponse.json(products);
    } catch (error) {
        console.error('[PRODUCTS_GET]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const { userId } = await auth();
        // TODO: Check if user is admin
        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const body = await req.json();
        const {
            name,
            price,
            salePrice,
            description,
            category,
            images,
            inStock,
            stockCount,
            isFeatured,
            isBestseller,
            isNewArrival,
            features,
            tags,
            specifications
        } = body;

        if (!name || !price || !category) {
            return new NextResponse('Missing required fields', { status: 400 });
        }

        await connectDB();

        // Generate robust slug
        const slug = name
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');

        const product = await Product.create({
            name,
            price,
            salePrice,
            description,
            categoryId: category,
            images,
            inStock: inStock ?? true,
            stockCount: stockCount ?? 0,
            isFeatured: isFeatured ?? false,
            isBestseller: isBestseller ?? false,
            isNewArrival: isNewArrival ?? false,
            features: features ?? [],
            tags: tags ?? [],
            specifications: specifications ?? [],
            slug,
            rating: 0,
            reviewCount: 0
        });

        return NextResponse.json(product);
    } catch (error) {
        console.error('[PRODUCTS_POST]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
