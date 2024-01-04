import React, { use } from 'react'
import { useState, useEffect } from 'react'
import FeeEditBtn from './FeeEditBtn'

const FeeContent = () => {

    const [inputFee, setInputFee] = useState<string>("")
    const [inputMemberNum, setInputMemberNum] = useState<string>("")
    const [inputEventPeople, setInputEventPeople] = useState<string>("")
    const [inputEventFee, setInputEventFee] = useState<string>("")
    const [totalFeeSum, setTotalFeeSum] = useState<number | null>(null)

    const handleClick = () => {

        const parseFee = parseInt(inputFee)
        const parseMemberNum = parseInt(inputMemberNum)

        const totalFee = parseFee * parseMemberNum

        const parseEventPeople = parseInt(inputEventPeople)
        const parseEventFee = parseInt(inputEventFee)

        if (!isNaN(parseEventPeople) && !isNaN(parseEventFee) && totalFee !== null) {
            if (totalFeeSum === null) {
                setTotalFeeSum(totalFee - parseEventPeople * parseEventFee)
            } else {
                setTotalFeeSum((prevTotalFeeSum) => prevTotalFeeSum !== null ? prevTotalFeeSum - parseEventPeople * parseEventFee : null)
            }
        } else {
            setTotalFeeSum(totalFee)
        }

        setInputEventPeople("")
        setInputEventFee("")
    }

  return (
    <div className='relative h-full'>
        <FeeEditBtn 
        handleClick={handleClick}
        inputFee={inputFee}
        setInputFee={setInputFee}
        inputMemberNum={inputMemberNum}
        setInputMemberNum={setInputMemberNum}
        inputEventPeople={inputEventPeople}
        setInputEventPeople={setInputEventPeople}
        inputEventFee={inputEventFee}
        setInputEventFee={setInputEventFee}
        />
        {totalFeeSum !== null ? (
            isNaN(totalFeeSum) ? (
                <div className='text-red-500 text-base absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4'>費用と人数を数値で入力してください</div>
            ) : (
                <div className='font-bold text-4xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'><span>¥</span>{totalFeeSum}</div>
            )
        ) : (
            <div className='text-gray-500 text-base absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4'>費用を入力してください</div>
        )}
    </div>
  )
}

export default FeeContent