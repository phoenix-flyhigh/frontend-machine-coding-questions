export const NonVirtualizedList = () => {
    const items = Array.from({ length: 1000 }, (_, index) => `Item ${index + 1}`)

    return (
        <div style={{ height: '400px', overflowY: 'auto', border: '1px solid black' , width: '800px', margin: '0 auto' }}>
            <ul style={{ margin: 0, padding: 0 }}>
                {items.map((item, index) => (
                    <li key={index} style={{ padding: '8px', borderBottom: '1px solid #ccc' }}>
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    )
}