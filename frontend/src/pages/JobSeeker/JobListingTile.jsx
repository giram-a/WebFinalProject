import React from 'react'

const JobListingTile = ({setActiveJob, job, activeJob}) => {
    return (
        <div
            onClick={() => setActiveJob(job)}
            className={`md:w-auto xs:w-72 p-4 xs:pb-6 cursor-pointer border rounded-md ${activeJob.id === job.id ? 'border-black bg-slate-100 shadow-md' : 'border-gray-300'}`}
        >
            <div className='flex flex-nowrap gap-3 items-center'>
                <img src={job.companyImage} className='w-14 h-auto' alt="" />
                <div>
                    <h3 className="text-lg font-medium">{job.title}</h3>
                    <p className="text-sm">{job.company} - {job.location}</p>
                </div>
            </div>
        </div>
    )
}

export default JobListingTile
