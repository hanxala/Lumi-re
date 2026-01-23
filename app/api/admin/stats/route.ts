import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import connectDB from '@/lib/db';
import { Order } from '@/lib/models/Order';
import { Product } from '@/lib/models/Product';
// import { User } from '@/lib/models/User'; // Assuming you have a User model or similar

export async function GET(req: Request) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        await connectDB();

        // 1. Total Revenue
        const totalRevenueResult = await Order.aggregate([
            { $match: { status: { $ne: 'Cancelled' } } },
            { $group: { _id: null, total: { $sum: '$totalAmount' } } }
        ]);
        const totalRevenue = totalRevenueResult[0]?.total || 0;

        // 2. Total Orders
        const totalOrders = await Order.countDocuments();

        // 3. Total Products
        const totalProducts = await Product.countDocuments();

        // 4. Recent Orders
        const recentOrders = await Order.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .populate('user', 'firstName lastName email'); // Populate user if available

        return NextResponse.json({
            revenue: totalRevenue,
            orders: totalOrders,
            products: totalProducts,
            customers: 0, // Placeholder until User model is set up
            recentOrders
        });

    } catch (error) {
        console.error('[ADMIN_STATS_GET]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
