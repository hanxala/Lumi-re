import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import connectDB from '@/lib/db';
import { Order } from '@/lib/models/Order';
import { User } from '@/lib/models/User'; // We might need to create this if it doesn't exist, or rely on Clerk + Orders

export async function GET(req: Request) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        await connectDB();

        // Aggregate orders by user email to simulate "Customers"
        // In a real app with Clerk properly synced to a User model, we'd query User directly.
        // Here we'll group orders by shippingAddress.email

        const customers = await Order.aggregate([
            {
                $group: {
                    _id: "$shippingAddress.email",
                    firstName: { $first: "$shippingAddress.firstName" },
                    lastName: { $first: "$shippingAddress.lastName" },
                    totalSpent: { $sum: "$totalAmount" },
                    ordersCount: { $sum: 1 },
                    lastOrderDate: { $max: "$createdAt" }
                }
            },
            { $sort: { totalSpent: -1 } }
        ]);

        return NextResponse.json(customers);
    } catch (error) {
        console.error('[ADMIN_CUSTOMERS_GET]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
