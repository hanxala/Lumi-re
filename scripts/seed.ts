
import { v2 as cloudinary } from 'cloudinary';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import { products, categories } from '../data/products';
import { Product } from '../lib/models/Product';
import path from 'path';

// Load env vars
dotenv.config();

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const connectDB = async () => {
    if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI missing');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');
};

const uploadImage = async (url: string, folder: string) => {
    try {
        const result = await cloudinary.uploader.upload(url, {
            folder: `lumiere/${folder}`,
        });
        return result.secure_url;
    } catch (e) {
        console.error('Image upload failed:', e);
        return url; // Fallback to original if upload fails
    }
};

const seed = async () => {
    await connectDB();

    console.log('Seeding Products...');
    // Clear existing
    await Product.deleteMany({});

    for (const p of products) {
        console.log(`Processing ${p.name}...`);

        // Upload images
        const newImages = [];
        for (const img of p.images) {
            const uploaded = await uploadImage(img, 'products');
            newImages.push(uploaded);
        }

        await Product.create({
            ...p,
            categoryId: p.category.id, // Flatten category to ID
            images: newImages,
        });
    }

    console.log('Seeding Complete!');
    process.exit(0);
};

seed().catch(err => {
    console.error(err);
    process.exit(1);
});
