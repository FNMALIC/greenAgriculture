import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { getServerSession } from 'next-auth';
import {authOptions} from "@/lib/authOptions";

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
        const { role } = body;

        if (!['admin', 'author'].includes(role)) {
            return NextResponse.json(
                { error: 'Invalid role' },
                { status: 400 }
            );
        }

        // Prevent removing the last admin
        if (role !== 'admin') {
            const adminCount = await User.countDocuments({ role: 'admin' });
            const userToUpdate = await User.findById(params.id);

            if (adminCount === 1 && userToUpdate?.role === 'admin') {
                return NextResponse.json(
                    { error: 'Cannot remove the last admin' },
                    { status: 400 }
                );
            }
        }

        const user = await User.findByIdAndUpdate(
            params.id,
            { role },
            { new: true, runValidators: true }
        ).select('-password');

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json(user);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to update user role' },
            { status: 500 }
        );
    }
}