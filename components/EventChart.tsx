import React from 'react'
import { ContentProps } from './DashboardContent'
import { AiOutlineBarChart } from 'react-icons/ai'
import EventAreaChart from './EventAreaChart'

const EventChart: React.FC<ContentProps> = ({title}) => {
  return (
    <div className="col-span-3 item-container">
        <div className="flex items-center">
            <div className="w-12 h-12 bg-gray-100 rounded-xl mr-4 relative"><AiOutlineBarChart className="text-3xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"/></div>
            <h2 className='font-bold text-gray-600'>{title}</h2>
        </div>
        <EventAreaChart/>
    </div>
  )
}

export default EventChart