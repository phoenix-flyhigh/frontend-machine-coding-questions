import { useEffect, useRef, useState } from "react";

function App() {
  const data = [...Array(100)].map((_, i) => i + 1);
  const [page, setPage] = useState(1);
  const sentinel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prev) => prev + 1);
      }
    });
    const element = sentinel.current;
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return (
    <div className="bg-black text-white h-screen w-full flex justify-center items-center">
      <div className="w-64 border-white border-2 rounded-2xl h-80 overflow-scroll">
        {data.slice(0, page * 10).map((x) => (
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
