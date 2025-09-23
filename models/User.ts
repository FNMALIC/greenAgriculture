import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const { Schema, model, models } = mongoose;

export interface IUser {
    name: string;
    email: string;
    password: string;
    role: 'admin' | 'author' | 'user';
    status: 'active' | 'blocked';
    lastLogin?: Date;
    avatar?: string;
    bio?: string;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: [6, 'Password must be at least 6 characters'],
        },
        role: {
            type: String,
            enum: ['admin', 'author', 'user'],
            default: 'user',
        },
        status: {
            type: String,
            enum: ['active', 'blocked'],
            default: 'active',
        },
        lastLogin: {
            type: Date,
        },
        avatar: {
            type: String,
        },
        bio: {
            type: String,
            maxlength: 500,
        },
    },
    {
        timestamps: true,
    }
);

// Password hashing middleware
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error as Error);
    }
});

// Password comparison method
userSchema.methods.comparePassword = async function(candidatePassword: string) {
    return bcrypt.compare(candidatePassword, this.password);
};

// Indexes
userSchema.index({ role: 1 });
userSchema.index({ status: 1 });

// Export the model (handle both server and client-side compilation)
const User = models?.User || model<IUser>('User', userSchema);

export default User;


// Separate utility function for ensuring admin exists
export const ensureAdminExists = async () => {
    try {
        const adminExists = await User.exists({ role: 'admin' });
        if (!adminExists) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash('defaultpassword', salt);

            await User.create({
                name: 'Default Admin',
                email: 'nixon@admin.com',
                password: hashedPassword,
                role: 'admin',
            });
            console.log('Default admin user created successfully');
        }
    } catch (error) {
        console.error('Error ensuring admin user:', error);
    }
};