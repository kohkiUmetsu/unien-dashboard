"use client"
import { useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import MemberEditBtn from './MemberEditBtn';

interface memberDataType {
    year: number
    入サー人数: number
}

const MemberLineChart = () => {

    // const memberData: memberDataType[] = [
    //     {year: 2015, 入サー人数: 40},
    //     {year: 2016, 入サー人数: 52},
    //     {year: 2017, 入サー人数: 67},
    //     {year: 2018, 入サー人数: 32},
    //     {year: 2019, 入サー人数: 46},
    //     {year: 2020, 入サー人数: 74},
    //     {year: 2021, 入サー人数: 32},
    //     {year: 2022, 入サー人数: 12},
    //     {year: 2023, 入サー人数: 50},
    // ]

    const [selectYear, setSelectYear] = useState<number>(2015)
    const [selectPeople, setSelectPeople] = useState<number>(0)
    const [memberData, setMemberData] = useState<memberDataType[]>([])

    const handleClick = () => {
        const existingMemberIndex = memberData.findIndex(item => item.year === selectYear)

        if (existingMemberIndex !== -1) {
            const updatedMemberData = [...memberData]
            updatedMemberData.splice(existingMemberIndex, 1)
            setMemberData(updatedMemberData)
        }
        
        setMemberData((prevMemberList) => [...prevMemberList, {year: selectYear, 入サー人数: selectPeople}])
    }

    const sortedMemberData = memberData.sort((a, b) => {
        return a.year - b.year
    })

  return (
    <div className="">
        <MemberEditBtn
            selectYear={selectYear}
            setSelectYear={setSelectYear}
            handleClick={handleClick}
            selectPeople={selectPeople}
            setSelectPeople={setSelectPeople}
        />
        <div className="overflow-x-scroll overflow-y-visible hidden-scrollbar">
            <LineChart
            width={500}
            height={200}
            data={sortedMemberData}
            margin={{top: 12, right: 48, left: 0, bottom: 0,}}
            >
            <CartesianGrid strokeDasharray="5 2" />
            <XAxis
            dataKey="year"
            interval={0}
            dy={5}
            tick={{
                fontSize: 14,
                fill: '#6b7280',
              }}
            />
            <YAxis
            dataKey="入サー人数"
            interval={0}
            tick={{
                fontSize: 14,
                fill: '#6b7280',
              }}
            />
            <Line type="monotone" dataKey="入サー人数" stroke="#0891b2" />
            <Legend
        
            />
            <Tooltip />
            </LineChart>
        </div>
    </div>
  )
}

export default MemberLineChart