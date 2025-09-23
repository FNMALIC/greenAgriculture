import { NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { getServerSession } from 'next-auth';
import {authOptions} from "@/lib/authOptions";

// GET single user
export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || (session.user as any).role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await connectDB();
        const user = await User.findById(params.id).select('-password');

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json(user);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch user' },
            { status: 500 }
        );
    }
}

// PUT update user
export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || (session.user as any).role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await connectDB();
        const body = await request.json();

        // If updating password, hash it
        if (body.password) {
            body.password = await hash(body.password, 12);
        } else {
            delete body.password; // Don't update password if not provided
        }

        const user = await User.findByIdAndUpdate(
            params.id,
            { ...body },
            { new: true, runValidators: true }
        ).select('-password');

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json(user);
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || 'Failed to update user' },
            { status: 500 }
        );
    }
}

// DELETE user
export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || (session.user as any).role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await connectDB();

        // Prevent deleting the last admin
        const adminCount = await User.countDocuments({ role: 'admin' });
        const userToDelete = await User.findById(params.id);

        if (adminCount === 1 && userToDelete?.role === 'admin') {
            return NextResponse.json(
                { error: 'Cannot delete the last admin user' },
                { status: 400 }
            );
        }

        const user = await User.findByIdAndDelete(params.id);

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'User deleted successfully' });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to delete user' },
            { status: 500 }
        );
    }
}