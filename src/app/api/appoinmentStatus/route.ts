import prisma from "@/lib/db";

export async function GET() {
  try {
    const rawNow = new Date();
    const now = new Date(rawNow.getTime() + 2 * 60 * 60 * 1000); // +2h dla PL

    const result = await prisma.reservation.updateMany({
      where: {
        reservationEnd: { lte: now },
        status: "reserved",
      },
      data: { status: "finished" },
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Cron error:", error);
    return new Response("Error running cron", { status: 500 });
  }
}
