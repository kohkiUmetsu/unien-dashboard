import React from 'react'
import Fee from './Fee'
import MemberChart from './MemberChart'
import EventChart from './EventChart'
import Task from './Task'
import Event from './Event'

export interface ContentProps {
    title: String
}

const DashboardContent = () => {
  return (
    <div className='grid grid-cols-8 gap-8 mt-12'>
        <Fee 
        title="総サークル費用"
        />
        <EventChart
        title="サークル人数に対するイベント参加率"
        />
        <MemberChart 
        title="入サー数遷移"
        />
        <Task
        title="タスク"
        />
        <Event
        title="イベントスケジュール"
        />
    </div>
  )
}

export default DashboardContent