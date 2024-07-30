import { useState } from "react"

interface IHistoryItem {
    operatingValue: number;
    fromValue: number;
    toValue: number;
}

export const Counter = () => {
    const [counter, setCounter] = useState(0);
    const [history, setHistory] = useState<IHistoryItem[]>([]);
    const [unDoneActions, setUnDoneActions] = useState<IHistoryItem[]>([]);

    const addActionToHistory = (action: IHistoryItem) => {
        if(history.length === 50){
            setHistory(prev => [action, ...prev.slice(0, -1)])
        }
        else {
            setHistory(prev => [action, ...prev])
        }
    }

    const handleClick = (value: number) => {
        const fromValue = counter
        const toValue = counter + value
        setCounter(toValue)
        const newHistoryItem = {operatingValue: value, fromValue, toValue}
        addActionToHistory(newHistoryItem)
    }

    const handleUndo = () => {
        const undoAction = history[0]
        setHistory(prev => prev.slice(1))
        setCounter(prev => prev - undoAction.operatingValue)
        setUnDoneActions(prev => [...prev, undoAction])
    }

    const handleRedo = () => {
        const redoAction = unDoneActions.slice(-1)[0]
        setCounter(prev => prev + redoAction.operatingValue)
        setUnDoneActions(prev => prev.slice(0, -1))
        addActionToHistory(redoAction)
    }

    return (
        <div className="w-2/5 flex flex-col items-center gap-12">
            <h1 className="text-2xl font-bold m-4">Undoable counter</h1>
            <div className="flex gap-6 items-center">
                <button onClick={handleUndo} disabled={history.length === 0}>Undo</button>
                <button onClick={handleRedo} disabled={unDoneActions.length === 0}>Redo</button>
            </div>
            <div className="flex gap-12 items-center">
                <div className="flex gap-3 items-center">
                    <button onClick={() => handleClick(-100)}>-100</button>
                    <button onClick={() => handleClick(-10)}>-10</button>
                    <button onClick={() => handleClick(-1)}>-1</button>
                </div>
                <p className="text-xl font-semibold">{counter}</p>
                <div className="flex gap-6 items-center">
                    <button onClick={() => handleClick(1)}>+1</button>
                    <button onClick={() => handleClick(10)}>+10</button>
                    <button onClick={() => handleClick(100)}>+100</button>
                </div>
            </div>
            <div className="flex flex-col gap-4 items-center">
                <p className="text-md">History</p>
                <div className="w-80 h-56 overflow-scroll border-2 p-4 pr-8 flex flex-col gap-2">
                    {history.map(({operatingValue, fromValue, toValue} , i) => (
                        <div key={i} className="flex justify-evenly"> 
                            <p> {operatingValue > 0 ? `+${operatingValue}` : operatingValue}</p>
                            <p >{`${fromValue} -> ${toValue}`}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}