import { supabase } from "./supabase";

export async function uploadImage(file: File): Promise<string> {
    try {
        const timestamp = Date.now();
        const fileExt = file.name.split('.').pop();
        const fileName = `${timestamp}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `blog-images/${fileName}`;

        const { data, error } = await supabase.storage
            .from('images')  
            .upload(filePath, file, {
                cacheControl: '3600',
                upsert: false
            });

        if (error) throw error;

        const { data: { publicUrl } } = supabase.storage
            .from('images')
            .getPublicUrl(filePath);

        return publicUrl;
    } catch (error) {
        console.error('Error uploading image:', error);
        throw new Error('Failed to upload image');
    }
}