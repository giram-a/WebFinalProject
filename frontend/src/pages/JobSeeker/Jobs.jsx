import React, { useState, useCallback, useEffect } from 'react'
import JobListingTile from './JobListingTile';
import JobDescriptionTile from './JobDescriptionTile';
import { useAuth } from '@clerk/clerk-react';
import { getAllJobs } from '@/api/jobsApi';
import { CircleArrowUp } from 'lucide-react';
import Gemini from './Gemini';

const JobsListing = () => {
  const { getToken } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [activeJob, setActiveJob] = useState(null);

  useEffect(() => {
    (async () => {
      let token = await getToken();
      const res = await getAllJobs(token);
      if (res.status) {
        setJobs(res.data.data);
      } else {
        console.log("Something went wrong");
      }
    })();
  }, []);

  useEffect(() => {
    if (jobs.length > 0) {
      setActiveJob(jobs[0]);
    }
  }, [jobs]);

  const handleSetActiveJob = useCallback((job) => {
    setActiveJob(job);
  }, [activeJob]);

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="md:w-[25%] p-4 border m-4 rounded-md md:fixed h-[90%] md:h-[89%] xs:h-56 overflow-x-auto md:overflow-auto flex md:flex-col space-x-4 md:space-x-0 md:space-y-4 scrollbar-hidden">
        <div className="flex flex-nowrap md:flex-col space-x-4 md:space-x-0 md:space-y-4">
          {
            jobs.length > 0 ?
              jobs.map((job) => (
                <JobListingTile key={job._id} job={job} setActiveJob={handleSetActiveJob} activeJob={activeJob} />
              )) :
              <p>
                No Jobs Available
              </p>
          }
        </div>
      </div>
      <div className="md:w-[47%] w-full md:ml-[27%] bg-white p-6 overflow-y-auto">
        {
          activeJob ?
            <JobDescriptionTile activeJob={activeJob} />
            : <p className='flex h-full justify-center items-center'>No Jobs Available</p>
        }
      </div>
      <div className='md:w-[25%] border rounded-md right-0 mt-4 fixed md:block xs:hidden flex flex-col h-full'>

        <div className="flex-1 overflow-y-auto mb-4 h-[83%] scrollbar-hidden p-4">

          <Gemini/>
        </div>

        <div className="bottom-0 fixed m-4 w-full">
          <div className="flex items-center gap-2 w-[22%]">
            <input
              type="text"
              className="p-2 border rounded-md w-full"
              placeholder="Type a message..."
            />
            <button className="w-auto">
              <CircleArrowUp />
            </button>
          </div>
        </div>


      </div>
    </div>
  );
}

export default JobsListing
