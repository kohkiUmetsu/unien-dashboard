'use client';

import { Button, Modal, Label, TextInput, Datepicker } from 'flowbite-react';
import { useState, useEffect } from 'react';
import { AiOutlinePlus } from 'react-icons/ai'

interface taskInputBtnProps {
    inputValue: string
    setInputValue: React.Dispatch<React.SetStateAction<string>>
    handleClick: () => void
    handleDateChange: (date: Date) => void
}

const TaskInputBtn: React.FC<taskInputBtnProps> = ({inputValue, setInputValue, handleClick, handleDateChange}) => {
    
  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <>
      <Button onClick={() => setOpenModal(true)} pill className='relative px-1'><AiOutlinePlus className='text-2xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' /></Button>
      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>タスク追加</Modal.Header>
        <Modal.Body className=''>
          <div className="space-y-6">
            <div className="">
                <div className="mb-2 text-sm font-medium">期限</div>
                <Datepicker className='' onSelectedDateChanged={handleDateChange} />
            </div>
            <div>
                <div className="mb-2 block">
                <Label htmlFor="input-gray" color="gray" value="タスク説明" />
                </div>
                <TextInput id="input-gray" placeholder="タスクを入力してください" required color="gray" onChange={(e) => setInputValue(e.target.value)} value={inputValue} />
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

export default TaskInputBtn
