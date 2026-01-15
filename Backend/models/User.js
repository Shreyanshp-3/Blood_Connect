import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        phone: {
            type: String,
            required: true,
            unique: true
        },

        name: { type: String },
        dateOfBirth: { type: Date },
        bloodGroup: { type: String },

        isProfileComplete: {
            type: Boolean,
            default: false
        },

        isDonorActive: {
            type: Boolean,
            default: false
        },

        lastDonationDate: { type: Date },

        location: {
            type: {
                type: String,
                enum: ['Point'],
                default: 'Point'
            },
            coordinates: {
                type: [Number],  // [longitude, latitude]
            }
        }
    }, {
    timestaps: true
}
);

export default mongoose.model("User", userSchema);