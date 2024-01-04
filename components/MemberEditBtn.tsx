'use client';

import { Button, Modal, Label, TextInput, Select } from 'flowbite-react';
import { useState, useEffect } from 'react';
import { AiOutlinePlus } from 'react-icons/ai'

interface memberEditBtnProps {
    selectYear: number
    setSelectYear: React.Dispatch<React.SetStateAction<number>>
    selectPeople: number
    setSelectPeople: React.Dispatch<React.SetStateAction<number>>
    handleClick: () => void
}

const MemberEditBtn: React.FC<memberEditBtnProps> = ({selectYear, setSelectYear, selectPeople, setSelectPeople, handleClick}) => {
    
    const [openModal, setOpenModal] = useState<boolean>(false);

    const years = Array.from({length: 9}, (_, index) => (2015 + index))
    const people = Array.from({length: 300}, (_, index) => (1 + index))

  return (
    <>
      {/* <Button onClick={() => setOpenModal(true)} pill className='relative p-2 ml-auto' color='gray'><AiOutlinePlus className='text-xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' /></Button> */}
      <Button onClick={() => setOpenModal(true)} pill className='ml-auto py-1.5' color='gray' size="xs"><AiOutlinePlus className='text-xl' /></Button>
      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>人数追加・変更</Modal.Header>
        <Modal.Body className=''>
          <div className="space-y-6">
            <div className="">
                <div className="mb-2 block">
                    <Label htmlFor="countries" value="年を選択" />
                </div>
                <Select id="member-year" required value={selectYear} onChange={(e) => setSelectYear(parseInt(e.target.value, 10))}>
                    {years.map((year) => (<option key={year} value={year}>{year}</option>))}
                </Select>
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="countries" value="人数を選択" />
                </div>
                <Select id="member-people" required value={selectPeople} onChange={(e) => setSelectPeople(parseInt(e.target.value, 10))}>
                    {people.map((people) => (<option key={people} value={people}>{people}</option>))}
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

export default MemberEditBtn
