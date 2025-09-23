import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Mentee from '@/models/Mentee';

export async function PUT(request: Request) {
    try {
        await connectDB();
        const { menteeId, action, subscriptionStatus } = await request.json();

        if (!menteeId || !action) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const updateData: any = {
            status: action === 'approve' ? 'approved' : 'rejected'
        };

        if (action === 'approve') {
            updateData.approvedDate = new Date();

            // Handle subscription status for premium users
            if (subscriptionStatus) {
                updateData.subscriptionStatus = subscriptionStatus;

                if (subscriptionStatus === 'active') {
                    updateData.subscriptionStartDate = new Date();
                    updateData.subscriptionEndDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
                }
            }
        }

        const mentee = await Mentee.findByIdAndUpdate(
            menteeId,
            updateData,
            { new: true }
        ).select('firstName lastName email planType status subscriptionStatus');

        if (!mentee) {
            return NextResponse.json(
                { error: 'Mentee not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            message: `Mentee ${action}d successfully`,
            mentee
        });

    } catch (error: any) {
        console.error('Error approving mentee:', error);
        return NextResponse.json(
            { error: error.message || 'Internal Server Error' },
            { status: 500 }
        );
    }
}
