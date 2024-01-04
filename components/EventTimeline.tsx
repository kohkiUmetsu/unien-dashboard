import React from 'react'
import { useState, useRef, useEffect } from 'react';
import { Button, Label, TextInput, ListGroup, Timeline, Modal } from 'flowbite-react';
import TaskInputBtn from './TaskInputBtn';
import { MdOutlineDeleteOutline } from 'react-icons/md'
import { HiArrowNarrowRight, HiCalendar } from 'react-icons/hi';
import EventInputBtn from "./EventInputBtn"

const EventTimeline = () => {

    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const todayDate = today.getFullYear() + '/' + ('0' + (today.getMonth() + 1)).slice(-2) + '/' + ('0' + today.getDate()).slice(-2)

    interface eventListType {
        event: string,
        explanation: string,
        fee: string,
        people: string,
        place: string,
        id: number,
        date: string,
    }

    const [open, setOpen] = useState<boolean>(false)
    const dropdownRef = useRef<HTMLDivElement | null>(null)
    const inputRef = useRef<HTMLInputElement | null>(null)
    const [inputEvent, setInputEvent] = useState<string>('')
    const [inputExplanation, setInputExplanation] = useState<string>('')
    const [inputPeople, setInputPeople] = useState<string>('')
    const [inputFee, setInputFee] = useState<string>('')
    const [inputPlace, setInputPlace] = useState<string>('')
    const [countId, setCountId] = useState<number>(0)
    const [dateValue, setDateValue] = useState<string>(todayDate)
    const [eventList, setEventList] = useState<eventListType[]>([])
    const [originalEventList, setOriginalEventList] = useState<eventListType[]>([])

    useEffect (() => {
        setOriginalEventList(eventList)
    }, [eventList])

    const handleClick = (dateValue: string) => {
        setCountId(prevCount => prevCount + 1)
        setEventList((prevItemList) => [...prevItemList, {event: inputEvent, explanation: inputExplanation, people: inputPeople, fee: inputFee, place: inputPlace, id: countId, date: dateValue}])
        setInputEvent('')
        setInputExplanation('')
        setInputPeople('')
        setInputFee('')
        setInputPlace('')
    }

    const handleSearch = () => {
        const inputValue = inputRef.current?.value || '';
        setEventList(originalEventList.filter((item) => item.event.toLowerCase().includes(inputValue)))
    }

    const handleDateChange = (date: Date) => {
        const d = date
        const formattedDate = d.getFullYear() + '/' + ('0' + (d.getMonth() + 1)).slice(-2) + '/' + ('0' + d.getDate()).slice(-2)
        setDateValue(formattedDate);
      }

    const handleDelete = (id: number) => {
        const updatedEventList = eventList.filter(item => item.id !== id)
        setEventList(updatedEventList)
      }

    const sortedEventList = [...eventList]
    .filter(item => new Date(item.date).getTime() >= today.getTime())
    .sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();

        return dateA - dateB;
    });

    const dateColor = (currentDate: string) => {
        const host = new Date(currentDate)
        const hostDate = host.getFullYear() + '/' + ('0' + (host.getMonth() + 1)).slice(-2) + '/' + ('0' + host.getDate()).slice(-2)
        return hostDate === todayDate && "text-cyan-600"
    }

    const eventColor = (currentDate: string) => {
        const host = new Date(currentDate)
        const hostDate = host.getFullYear() + '/' + ('0' + (host.getMonth() + 1)).slice(-2) + '/' + ('0' + host.getDate()).slice(-2)
        return hostDate === todayDate ? "text-cyan-700" : "text-gray-700"
    }

  return (
    <div className="">
       <form action="">
           <div className="flex mt-4">
            <EventInputBtn
            inputEvent={inputEvent}
            setInputEvent={setInputEvent}
            inputPeople={inputPeople}
            setInputPeople={setInputPeople}
            inputFee={inputFee}
            setInputFee={setInputFee}
            inputExplanation={inputExplanation}
            setInputExplanation={setInputExplanation}
            inputPlace={inputPlace}
            setInputPlace={setInputPlace}
            handleClick={() => handleClick(dateValue)}
            handleDateChange={handleDateChange}
            />
            {/* <div className="relative ml-2" ref={dropdownRef}>
                <Button color="gray" pill onClick={handleFilter}>フィルター</Button>
                {open &&
                    <ListGroup className='absolute z-50 top-12'>
                        <ListGroup.Item>達成済み</ListGroup.Item>
                        <ListGroup.Item>未達成</ListGroup.Item>
                        <ListGroup.Item>期限切れ</ListGroup.Item>
                    </ListGroup>
                }
            </div> */}

            <div className="mb-2 block"><Label color="gray" htmlFor="input-gray"/></div>
            <TextInput color="gray" id="input-gray" placeholder="検索" required className='w-48 ml-auto' ref={inputRef} onChange={() => handleSearch()}/>
           </div>

           <div className="p-4">
                {eventList.length === 0 ?
                    <div className="text-center mt-2 text-gray-500 text-sm">イベントを入力してください</div> : null
                }
               <Timeline>
                {sortedEventList.map((item) => (
                    <Timeline.Item key={item.id} className=''>
                        <Timeline.Point icon={HiCalendar} className='' />
                        <Timeline.Content className='relative'>
                            <Button color="gray" pill size="sm" onClick={() => handleDelete(item.id)} className='absolute right-0 top-0' ><MdOutlineDeleteOutline /></Button>
                            <Timeline.Time className={`flex ${dateColor(item.date)}`}>{item.date}</Timeline.Time>
                            <Timeline.Title className={`text-base mr-16 ${eventColor(item.date)}`}>{item.event}</Timeline.Title>
                            <Timeline.Body className='text-sm'>
                                {item.explanation &&
                                    <div className="text-gray-600">{item.explanation}</div>
                                }
                                <div className="mt-1">
                                    {item.people &&
                                        <div className="">人数: <span>{item.people}</span></div>
                                    }
                                    {item.fee &&
                                        <div className="">参加費用: <span>{item.fee}</span></div>
                                    }
                                    {item.place &&
                                        <div className="">場所: <span>{item.place}</span></div>
                                    }
                                </div>
                            </Timeline.Body>
                        </Timeline.Content>
                    </Timeline.Item>
                ))
                }
               
               </Timeline>
           </div>
       </form>
    </div>
  )
}

export default EventTimeline