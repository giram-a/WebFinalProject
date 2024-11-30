import { Building2 } from 'lucide-react'
import React from 'react'

const JobListingTile = ({ setActiveJob, job, activeJob }) => {
    return (
        <div
            onClick={() => setActiveJob(job)}
            className={`md:w-auto xs:w-72 p-4 xs:pb-6 cursor-pointer border rounded-md ${activeJob === job ? 'border-black bg-slate-100 shadow-md' : 'border-gray-300'}`}
        >
            <div className='flex flex-nowrap gap-3 items-center'>
                {job.companyImage ? <img src={job.companyImage} className='w-14 h-auto' alt="" /> : <Building2/>}
                <div>
                    <h3 className="text-lg font-medium">{job.jobTitle}</h3>
                    <p className="text-sm">{job.companyName} - {job.location || "Remote"}</p>
                </div>
            </div>
        </div>
    )
}

export default JobListingTile
