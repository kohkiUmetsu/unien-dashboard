"use client"
import { useState } from 'react';
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import EventEditBtn from './EventEditBtn';

interface eventDataType {
    date: string
    参加予定人数: number
    参加した人数: number
}

const EventAreaChart = () => {

    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const todayDate = today.getFullYear() + '/' + ('0' + (today.getMonth() + 1)).slice(-2) + '/' + ('0' + today.getDate()).slice(-2)

    // const memberData: eventDataType[] = [
    //     {year: 2015, 参加予定人数: 40, 参加した人数: 37},
    //     {year: 2016, 参加予定人数: 52, 参加した人数: 37},
    //     {year: 2017, 参加予定人数: 67, 参加した人数: 49},
    //     {year: 2018, 参加予定人数: 32, 参加した人数: 12},
    //     {year: 2019, 参加予定人数: 46, 参加した人数: 46},
    //     {year: 2020, 参加予定人数: 74, 参加した人数: 23},
    //     {year: 2021, 参加予定人数: 32, 参加した人数: 2},
    //     {year: 2022, 参加予定人数: 12, 参加した人数: 6},
    //     {year: 2023, 参加予定人数: 50, 参加した人数: 48},
    // ]

    const [selectExpectedNum, setSelectExpectedNum] = useState<number>(0)
    const [selectActualNum, setSelectActualNum] = useState<number>(0)
    const [dateValue, setDateValue] = useState<string>(todayDate)
    const [eventData, setEventData] = useState<eventDataType[]>([])

    const handleClick = (dateValue: string) => {
        const existingEventIndex = eventData.findIndex(item => item.date === dateValue)

        if (existingEventIndex !== -1) {
            const updatedEventData = [...eventData]
            updatedEventData.splice(existingEventIndex, 1)
            setEventData(updatedEventData)
        }

        setEventData((prevMemberList) => [...prevMemberList, {date: dateValue, 参加予定人数: selectExpectedNum, 参加した人数: selectActualNum}])
    }

    const handleDateChange = (date: Date) => {
        const d = date
        const formattedDate = d.getFullYear() + '/' + ('0' + (d.getMonth() + 1)).slice(-2) + '/' + ('0' + d.getDate()).slice(-2)
        setDateValue(formattedDate);
      }

    const sortedEventData = eventData.sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();

        return dateA - dateB;
    })

  return (
    <div className="">
        <EventEditBtn
                selectExpectedNum={selectExpectedNum}
                setSelectExpectedNum={setSelectExpectedNum}
                selectActualNum={selectActualNum}
                setSelectActualNum={setSelectActualNum}
                handleDateChange={handleDateChange}
                handleClick={() => handleClick(dateValue)}
            />
        <div className="overflow-x-scroll overflow-y-visible hidden-scrollbar">
            <AreaChart
            width={500 + sortedEventData.length * 60}
            height={200}
            data={sortedEventData}
            margin={{top: 12, right: 48, left: 0, bottom: 0,}}
            >
                <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0e7490" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#0e7490" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="5 2" />
                <XAxis
                dataKey="date"
                interval={0}
                dy={5}
                tick={{
                    fontSize: 14,
                    fill: '#6b7280',
                }}
                />
                <YAxis
                dataKey="参加予定人数"
                interval={0}
                tick={{
                    fontSize: 14,
                    fill: '#6b7280',
                }}
                />
                <Legend />
                <Tooltip />
                <Area type="monotone" dataKey="参加予定人数" stroke="#0e7490" fillOpacity={1} fill="url(#colorUv)" />
                <Area type="monotone" dataKey="参加した人数" stroke="#f97316" fillOpacity={1} fill="url(#colorPv)" />
            </AreaChart>
        </div>
    </div>
  )
}

export default EventAreaChart