import { NextResponse } from 'next/server';
import { auth, currentUser } from '@clerk/nextjs/server';
import connectDB from '@/lib/db';
import { Order } from '@/lib/models/Order';
import { Product } from '@/lib/models/Product'; // Ensure Product model is loaded

export async function POST(req: Request) {
    try {
        const { userId } = await auth();
        const user = await currentUser();

        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const body = await req.json();
        const { items, shippingAddress, paymentMethod, totalAmount, subtotal, shippingCost, tax } = body;

        if (!items || items.length === 0) {
            return new NextResponse('No items in order', { status: 400 });
        }

        if (!shippingAddress) {
            return new NextResponse('Shipping address is required', { status: 400 });
        }

        await connectDB();

        // Optional: Verify stock and prices from DB here
        // For now, we trust the frontend but in production you MUST verify prices

        const order = await Order.create({
            user: userId,
            items,
            shippingAddress,
            paymentMethod: paymentMethod || 'COD',
            paymentStatus: paymentMethod === 'COD' ? 'Pending' : 'Paid', // Adjust if card
            status: 'Processing',
            totalAmount,
            subtotal,
            shippingCost,
            tax
        });

        return NextResponse.json(order);

    } catch (error) {
        console.error('[ORDERS_POST]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}

export async function GET(req: Request) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        await connectDB();

        // Fetch orders for the current user, sorted by most recent
        const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });

        return NextResponse.json(orders);
    } catch (error) {
        console.error('[ORDERS_GET]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
