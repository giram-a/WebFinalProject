import { Separator } from '@/components/ui/separator'
import React from 'react'

const JobDescriptionTile = ({activeJob}) => {
    return (
        <>
            <h2 className="text-2xl font-semibold mb-4">{activeJob.jobTitle}</h2>
            <p className="text-lg font-medium text-gray-700">{activeJob.companyName}</p>
            <p className="text-sm text-gray-500 mb-4">{activeJob.location}</p>
            <p className="text-gray-800">{activeJob.description}</p>
            <Separator className="my-3" />
            <p>Salary {activeJob.salary}</p>
            <Separator className="my-3" />
            <div>
                <p>Require Skills:</p>
                <div className='flex flex-wrap gap-4 mt-2'>
                    {activeJob.skills}
                </div>
            </div>
            <Separator className="my-3" />
            <div className='flex flex-wrap justify-between'>
                <h4>Apply Link: <a className='hover:text-blue-300 underline' href={activeJob.applyLink} target='_blank'>{activeJob.applyLink}</a></h4>
                <p className='italic text-slate-500'>last updated: {activeJob.updatedAt}</p>
            </div>
        </>
    )
}

export default JobDescriptionTile
