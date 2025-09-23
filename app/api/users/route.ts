import { NextResponse } from 'next/server';
import { hash, genSalt, compare } from 'bcryptjs';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';

// GET all users
export async function GET(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        // console.log('Session:', session); // Add this to debug

        // if (!session?.user?.role || session.user.role !== 'admin') {
        //     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        // }

        await connectDB();
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');
        const role = searchParams.get('role');

        const skip = (page - 1) * limit;
        const query = role ? { role } : {};

        const users = await User.find(query)
            .select('-password')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await User.countDocuments(query);

        return NextResponse.json({
            users,
            pagination: {
                total,
                page,
                pages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch users' },
            { status: 500 }
        );
    }
}

// POST create new user
export async function POST(request: Request) {
    try {
        await connectDB();
        const body = await request.json();

        // Check if user already exists
        const existingUser = await User.findOne({ email: body.email });
        if (existingUser) {
            return NextResponse.json(
                { error: 'Email already registered' },
                { status: 400 }
            );
        }

        const user = await User.create({
            ...body,
            password: body.password, // Pass plain text password
        });

        const userWithoutPassword = {
            ...user.toJSON(),
            password: undefined,
        };

        return NextResponse.json(userWithoutPassword, { status: 201 });
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || 'Failed to create user' },
            { status: 500 }
        );
    }
}