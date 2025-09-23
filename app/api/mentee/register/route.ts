import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Mentee from '@/models/Mentee';

export async function POST(request: Request) {
    try {
        await connectDB();
        const body = await request.json();

        // Validate required fields
        if (!body.firstName || !body.lastName || !body.email || !body.experience || !body.goals || !body.availability) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Check if email already exists
        const existingMentee = await Mentee.findOne({ email: body.email });
        if (existingMentee) {
            return NextResponse.json(
                { error: 'Email already registered' },
                { status: 400 }
            );
        }

        // Set location to Douala, Cameroon if not provided
        if (!body.location) {
            body.location = 'Douala, Cameroon';
        }

        // Create mentee with default status as pending
        const menteeData = {
            ...body,
            status: 'pending',
            subscriptionStatus: body.planType === 'premium' ? 'pending' : 'active'
        };

        const mentee = await Mentee.create(menteeData);

        // If premium plan selected, provide payment instructions
        if (body.planType === 'premium') {
            return NextResponse.json({
                mentee: {
                    id: mentee._id,
                    email: mentee.email,
                    planType: mentee.planType
                },
                paymentRequired: true,
                paymentInstructions: {
                    amount: '19,500 XAF',
                    location: 'Available only in Douala, Cameroon',
                    methods: {
                        orangeMoney: {
                            code: '#150*50*',
                            number: '+237 694 XXX XXX',
                            instructions: 'Dial #150*50* then follow prompts to send 19,500 XAF'
                        },
                        mtnMomo: {
                            code: '*126#',
                            number: '+237 677 XXX XXX',
                            instructions: 'Dial *126# then follow prompts to send 19,500 XAF'
                        }
                    },
                    note: 'After payment, use the payment confirmation API with your transaction ID to complete registration. Service available in Douala, Cameroon only.'
                }
            }, { status: 201 });
        }

        return NextResponse.json({
            mentee: {
                id: mentee._id,
                email: mentee.email,
                planType: mentee.planType
            },
            message: 'Registration successful! Your application is pending approval.'
        }, { status: 201 });

    } catch (error: any) {
        console.error('Mentee registration error:', error);

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

// GET all mentees (admin only)
export async function GET(request: Request) {
    try {
        await connectDB();
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');
        const status = searchParams.get('status');
        const planType = searchParams.get('planType');

        const skip = (page - 1) * limit;

        const query: any = {};
        if (status) query.status = status;
        if (planType) query.planType = planType;

        const mentees = await Mentee.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .select('firstName lastName email planType status subscriptionStatus location createdAt');

        const total = await Mentee.countDocuments(query);

        return NextResponse.json({
            mentees,
            pagination: {
                total,
                page,
                limit,
                pages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error('Error fetching mentees:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}