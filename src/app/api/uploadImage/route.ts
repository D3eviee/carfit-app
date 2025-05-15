import { putProfileImageToDatabase } from '@/actions/actions';
import { userAuth } from '@/lib/auth';
import {uploadToS3} from '@/lib/s3';
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
    const userId = (await userAuth()).id
    const formData = await req.formData()
    const file = formData.get('image') as File;

    if (!file) return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });

    const {error, key} = await uploadToS3({file, userId})
    if(error) return NextResponse.json({ message: error});

    if(key) putProfileImageToDatabase(userId, key)
    return NextResponse.json({ key });   
}