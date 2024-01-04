import React from 'react'
import { ContentProps } from './DashboardContent'
import { BsCurrencyDollar } from 'react-icons/bs'
import FeeContent from './FeeContent'

const Fee: React.FC<ContentProps> = ({title}) => {
  return (
    <div className="col-span-2 item-container">
        <div className="flex items-center">
            <div className="w-12 h-12 bg-gray-100 rounded-xl mr-4 relative"><BsCurrencyDollar className="text-3xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" /></div>
            <h2 className='font-bold text-gray-600'>{title}</h2>
        </div>
        <FeeContent/>
    </div>
  )
}

export default Fee