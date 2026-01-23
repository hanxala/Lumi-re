import mongoose from 'mongoose';

const HeroSlideSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    highlight: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    ctaText: {
        type: String,
        default: 'Shop Now'
    },
    ctaLink: {
        type: String,
        default: '/products'
    },
    badge: {
        type: String,
        default: 'New'
    },
    order: {
        type: Number,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

export const HeroSlide = mongoose.models.HeroSlide || mongoose.model('HeroSlide', HeroSlideSchema);
