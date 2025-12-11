import './App.css'
import { VirtualizedList } from './VirtualizedList'
import { VirtualizedListOptimised } from './VirtualizedListOptimised'

function App() {
  return (
    <div className='App'>
      <h2 className='font-bold text-xl m-2'>Virtualization with absolute positioning</h2>
      <VirtualizedList />
      <h2 className='font-bold text-xl m-2'>Virtualization with translating list container</h2>
      <VirtualizedListOptimised />
    </div>
  )
}

export default App
