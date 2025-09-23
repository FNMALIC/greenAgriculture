import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Mentor from '@/models/Mentor';

export async function POST(request: Request) {
    try {
        await connectDB();
        const body = await request.json();

        // Validate required fields
        if (!body.firstName || !body.lastName || !body.email || !body.experience || !body.expertise || !body.availability) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Check if email already exists
        const existingMentor = await Mentor.findOne({ email: body.email });
        if (existingMentor) {
            return NextResponse.json(
                { error: 'Email already registered' },
                { status: 400 }
            );
        }

        // Set location to Douala, Cameroon if not provided
        if (!body.location) {
            body.location = 'Douala, Cameroon';
        }

        // Process skills from expertise text (simple split by comma)
        if (body.expertise && !body.skills) {
            body.skills = body.expertise.split(',').map((skill: string) => skill.trim()).filter(Boolean);
        }

        // Create mentor with default status as pending
        const mentorData = {
            ...body,
            status: 'pending',
            isVerified: false
        };

        const mentor = await Mentor.create(mentorData);

        return NextResponse.json({
            mentor: {
                id: mentor._id,
                email: mentor.email,
                status: mentor.status
            },
            message: 'Mentor application submitted successfully! We will review your application and get back to you within 2-3 business days.'
        }, { status: 201 });

    } catch (error: any) {
        console.error('Mentor registration error:', error);

        if (error.code === 11000) {
            return NextResponse.json(
                { error: 'Email already registered' },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { error: error.message || 'Internal Server Error' },
            { status: 500 }
        );
    }
}

// GET all mentors
export async function GET(request: Request) {
    try {
        await connectDB();
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');
        const status = searchParams.get('status');
        const isAdmin = searchParams.get('admin') === 'true';

        const skip = (page - 1) * limit;

        const query: any = {};
        if (status) {
            query.status = status;
        }

        console.log(query)
        const mentors = await Mentor.find(query)
            .sort({ rating: -1, createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .select('firstName lastName email company role experience expertise skills location rating totalMentees status isVerified createdAt');

        console.log(mentors)

        const total = await Mentor.countDocuments(query);

        return NextResponse.json({
            mentors,
            pagination: {
                total,
                page,
                limit,
                pages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error('Error fetching mentors:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}