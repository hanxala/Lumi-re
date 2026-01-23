import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
    name: string;
    slug: string;
    description: string;
    price: number;
    salePrice?: number;
    images: string[];
    categoryId: string;
    rating: number;
    reviewCount: number;
    inStock: boolean;
    stockCount: number;
    features: string[];
    tags: string[];
    isFeatured: boolean;
    isBestseller: boolean;
    isNew: boolean;
    specifications: { label: string; value: string }[];
}

const ProductSchema = new Schema<IProduct>({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    salePrice: { type: Number },
    images: [{ type: String }],
    categoryId: { type: String, required: true },
    rating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    inStock: { type: Boolean, default: true },
    stockCount: { type: Number, default: 0 },
    features: [{ type: String }],
    tags: [{ type: String }],
    isFeatured: { type: Boolean, default: false },
    isBestseller: { type: Boolean, default: false },
    isNew: { type: Boolean, default: false },
    specifications: [{
        label: { type: String },
        value: { type: String }
    }],
}, { timestamps: true });

export const Product = mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
