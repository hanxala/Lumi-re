import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import connectDB from '@/lib/db';
import { Settings } from '@/lib/models/Settings';

export async function GET(req: Request) {
    try {
        await connectDB();

        let settings = await Settings.findOne();
        if (!settings) {
            settings = await Settings.create({});
        }

        return NextResponse.json(settings);
    } catch (error) {
        console.error('[SETTINGS_GET]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const { userId } = await auth();
        // Check admin
        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const body = await req.json();
        await connectDB();

        let settings = await Settings.findOne();
        if (!settings) {
            settings = await Settings.create(body);
        } else {
            Object.assign(settings, body);
            await settings.save();
        }

        return NextResponse.json(settings);
    } catch (error) {
        console.error('[SETTINGS_POST]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
