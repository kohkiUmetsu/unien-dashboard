'use client';

import { Button, Modal, Label, TextInput, Datepicker } from 'flowbite-react';
import { useState, useEffect } from 'react';
import { AiOutlinePlus } from 'react-icons/ai'

interface taskInputBtnProps {
    inputEvent: string
    setInputEvent: React.Dispatch<React.SetStateAction<string>>
    inputPeople: string
    setInputPeople: React.Dispatch<React.SetStateAction<string>>
    inputFee: string
    setInputFee: React.Dispatch<React.SetStateAction<string>>
    inputExplanation: string
    setInputExplanation: React.Dispatch<React.SetStateAction<string>>
    inputPlace: string
    setInputPlace: React.Dispatch<React.SetStateAction<string>>
    handleClick: () => void
    handleDateChange: (date: Date) => void
}

const EventInputBtn: React.FC<taskInputBtnProps> = ({inputEvent, setInputEvent, inputPeople, setInputPeople, inputFee, setInputFee, inputExplanation, setInputExplanation, inputPlace, setInputPlace, handleClick, handleDateChange}) => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <>
      <Button onClick={() => setOpenModal(true)} pill className='relative px-1'><AiOutlinePlus className='text-2xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' /></Button>
      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>イベント追加</Modal.Header>
        <Modal.Body className=''>
          <div className="space-y-6">
            <div className="">
                <div className="mb-2 text-sm font-medium">開催日</div>
                <Datepicker className='' onSelectedDateChanged={handleDateChange} />
            </div>
            <div>
                <div className="mb-2 block">
                <Label htmlFor="input-gray" color="gray" value="イベント名" />
                </div>
                <TextInput id="input-gray" placeholder="イベント" required color="gray" onChange={(e) => setInputEvent(e.target.value)} value={inputEvent} />
            </div>
            <div>
                <div className="mb-2 block">
                <Label htmlFor="input-gray" color="gray" value="概要" />
                </div>
                <TextInput id="input-gray" placeholder="概要" required color="gray" onChange={(e) => setInputExplanation(e.target.value)} value={inputExplanation} />
            </div>
            <div className="grid grid-cols-2 gap-x-4">
                <div>
                    <div className="mb-2 block">
                    <Label htmlFor="input-gray" color="gray" value="人数" />
                    </div>
                    <TextInput id="input-gray" placeholder="人数" required color="gray" onChange={(e) => setInputPeople(e.target.value)} value={inputPeople} />
                </div>
                <div>
                    <div className="mb-2 block">
                    <Label htmlFor="input-gray" color="gray" value="参加費用" />
                    </div>
                    <TextInput id="input-gray" placeholder="参加費用" required color="gray" onChange={(e) => setInputFee(e.target.value)} value={inputFee} />
                </div>
            </div>
            <div>
            <div className="mb-2 block">
                <Label htmlFor="input-gray" color="gray" value="開催場所" />
                </div>
                <TextInput id="input-gray" placeholder="開催場所" required color="gray" onChange={(e) => setInputPlace(e.target.value)} value={inputPlace} />
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

export default EventInputBtn
