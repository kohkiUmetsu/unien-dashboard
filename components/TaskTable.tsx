'use client';

import { useState, useRef, useEffect } from 'react';
import { Checkbox, Table, Button, Label, TextInput, ListGroup, Pagination, Modal } from 'flowbite-react';
import TaskInputBtn from './TaskInputBtn';
import { MdOutlineDeleteOutline } from 'react-icons/md'

const TaskTable = () => {

    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const todayDate = today.getFullYear() + '/'  + ('0' + (today.getMonth() + 1)).slice(-2) + '/'  + ('0' + today.getDate()).slice(-2)

    interface itemListType {
        value: string,
        id: number,
        date: string,
        check: boolean
    }

    const [open, setOpen] = useState<boolean>(false)
    const dropdownRef = useRef<HTMLDivElement | null>(null)
    const inputRef = useRef<HTMLInputElement | null>(null)
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [inputValue, setInputValue] = useState<string>('')
    const [itemList, setItemList] = useState<itemListType[]>([])
    const [countId, setCountId] = useState<number>(0)
    const [dateValue, setDateValue] = useState<string>(todayDate)
    const [originalItemList, setOriginalItemList] = useState<itemListType[]>([])

    useEffect (() => {
        setOriginalItemList(itemList)
    }, [itemList])

    const itemsPerPage = 6
    const totalPages = Math.ceil(itemList.length / itemsPerPage)

    const onPageChange = (page: number) =>  {
        setCurrentPage(page);
    }

    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = (startIndex + itemsPerPage)

    const displayItems = [...itemList].slice(startIndex, endIndex)

    const handleFilter = () => {
        setOpen(!open)
    }

    const handleFilterOut = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setOpen(false)
        }
    }

    useEffect (() => {
        document.addEventListener('mousedown', handleFilterOut)
        return () => {
            document.removeEventListener('mousedown', handleFilterOut)
        }
    })

    const handleDateChange = (date: Date) => {
        const d = date
        const formattedDate = d.getFullYear() + '/' + ('0' + (d.getMonth() + 1)).slice(-2) + '/' + ('0' + d.getDate()).slice(-2)
        setDateValue(formattedDate);
      }

    const handleToggleCheck = (id: number, currentCheck: boolean) => {
        setItemList((prevItemList) => {
            return prevItemList.map((prevItem) => {
                if (prevItem.id === id) {
                    const updatedItem = {...prevItem, check: !currentCheck}
                    return updatedItem
                }
                return prevItem
            })
        })
        console.log(itemList)
    }

    const handleClick = (dateValue: string) => {
        setCountId(prevCount => prevCount + 1)
        setItemList((prevItemList) => [...prevItemList, {value: inputValue, id: countId, date: dateValue, check: false}]
        .sort((a, b) => {
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();
    
            return dateA - dateB;
        }))
        setInputValue('')
    }

    const handleDelete = (id: number) => {
        const updatedItemList = itemList.filter(item => item.id !== id)
        setItemList(updatedItemList)
    }

    const handleSearch = () => {
        const inputValue = inputRef.current?.value || '';
        setItemList(originalItemList.filter((item) => item.value.toLowerCase().includes(inputValue)))
    }

    const titleColor = (currentDate: string) => {
        return currentDate === todayDate ? "text-cyan-700" : currentDate < todayDate ? "text-red-500" : null
    }

    const scheduleColor = (currentDate: string) => {
        return currentDate === todayDate ? "text-cyan-600" : currentDate < todayDate ? "text-red-400" : null
    }

    const handleChecked = () => {
        const checkedItemList = [...itemList]
        checkedItemList.sort((a, b) => {
            if (a.check && !b.check) {
                return -1
            } else if (!a.check && b.check) {
                return 1
            } else {
                return 0
            }
        })
        setItemList(checkedItemList)
    }

    const handleUnchecked = () => {
        const uncheckedItemList = [...itemList]
        uncheckedItemList.sort((a, b) => {
            if (!a.check && b.check) {
                return -1
            } else if (a.check && !b.check) {
                return 1
            } else {
                return 0
            }
        })
        setItemList(uncheckedItemList)
    }

    const handleDate = () => {
        const dateItemList = [...itemList]
        dateItemList.sort((a, b) => {
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();

            return dateA - dateB;
        })
        setItemList(dateItemList)
    }

  return (
    
    <div className="">
       <form action="">
           <div className="flex mt-4">
            <TaskInputBtn
             inputValue={inputValue}
             setInputValue={setInputValue}
             handleClick={() => handleClick(dateValue)}
             handleDateChange={handleDateChange}
            />
            <div className="relative ml-2" ref={dropdownRef}>
                <Button color="gray" pill onClick={handleFilter}>並べ替え</Button>
                {open &&
                    <ListGroup className='absolute z-50 top-12'>
                        <ListGroup.Item onClick={handleChecked}>達成済み</ListGroup.Item>
                        <ListGroup.Item onClick={handleUnchecked}>未達成</ListGroup.Item>
                        <ListGroup.Item onClick={handleDate}>期限順</ListGroup.Item>
                    </ListGroup>
                }
            </div>
            <div className="mb-2 block"><Label color="gray" htmlFor="input-gray"/></div>
            <TextInput color="gray" id="input-gray" placeholder="検索" required className='w-48 ml-auto' ref={inputRef} onChange={() => handleSearch()}/>
           </div>
            <Table hoverable className='mt-2'>
                <Table.Head>
                    <Table.HeadCell className="p-4">
                        </Table.HeadCell>
                        <Table.HeadCell className='px-0 w-1/2'>タイトル</Table.HeadCell>
                        <Table.HeadCell>期限</Table.HeadCell>
                    <Table.HeadCell className='px-3'>
                    <span className="sr-only">Edit</span>
                    </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {displayItems.map((item: itemListType ) => (
                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={item.id}>
                            <Table.Cell className="p-4">
                                <Checkbox onChange={() => handleToggleCheck(item.id, item.check)} checked={item.check} />
                            </Table.Cell>
                            <Table.Cell className={`whitespace-nowrap font-medium text-gray-900 dark:text-white px-0 max-w-xs truncate ${titleColor(item.date)}`}>{item.value}</Table.Cell>
                            <Table.Cell className={`${scheduleColor(item.date)}`}>{item.date}</Table.Cell>
                            <Table.Cell className='px-3'>
                                <Button color="gray" pill size="sm" onClick={() => handleDelete(item.id)} ><MdOutlineDeleteOutline /></Button>
                            </Table.Cell>
                        </Table.Row>
                    ))}
           
                </Table.Body>
            </Table>
            {displayItems.length === 0 ?
                <div className="text-center my-4 text-gray-500 text-sm">タスクは全て完了しています</div> : null
            }
            {itemList.length > itemsPerPage ?
                <div className="flex sm:justify-center overflow-x-auto">
                    <Pagination
                        layout="pagination"
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={onPageChange}
                        previousLabel=""
                        nextLabel=""
                        showIcons
                    />
                </div> : null
            }
       </form>
    </div>
  )
}

export default TaskTable