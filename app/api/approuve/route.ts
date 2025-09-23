import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Mentor from '@/models/Mentor';
import Mentee from '@/models/Mentee';

// PUT - Update status for mentor or mentee
export async function PUT(request: Request) {
    try {
        await connectDB();
        const body = await request.json();

        // Validate required fields
        if (!body.id || !body.userType || !body.status) {
            return NextResponse.json(
                { error: 'Missing required fields: id, userType, and status are required' },
                { status: 400 }
            );
        }

        const { id, userType, status } = body;

        // Validate userType
        if (!['mentor', 'mentee'].includes(userType)) {
            return NextResponse.json(
                { error: 'Invalid userType. Must be either "mentor" or "mentee"' },
                { status: 400 }
            );
        }

        let user;
        let validStatuses;
        let Model;

        // Set model and valid statuses based on userType
        if (userType === 'mentor') {
            Model = Mentor;
            validStatuses = ['pending', 'approved', 'rejected', 'inactive'];
        } else {
            Model = Mentee;
            validStatuses = ['pending', 'approved', 'rejected', 'active', 'inactive'];
        }

        // Validate status
        if (!validStatuses.includes(status)) {
            return NextResponse.json(
                { error: `Invalid status. Valid statuses for ${userType}: ${validStatuses.join(', ')}` },
                { status: 400 }
            );
        }

        // Find the user
        user = await Model.findById(id);
        if (!user) {
            return NextResponse.json(
                { error: `${userType.charAt(0).toUpperCase() + userType.slice(1)} not found` },
                { status: 404 }
            );
        }

        // Prepare update data
        const updateData = { status };

        // Add approval metadata if status is being approved
        if (status === 'approved' && user.status !== 'approved') {
            updateData.approvedDate = new Date();


            // For mentors, also set isVerified to true when approved
            if (userType === 'mentor') {
                updateData.isVerified = true;
            }
        }

        // Update the user
        const updatedUser = await Model.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );

        // Log the status change
        console.log(`${userType} status updated:`, {
            id,
            oldStatus: user.status,
            newStatus: status,
            updatedAt: new Date()
        });

        return NextResponse.json({
            message: `${userType.charAt(0).toUpperCase() + userType.slice(1)} status updated successfully`,
            user: {
                id: updatedUser._id,
                email: updatedUser.email,
                fullName: updatedUser.fullName,
                status: updatedUser.status,
                isVerified: updatedUser.isVerified,
                approvedDate: updatedUser.approvedDate,
                updatedAt: updatedUser.updatedAt
            }
        });

    } catch (error: any) {
        console.error('Status update error:', error);

        // Handle specific MongoDB errors
        if (error.name === 'CastError') {
            return NextResponse.json(
                { error: 'Invalid ID format' },
                { status: 400 }
            );
        }

        if (error.name === 'ValidationError') {
            return NextResponse.json(
                { error: error.message },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { error: error.message || 'Internal Server Error' },
            { status: 500 }
        );
    }
}

// GET - Get status information for a specific user
export async function GET(request: Request) {
    try {
        await connectDB();
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        const userType = searchParams.get('userType');

        if (!id || !userType) {
            return NextResponse.json(
                { error: 'Missing required parameters: id and userType' },
                { status: 400 }
            );
        }

        if (!['mentor', 'mentee'].includes(userType)) {
            return NextResponse.json(
                { error: 'Invalid userType. Must be either "mentor" or "mentee"' },
                { status: 400 }
            );
        }

        const Model = userType === 'mentor' ? Mentor : Mentee;
        const user = await Model.findById(id).select(
            'firstName lastName email status isVerified approvedDate applicationDate updatedAt'
        );

        if (!user) {
            return NextResponse.json(
                { error: `${userType.charAt(0).toUpperCase() + userType.slice(1)} not found` },
                { status: 404 }
            );
        }

        return NextResponse.json({
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                status: user.status,
                isVerified: user.isVerified,
                approvedDate: user.approvedDate,
                applicationDate: user.applicationDate,
                updatedAt: user.updatedAt
            }
        });

    } catch (error: any) {
        console.error('Status fetch error:', error);

        if (error.name === 'CastError') {
            return NextResponse.json(
                { error: 'Invalid ID format' },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { error: error.message || 'Internal Server Error' },
            { status: 500 }
        );
    }
}

// POST - Batch status update (for multiple users)
export async function POST(request: Request) {
    try {
        await connectDB();
        const body = await request.json();

        // Validate required fields
        if (!body.updates || !Array.isArray(body.updates) || body.updates.length === 0) {
            return NextResponse.json(
                { error: 'Missing required field: updates (array of update objects)' },
                { status: 400 }
            );
        }

        const results = [];
        const errors = [];

        for (const update of body.updates) {
            try {
                const { id, userType, status } = update;

                // Validate each update
                if (!id || !userType || !status) {
                    errors.push({
                        id: id || 'unknown',
                        error: 'Missing required fields: id, userType, and status'
                    });
                    continue;
                }

                if (!['mentor', 'mentee'].includes(userType)) {
                    errors.push({
                        id,
                        error: 'Invalid userType. Must be either "mentor" or "mentee"'
                    });
                    continue;
                }

                const Model = userType === 'mentor' ? Mentor : Mentee;
                const validStatuses = userType === 'mentor'
                    ? ['pending', 'approved', 'rejected', 'inactive']
                    : ['pending', 'approved', 'rejected', 'active', 'inactive'];

                if (!validStatuses.includes(status)) {
                    errors.push({
                        id,
                        error: `Invalid status. Valid statuses for ${userType}: ${validStatuses.join(', ')}`
                    });
                    continue;
                }

                // Find and update the user
                const user = await Model.findById(id);
                if (!user) {
                    errors.push({
                        id,
                        error: `${userType.charAt(0).toUpperCase() + userType.slice(1)} not found`
                    });
                    continue;
                }

                const updateData = { status };
                if (status === 'approved' && user.status !== 'approved') {
                    updateData.approvedDate = new Date();

                    if (userType === 'mentor') {
                        updateData.isVerified = true;
                    }
                }

                const updatedUser = await Model.findByIdAndUpdate(
                    id,
                    updateData,
                    { new: true, runValidators: true }
                );

                results.push({
                    id: updatedUser._id,
                    email: updatedUser.email,
                    fullName: updatedUser.fullName,
                    status: updatedUser.status,
                    userType,
                    updated: true
                });

            } catch (updateError: any) {
                errors.push({
                    id: update.id || 'unknown',
                    error: updateError.message || 'Update failed'
                });
            }
        }

        return NextResponse.json({
            message: `Batch update completed. ${results.length} successful, ${errors.length} failed`,
            results,
            errors: errors.length > 0 ? errors : undefined,
            summary: {
                total: body.updates.length,
                successful: results.length,
                failed: errors.length
            }
        });

    } catch (error: any) {
        console.error('Batch status update error:', error);
        return NextResponse.json(
            { error: error.message || 'Internal Server Error' },
            { status: 500 }
        );
    }
}