import { UserButton } from '@clerk/clerk-react'
import React from 'react'

const Dashboard = () => {
  return (
    <div className='flex justify-between px-12 py-4'>
      Employer Dashboard
      <UserButton/>  
    </div>
  )
}

export default Dashboard
