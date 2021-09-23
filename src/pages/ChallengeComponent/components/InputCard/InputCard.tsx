import React, { ReactElement, useState } from 'react'
import Button from '../Button'
import { add, useChallengeContextDispatch } from '../ChallengeContextProvider/ChallengeContextProvider'
import Plus from '../Icons/Plus'

import './InputCard.css'

export default function InputCard(): ReactElement {
  const dispatch = useChallengeContextDispatch()
  const [title, setTitle] = useState('')

  const addCard = () => {
    if (title.length > 0) {
      dispatch(add(title))
    }
  }

  return (
    <div className="root">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Button
        className="plus"
        onClick={addCard}
        disabled={!title.length}
      >
        <Plus />
      </Button>
    </div>
  )
}
