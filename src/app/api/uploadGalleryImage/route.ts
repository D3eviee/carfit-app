import { putBusinessImageToGallery } from '@/actions/actions';
import { businessAuth } from '@/lib/auth';
import {uploadToGalleryS3} from '@/lib/s3';
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
    const businessId = (await businessAuth()).id
    const formData = await req.formData()
    const file = formData.get('image') as File;

    if (!file) return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });

    const {error, key} = await uploadToGalleryS3({file, businessId})
    if(error) return NextResponse.json({ message: error});

    if(key) putBusinessImageToGallery(businessId, key)
    return NextResponse.json({ key });   
}