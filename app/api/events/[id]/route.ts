import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Event from '@/models/Event';

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB();
        const event = await Event.findById(params.id);
        if (!event) {
            return NextResponse.json(
                { error: 'Event not found' },
                { status: 404 }
            );
        }
        return NextResponse.json(event);
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}

export async function PUT(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB();
        const body = await req.json();
        const event = await Event.findByIdAndUpdate(params.id, body, {
            new: true,
            runValidators: true
        });
        if (!event) {
            return NextResponse.json(
                { error: 'Event not found' },
                { status: 404 }
            );
        }
        return NextResponse.json(event);
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || 'Internal Server Error' },
            { status: 500 }
        );
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB();
        const event = await Event.findByIdAndDelete(params.id);
        if (!event) {
            return NextResponse.json(
                { error: 'Event not found' },
                { status: 404 }
            );
        }
        return NextResponse.json({ message: 'Event deleted successfully' });
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}