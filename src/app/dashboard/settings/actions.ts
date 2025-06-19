'use server'
import { businessAuth } from "@/lib/auth";
import prisma from "@/lib/db"

export const DeleteGalleryImage = async (photoId: string) => {
    try {
        const business = await businessAuth()
        if (!business.success) {
            return { success: false, message: "No-authenticated user" }
        }

        const deleteImage = await prisma.image.delete({
            where: {
                id: photoId
            }
        })

        if (!deleteImage) {
            return { success: false, message: "There was a problem deleting your image" }
        }

        return { success: true, message: "Image deleted successfully" }

    } catch (error) {
        return { success: false, message: "There was a problem deleting your image" }
    }
}
