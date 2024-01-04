"use client"
import { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai'
import { Button, Modal, Label, TextInput, Select, Datepicker } from 'flowbite-react';

interface FeeEditBtnProps {
    handleClick: () => void
    inputFee: string
    setInputFee: React.Dispatch<React.SetStateAction<string>>
    inputMemberNum: string
    setInputMemberNum: React.Dispatch<React.SetStateAction<string>>
    inputEventPeople: string
    setInputEventPeople: React.Dispatch<React.SetStateAction<string>>
    inputEventFee: string
    setInputEventFee: React.Dispatch<React.SetStateAction<string>>
}


const FeeEditBtn: React.FC<FeeEditBtnProps> = ({handleClick, inputFee, setInputFee, inputMemberNum, setInputMemberNum, inputEventPeople, setInputEventPeople, inputEventFee, setInputEventFee}) => {

    const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <>
      {/* <Button onClick={() => setOpenModal(true)} pill className='relative p-2 ml-auto' color='gray'><AiOutlinePlus className='text-xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' /></Button> */}
      <Button onClick={() => setOpenModal(true)} pill className='ml-auto py-1.5' color='gray' size="xs"><AiOutlinePlus className='text-xl' /></Button>
      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>サークル費用追加・変更</Modal.Header>
        <Modal.Body className=''>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-x-4">
                <div>
                    <div className="mb-2 block">
                    <Label htmlFor="input-gray" color="gray" value="一人当たりのサークル費用" />
                    </div>
                    <TextInput id="input-gray" placeholder="一人当たりのサークル費用" required color="gray" onChange={(e) => setInputFee(e.target.value)} value={inputFee} />
                </div>
                <div>
                    <div className="mb-2 block">
                    <Label htmlFor="input-gray" color="gray" value="人数" />
                    </div>
                    <TextInput id="input-gray" placeholder="人数" required color="gray" onChange={(e) => setInputMemberNum(e.target.value)} value={inputMemberNum} />
                </div>
            </div>
            <div className="border-b"></div>
            <div>
                <div className="mb-2 block">
                <Label htmlFor="input-gray" color="gray" value="人数" />
                </div>
                <TextInput id="input-gray" placeholder="人数" required color="gray" onChange={(e) => setInputEventPeople(e.target.value)} value={inputEventPeople} />
            </div>
            <div>
                <div className="mb-2 block">
                <Label htmlFor="input-gray" color="gray" value="参加費用" />
                </div>
                <TextInput id="input-gray" placeholder="参加費用" required color="gray" onChange={(e) => setInputEventFee(e.target.value)} value={inputEventFee} />
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
  )
}

export default FeeEditBtn