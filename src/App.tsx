import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [data, setData] = useState<number[]>([])
  const [page, setPage] = useState(1);

  const observer = useRef<IntersectionObserver>();
  const sentinel = useCallback((node: HTMLDivElement) => {
  if (observer.current) observer.current.disconnect();

  observer.current = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      setPage((prev) => prev + 1);
    }
  });
  if (node) {
    observer.current.observe(node);
  }
}, []);

useEffect(() => {
  const baseNumber = (page - 1) * 10  // ex: start from 0 for page 1, start from 10 for page 2 ...
  const newData = [...Array(10)].map((_, i) => baseNumber + i + 1) // Generate next 10 numbers 
  setData(prev => [...prev, ...newData])
}, [page] )

  return (
    <div className="bg-black text-white h-screen w-full flex justify-center items-center">
      <div className="w-64 border-white border-2 rounded-2xl h-80 overflow-scroll">
        {data.map((x) => (
          <div className="px-4 py-2" key={x}>
            {x}
          </div>
        ))}
        {page !== 10 && <div ref={sentinel}>Loading...</div>}
      </div>
    </div>
  );
}

export default App;
