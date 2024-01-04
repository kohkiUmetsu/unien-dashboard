'use client';

import { Button, Modal, Label, TextInput, Select, Datepicker } from 'flowbite-react';
import { useState, useEffect } from 'react';
import { AiOutlinePlus } from 'react-icons/ai'

interface eventEditBtnProps {
    selectExpectedNum: number
    setSelectExpectedNum: React.Dispatch<React.SetStateAction<number>>
    selectActualNum: number
    setSelectActualNum: React.Dispatch<React.SetStateAction<number>>
    handleClick: () => void
    handleDateChange: (date: Date) => void
}

const EventEditBtn: React.FC<eventEditBtnProps> = ({selectExpectedNum, setSelectExpectedNum, selectActualNum, setSelectActualNum, handleClick, handleDateChange}) => {
    
    const [openModal, setOpenModal] = useState<boolean>(false);

    const selectNum = Array.from({length: 300}, (_, index) => (1 + index))

  return (
    <>
      {/* <Button onClick={() => setOpenModal(true)} pill className='relative p-2 ml-auto' color='gray'><AiOutlinePlus className='text-xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' /></Button> */}
      <Button onClick={() => setOpenModal(true)} pill className='ml-auto py-1.5' color='gray' size="xs"><AiOutlinePlus className='text-xl' /></Button>
      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>人数追加・変更</Modal.Header>
        <Modal.Body className=''>
          <div className="space-y-6">
            
            <div className="">
                <div className="mb-2 text-sm font-medium">開催日</div>
                <Datepicker className='' onSelectedDateChanged={handleDateChange} />
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="countries" value="参加予定人数を選択" />
                </div>
                <Select id="member-people" required value={selectExpectedNum} onChange={(e) => setSelectExpectedNum(parseInt(e.target.value, 10))}>
                    {selectNum.map((num) => (<option key={num} value={num}>{num}</option>))}
                </Select>
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="countries" value="実際に参加した人数を選択" />
                </div>
                <Select id="member-people" required value={selectActualNum} onChange={(e) => setSelectActualNum(parseInt(e.target.value, 10))}>
                    {selectNum.map((num) => (<option key={num} value={num}>{num}</option>))}
                </Select>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => {
            handleClick()
            setOpenModal(false)
            }}>追加</Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>閉じる</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EventEditBtn
