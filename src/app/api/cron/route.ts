import prisma from "@/lib/db";

export default async function handler(req, res){
  try {
    const now = new Date();

    const updatedReservations = await prisma.reservation.updateMany({
      where: {
        reservationEnd: { lt: now },
        status: { not: "completed" },
      },
      data: { status: "completed" },
    });

    return {
      success: true,
      updatedCount: updatedReservations.count,
    };
  } catch (e) {
    console.error(e);
    return { success: false, error: String(e) };
  }
};
