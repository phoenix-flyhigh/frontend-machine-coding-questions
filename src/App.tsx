import { useEffect, useState } from "react";
import "./App.css";

interface JobPosting {
  by: string;
  id: number;
  time: number;
  title: string;
  url: string;
}

const JobTile = ({ job }: { job: JobPosting }) => {
  const { by, time, title, url } = job;
  return (
    <div className="bg-white p-4 rounded-md w-full flex flex-col gap-4">
      {url !== "" ? (
        <a
          href={url}
          target="_blank"
          rel="noopener"
          className="text-lg font-bold"
        >
          {title}
        </a>
      ) : (
        <p className="text-lg font-bold">{title}</p>
      )}
      <p className="text-md">
        By {by} . {new Date(time * 1000).toLocaleString()}
      </p>
    </div>
  );
};

const JobBoard = () => {
  const API_ENDPOINT = "https://hacker-news.firebaseio.com/v0";
  const JOBS_PER_PAGE = 6;

  const [jobIds, setJobIds] = useState<string[]>([]);
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [fetchingData, setFetchingData] = useState(false);

  const fetchItems = async (page: number) => {
    setCurrentPage(page);
    setFetchingData(true);

    let jobIdList = jobIds;
    if (jobIdList.length < 1) {
      const res = await fetch(`${API_ENDPOINT}/jobstories.json`);
      const data = await res.json();
      jobIdList = data;
      setJobIds(data);
    }
    const jobIdsPerPage = jobIdList.slice(
      (page - 1) * JOBS_PER_PAGE,
      (page - 1) * JOBS_PER_PAGE + JOBS_PER_PAGE
    );

    const jobPostings: JobPosting[] = await Promise.all(
      jobIdsPerPage.map((id) =>
        fetch(`${API_ENDPOINT}/item/${id}.json`).then((res) => res.json())
      )
    );

    setJobs((prev) => [...prev, ...jobPostings]);
    setFetchingData(false);
  };

  useEffect(() => {
    fetchItems(currentPage);
  }, []);

  return (
    <div className="flex flex-col gap-6 items-start p-4">
      <h1 className="text-3xl font-bold text-orange-500 mb-6">
        Hacker News Jobs Board
      </h1>
      {jobs.length > 0 ? (
        jobs.map((job) => <JobTile job={job} key={job.id} />)
      ) : (
        <p>Loading...</p>
      )}
      <button
        disabled={fetchingData}
        className="bg-orange-500 py-2 px-4 rounded-md text-white hover:bg-orange-400 cursor-pointer disabled:bg-gray-500"
        onClick={() => fetchItems(currentPage + 1)}
      >
        {fetchingData ? "Loading..." : "Load more jobs"}
      </button>
    </div>
  );
};

function App() {
  return (
    <div className="bg-gray-200 min-h-screen w-full flex justify-center items-center">
      <JobBoard />
    </div>
  );
}

export default App;
