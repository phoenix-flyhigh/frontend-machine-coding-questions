import { useState } from "react"

export const VirtualizedListOptimised = () => {
    const items = Array.from({ length: 1000 }, (_, index) => `List item ${index + 1}`)
    const itemHeight = 36 // Height of each item in pixels
    const containerHeight = 400 // Height of the container in pixels
    const [scrollTop, setScrollTop] = useState(0)
    const overscan = 5

    const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan)
    const renderedNodesCount = Math.min(items.length - startIndex, Math.ceil(containerHeight / itemHeight) + overscan * 2)

    const visibleItems = items.slice(startIndex, startIndex + renderedNodesCount)
    const totalHeight = items.length * itemHeight

    return (
        <div
            style={{
                height: `${containerHeight}px`,
                overflowY: 'auto',
                border: '1px solid black',
                width: '800px',
                margin: '0 auto',
            }}
            onScroll={(e) => {
                setScrollTop(e.currentTarget.scrollTop)
            }}>
            <div style={{ transform: `translateY(${startIndex * itemHeight}px)` }}>
                <ul
                    style={{
                        height: `${totalHeight}px`,
                    }}
                >
                    {visibleItems.map((item, index) => (
                        <li key={startIndex + index} style={{
                            borderBottom: '1px solid #ccc',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: `${itemHeight}px`,
                            boxSizing: 'border-box',
                            width: '100%'
                        }}
                        >
                            {item}
                        </li>
                    ))}
                </ul >
            </div>
        </div >
    )
}


