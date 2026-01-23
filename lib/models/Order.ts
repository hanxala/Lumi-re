import mongoose, { Schema, Document } from 'mongoose';

export interface IOrder extends Document {
    user: string; // Clerk User ID
    items: {
        product: string | mongoose.Types.ObjectId;
        quantity: number;
        price: number;
        name: string;
        image: string;
    }[];
    shippingAddress: {
        firstName: string;
        lastName: string;
        address: string;
        city: string;
        zipCode: string;
        country: string;
        phone: string;
    };
    paymentMethod: 'COD' | 'Card';
    paymentStatus: 'Pending' | 'Paid' | 'Failed';
    status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
    totalAmount: number;
    subtotal: number;
    shippingCost: number;
    tax: number;
}

const OrderSchema = new Schema<IOrder>({
    user: { type: String, required: true },
    items: [{
        product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        name: { type: String, required: true },
        image: { type: String, required: true }
    }],
    shippingAddress: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        address: { type: String, required: true },
        city: { type: String, required: true },
        zipCode: { type: String, required: true },
        country: { type: String, required: true },
        phone: { type: String, required: true }
    },
    paymentMethod: { type: String, enum: ['COD', 'Card'], default: 'COD' },
    paymentStatus: { type: String, enum: ['Pending', 'Paid', 'Failed'], default: 'Pending' },
    status: { type: String, enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled'], default: 'Processing' },
    totalAmount: { type: Number, required: true },
    subtotal: { type: Number, required: true },
    shippingCost: { type: Number, required: true },
    tax: { type: Number, required: true },
}, { timestamps: true });

export const Order = mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);
