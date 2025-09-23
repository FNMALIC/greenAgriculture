import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Event from '@/models/Event';

export async function GET(req: NextRequest) {
    try {
        await connectDB();
        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');
        const type = searchParams.get('type');
        const status = searchParams.get('status');

        const query: any = {};
        if (type) query.type = type;
        if (status) query.status = status;

        const skip = (page - 1) * limit;

        const events = await Event.find(query)
            .sort({ date: 1 })
            .skip(skip)
            .limit(limit);

        const total = await Event.countDocuments(query);

        return NextResponse.json({
            events,
            pagination: {
                total,
                page,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const body = await req.json();
        const event = await Event.create(body);
        return NextResponse.json(event, { status: 201 });
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || 'Internal Server Error' },
            { status: 500 }
        );
    }
}

