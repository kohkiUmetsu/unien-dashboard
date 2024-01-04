import React from 'react'
import { ContentProps } from './DashboardContent'
import { IoTodayOutline } from 'react-icons/io5'
import EventTimeline from './EventTimeline'

const Event: React.FC<ContentProps> = ({title}) => {
  return (
    <div className="col-span-4 item-container h-fit">
        <div className="flex items-center">
            <div className="w-12 h-12 bg-gray-100 rounded-xl mr-4 relative"><IoTodayOutline className="text-3xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"/></div>
            <h2 className='font-bold text-gray-600'>{title}</h2>
        </div>
        <EventTimeline />
    </div>
  )
}

export default Event