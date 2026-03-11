import React, { memo, useCallback } from "react"
import { SeatStatus, TSeat } from "./BookingPage"

interface SeatProps {
    seat: TSeat,
    onClick: (seatId: string) => void
}

export const Seat = memo(({ seat, onClick }: SeatProps) => {
    const getSeatClassname = useCallback((seat: TSeat) => {
        const baseClass = "border-2 rounded-t-lg w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-center flex items-center justify-center transition-all"
        if (seat.status === SeatStatus.Booked) {
            return `${baseClass} border-gray-300 text-gray-800 bg-gray-400 cursor-not-allowed`
        }
        if (seat.selected) {
            return `${baseClass} border-green-300 text-green-800 bg-green-300 hover:bg-green-500 scale-110`
        }

        return `${baseClass} ${seat.color}`
    }, [])

    return (
        <div
            key={seat.id}
            className={getSeatClassname(seat)}
            title={`${seat.id}-${seat.type}-₹${seat.price}`}
            onClick={() => onClick(seat.id)}
        >{seat.col + 1}</div>
    )
}, (prevProps, currentProps) => {
    return prevProps.seat.selected === currentProps.seat.selected && prevProps.seat.status === currentProps.seat.status
})