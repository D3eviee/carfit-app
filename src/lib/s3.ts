import {PutObjectCommand, S3Client} from "@aws-sdk/client-s3"
import {v4 as uuid} from "uuid"

const BUCKET = process.env.BUCKET

const s3 = new S3Client({
    region: process.env.AWS_REGION!,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
})

export const uploadToS3 = async ({file, userId}:{file: File, userId: string}) => {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const key = `UserProfilePhotos/${userId}/${uuid()}`
    const command = new PutObjectCommand({
        Bucket: BUCKET, 
        Key: key, 
        Body: buffer,
        ContentType: file.type
    })

    try {
        await s3.send(command)
        return {key}
    }catch(error) {
        console.log(error)
        return {error}
    }
}

export const uploadToGalleryS3 = async ({file, businessId}:{file: File, businessId: string}) => {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const key = `BusinessGallery/${businessId}/${uuid()}`
    const command = new PutObjectCommand({
        Bucket: BUCKET, 
        Key: key, 
        Body: buffer,
        ContentType: file.type,
    })

    try {
        await s3.send(command)
        return {key}
    }catch(error) {
        console.log(error)
        return {error}
    }
}