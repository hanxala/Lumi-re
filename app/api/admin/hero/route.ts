import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import connectDB from '@/lib/db';
import { HeroSlide } from '@/lib/models/HeroSlide';

export async function GET(req: Request) {
    try {
        const { userId } = await auth();
        if (!userId) return new NextResponse('Unauthorized', { status: 401 });

        await connectDB();
        const slides = await HeroSlide.find().sort({ order: 1, createdAt: -1 });
        return NextResponse.json(slides);
    } catch (error) {
        console.error('[ADMIN_HERO_GET]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const { userId } = await auth();
        if (!userId) return new NextResponse('Unauthorized', { status: 401 });

        const body = await req.json();
        await connectDB();

        const slide = await HeroSlide.create(body);
        return NextResponse.json(slide);
    } catch (error) {
        console.error('[ADMIN_HERO_POST]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const { userId } = await auth();
        if (!userId) return new NextResponse('Unauthorized', { status: 401 });

        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) return new NextResponse('ID required', { status: 400 });

        await connectDB();
        await HeroSlide.findByIdAndDelete(id);

        return new NextResponse('Deleted', { status: 200 });
    } catch (error) {
        console.error('[ADMIN_HERO_DELETE]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
