import React from 'react'
import { ContentProps } from './DashboardContent'
import { LiaTasksSolid } from 'react-icons/lia'
import TaskTable from './TaskTable'

const Task: React.FC<ContentProps> = ({title}) => {
  return (
    <div className="col-span-4 item-container h-fit">
        <div className="flex items-center">
            <div className="w-12 h-12 bg-gray-100 rounded-xl mr-4 relative"><LiaTasksSolid className="text-3xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"/></div>
            <h2 className='font-bold text-gray-600'>{title}</h2>
        </div>
        <TaskTable />
    </div>
  )
}

export default Task