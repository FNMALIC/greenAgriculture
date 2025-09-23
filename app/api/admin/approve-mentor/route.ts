import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Mentor from '@/models/Mentor';

export async function PUT(request: Request) {
    try {
        await connectDB();
        const { mentorId, action } = await request.json();

        if (!mentorId || !action) {
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
            updateData.isVerified = true;
        }

        const mentor = await Mentor.findByIdAndUpdate(
            mentorId,
            updateData,
            { new: true }
        ).select('firstName lastName email company role status isVerified');

        if (!mentor) {
            return NextResponse.json(
                { error: 'Mentor not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            message: `Mentor ${action}d successfully`,
            mentor
        });

    } catch (error: any) {
        console.error('Error approving mentor:', error);
        return NextResponse.json(
            { error: error.message || 'Internal Server Error' },
            { status: 500 }
        );
    }
}