import mongoose from 'mongoose';

const SettingsSchema = new mongoose.Schema({
    storeName: {
        type: String,
        default: 'Lumière'
    },
    supportEmail: {
        type: String,
        default: 'support@antigravity.com'
    },
    currency: {
        type: String,
        default: 'USD'
    },
    maintenanceMode: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

export const Settings = mongoose.models.Settings || mongoose.model('Settings', SettingsSchema);
