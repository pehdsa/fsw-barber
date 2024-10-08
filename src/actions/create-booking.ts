"use server"

import { db } from "@/lib/prisma"

interface CreateBookingParams {
    serviceId: string
    userId: string
    date: Date
}

export const createBooking = async (params: CreateBookingParams) => {
    await db.booking.create({
        data: params,
    })
}
