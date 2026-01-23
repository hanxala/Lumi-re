import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { HeroSlide } from '@/lib/models/HeroSlide';

export async function GET(req: Request) {
    try {
        await connectDB();
        const slides = await HeroSlide.find({ isActive: true }).sort({ order: 1, createdAt: -1 });
        return NextResponse.json(slides);
    } catch (error) {
        console.error('[HERO_GET]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
