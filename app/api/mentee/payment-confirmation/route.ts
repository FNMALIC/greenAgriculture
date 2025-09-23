// endpoint api/mentee/payment-confirmation


import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Mentee from '@/models/Mentee';

export async function POST(request: Request) {
    try {
        await connectDB();
        const { menteeId, paymentMethod, transactionId, paymentScreenshot } = await request.json();

        if (!menteeId || !paymentMethod || !transactionId) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Find the mentee
        const mentee = await Mentee.findById(menteeId);
        if (!mentee) {
            return NextResponse.json(
                { error: 'Mentee not found' },
                { status: 404 }
            );
        }

        // Check if mentee has premium plan
        if (mentee.planType !== 'premium') {
            return NextResponse.json(
                { error: 'Payment confirmation only for premium plans' },
                { status: 400 }
            );
        }

        // Update mentee with payment information
        const updateData = {
            subscriptionStatus: 'active', // Admin will approve after verifying payment
            paymentDetails: {
                method: paymentMethod,
                transactionId: transactionId,
                submittedAt: new Date()
            }
        };

        const updatedMentee = await Mentee.findByIdAndUpdate(
            menteeId,
            updateData,
            { new: true }
        ).select('firstName lastName email planType subscriptionStatus');

        return NextResponse.json({
            message: 'Payment confirmation submitted successfully! We will verify your payment and activate your premium plan within 24 hours.',
            mentee: updatedMentee
        });

    } catch (error: any) {
        console.error('Payment confirmation error:', error);
        return NextResponse.json(
            { error: error.message || 'Internal Server Error' },
            { status: 500 }
        );
    }
}

// GET payment confirmations (admin only)
export async function GET(request: Request) {
    try {
        await connectDB();
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');

        const skip = (page - 1) * limit;

        const mentees = await Mentee.find({
            planType: 'premium',
            subscriptionStatus: 'pending',
            'paymentDetails.transactionId': { $exists: true }
        })
            .sort({ 'paymentDetails.submittedAt': -1 })
            .skip(skip)
            .limit(limit)
            .select('firstName lastName email planType subscriptionStatus paymentDetails createdAt');

        const total = await Mentee.countDocuments({
            planType: 'premium',
            subscriptionStatus: 'pending',
            'paymentDetails.transactionId': { $exists: true }
        });

        return NextResponse.json({
            paymentConfirmations: mentees,
            pagination: {
                total,
                page,
                limit,
                pages: Math.ceil(total / limit),
            },
        });

    } catch (error) {
        console.error('Error fetching payment confirmations:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}