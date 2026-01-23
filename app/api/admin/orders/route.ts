import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import connectDB from '@/lib/db';
import { Order } from '@/lib/models/Order';

export async function GET(req: Request) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        // TODO: Add Admin Check here
        // const user = await currentUser();
        // if (user.publicMetadata.role !== 'admin') ...

        await connectDB();

        const orders = await Order.find({})
            .sort({ createdAt: -1 })
            .populate('user', 'firstName lastName email'); // Populate user details if needed

        return NextResponse.json(orders);
    } catch (error) {
        console.error('[ADMIN_ORDERS_GET]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
