import { NextResponse } from 'next/server';
import { uploadImage } from '@/lib/uploadImage';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('image') as File;
        
        if (!file) {
            return NextResponse.json(
                { error: 'No file uploaded' },
                { status: 400 }
            );
        }

        const imageUrl = await uploadImage(file);

        return NextResponse.json({
            url: imageUrl
        });
    } catch (error) {
        console.error('Error in upload route:', error);
        return NextResponse.json(
            { error: 'Upload failed' },
            { status: 500 }
        );
    }
}