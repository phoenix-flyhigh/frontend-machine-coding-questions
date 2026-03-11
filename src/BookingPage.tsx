import { useCallback, useMemo, useState } from "react"
import { Seat } from "./Seat"

type SeatType = "Regular" | "Premium" | "VIP"

export enum SeatStatus {
    Booked = "booked",
    Available = "available"
}

interface IBookingPage {
    layout?: {
        rows: number,
        seatsPerRow: number,
        aislePosition: number
    },
    seatTypes?: Record<SeatType, { type: SeatType, price: string, rows: number[] }>,
    bookedSeats?: string[],
    title?: string,
    subTitle?: string,
    onBookingComplete?: (bookedseats: string[]) => void
}

export type TSeat = {
    id: string,
    row: number,
    col: number,
    type: string,
    price: string,
    color: string,
    status: SeatStatus,
    selected: boolean
}

export const BookingPage = ({
    layout = {
        rows: 8,
        seatsPerRow: 12,
        aislePosition: 5
    },
    seatTypes = {
        Regular: { type: "Regular", price: "150", rows: [1, 2, 3] },
        Premium: { type: "Premium", price: "250", rows: [4, 5, 6] },
        VIP: { type: "VIP", price: "350", rows: [7, 8] }
    },
    bookedSeats = ["A7"],
    title = "Booking",
    subTitle = "Select your seats",
    onBookingComplete = ([]) => { }
}: IBookingPage) => {

    const [selectedSeats, setSelectedSeats] = useState<TSeat[]>([])

    const getSeatColor: (seatType: SeatType) => string = (seatType: SeatType) => {
        if (seatType === "Premium") return "border-indigo-300 text-indigo-800 bg-indigo-100 hover:bg-indigo-200"
        if (seatType === "VIP") return "border-orange-300 text-orange-800 bg-orange-100 hover:bg-orange-200"
        return "border-blue-300 text-blue-800 bg-blue-100 hover:bg-blue-200"
    }

    const getSeatType: (rowNumber: number) => { type: SeatType, price: string, color: string } = useCallback((rowNumber: number) => {
        const seatMap: [string, {
            type: SeatType;
            price: string;
            rows: number[];
        }][] = Object.entries(seatTypes)

        const seatType = seatMap.find((type) => type[1].rows.includes(rowNumber))
        if (!seatType) {
            return { type: "Regular", price: "150", color: getSeatColor("Regular") }
        }
        return {
            type: seatType[1].type,
            price: seatType[1].price,
            color: getSeatColor(seatType[1].type)
        }
    }, [seatTypes])

    const initializeSeats = useMemo(() => {
        const seats = new Map()

        for (let row = 0; row < layout.rows; row++) {
            const seatTypeInfo = getSeatType(row + 1)
            for (let seat = 0; seat < layout.seatsPerRow; seat++) {
                const seatId = `${String.fromCharCode(65 + row)}${seat + 1}`
                seats.set(seatId, {
                    id: seatId,
                    row,
                    col: seat,
                    type: seatTypeInfo.type,
                    price: seatTypeInfo.price,
                    color: seatTypeInfo.color,
                    status: bookedSeats.includes(seatId) ? SeatStatus.Booked : SeatStatus.Available,
                    selected: false
                })
            }
        }
        return seats
    }, [layout, seatTypes, bookedSeats])

    const [seats, setSeats] = useState<Map<string, TSeat>>(initializeSeats)

    const handleSeatClick = (seatId: string) => {
        const clickedSeat = seats.get(seatId)

        if (!clickedSeat || clickedSeat.status === SeatStatus.Booked) return;

        const isCurrentlySelected = clickedSeat.selected

        setSeats(prev => prev.set(seatId, { ...clickedSeat, selected: !clickedSeat.selected }))

        if (isCurrentlySelected) {
            setSelectedSeats(prev => prev.filter(s => s.id !== clickedSeat.id))
        }
        else {
            setSelectedSeats(prev => [...prev, clickedSeat])
        }
    }

    const renderSeatSection = (seatRow: TSeat[], startIndex: number, endIndex: number) => {
        return (
            <div className="flex gap-2">
                {seatRow.slice(startIndex, endIndex).map((seat) => (
                    <Seat seat={seat} onClick={handleSeatClick} />
                ))}
            </div>
        )
    }

    const uniqueSeatTypes = useMemo(() => Object.entries(seatTypes).map(([_, config], index) => ({
        id: index,
        type: config.type,
        color: getSeatColor(config.type),
        price: config.price
    })), [seatTypes])

    const totalPrice = useMemo(() =>
        selectedSeats.reduce((acc, seat) => {
            acc += Number(seat.price)
            return acc
        }, 0)
        , [selectedSeats])

    const handleBooking = () => {
        setSeats(prev => {
            selectedSeats.forEach(seat => prev.set(seat.id, { ...seat, status: SeatStatus.Booked, selected: false }))
            return prev
        })
        onBookingComplete(selectedSeats.map(seat => seat.id))
        setSelectedSeats([])
    }

    return (
        <div className="flex flex-col items-center justify center w-full min-h-screen bg-gray-50 p-4">
            <h1 className="font-bold text-2xl mb-2">{title}</h1>
            <h1 className="text-md">{subTitle}</h1>
            <div className="w-[80%]">
                <div className="w-full h-4 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 shadow-inner mb-2 rounded-lg" />
                <p className="text-center text-md">SCREEN</p>
            </div>
            <div className="overflow-x-auto mb-6 flex flex-col gap-4">
                {Array.from({ length: layout.rows }).map((_, i) => i).map((row) => {
                    const rowId = String.fromCharCode(65 + row)
                    const seatsInRow: TSeat[] = Array.from({ length: layout.seatsPerRow }).map((_, colIdx) => {
                        const seatId = `${String.fromCharCode(65 + row)}${colIdx + 1}`
                        const seat = seats.get(seatId)
                        return seat as TSeat
                    })
                    return (
                        <div className="flex items-center gap-2">
                            <div>{rowId}</div>
                            {renderSeatSection(seatsInRow, 0, layout.aislePosition)}
                            <div className="w-8"></div>
                            {renderSeatSection(seatsInRow, layout.aislePosition + 1, layout.seatsPerRow)}
                        </div>
                    )
                })}
            </div>
            <div className="flex gap-6 items-center mb-6">
                {uniqueSeatTypes.map(seat => (
                    <div className="flex items-center gap-4">
                        <div className={`${seat.color} cursor-none w-6 h-6 rounded-md border-2`} />
                        <p>{seat.type}(₹{seat.price})</p>
                    </div>
                ))}
                <div className="flex items-center gap-4">
                    <div className={`border-green-300 text-green-800 bg-green-100 cursor-none w-6 h-6 rounded-md border-2`} />
                    <p>Selected</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className={`border-gray-300 text-gray-800 bg-gray-100 cursor-none w-6 h-6 rounded-md border-2`} />
                    <p>Booked</p>
                </div>
            </div>
            <div className="w-[80%] text-left">
                <h2 className="text-xl font-bold text-left">Booking Summary</h2>
                {selectedSeats.length === 0 ? <p>No seats selected</p> : (
                    <>
                        <p>Selected seats: {selectedSeats.map(seat => seat.id).join(",")}</p>
                        <p>Number of seats: {selectedSeats.length}</p>
                        <p>Total price : {totalPrice}</p>
                    </>
                )}

            </div>
            <button
                onClick={handleBooking}
                className={`p-2 my-4 rounded-lg w-[80%] ${selectedSeats.length > 0 ? "bg-green-500 text-white hover:bg-green-600" : "bg-gray-400 text-black cursor-not-allowed"}`}>
                {selectedSeats.length > 0 ? `Book ${selectedSeats.length} seats (₹${totalPrice})` : "Book seats"}
            </button>
        </div>
    )
}