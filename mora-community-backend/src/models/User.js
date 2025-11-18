import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, trim: true, lowercase: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true, match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ },
    passwordHash: { type: String, required: true, minlength: 6 },
    displayName: { type: String, trim: true, required: true },
    bio: { type: String, trim: true },
    avatarUrl: { type: String, trim: true },
    avatarId: { type: String, trim: true },
    phone: {
        type: String, trim: true, sparse: true
    }
}, {
    timestamps: true
}
);


// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.passwordHash);
};
export const User = mongoose.model('User', userSchema);