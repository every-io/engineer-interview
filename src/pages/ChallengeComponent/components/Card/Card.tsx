import React, { ReactElement } from 'react'
import { CardType, ListOptions } from '../../../../types'
import Button from '../Button'
import { moveLeft, moveRight, useChallengeContextDispatch } from '../ChallengeContextProvider/ChallengeContextProvider'
import ArrorRight from '../Icons/ArrorRight'
import ArrorLeft from '../Icons/ArrowLeft'

import './Card.css'

interface Props {
  card: CardType
}

const ButtonLeft = ({ card } : Props) => {
  const dispatch = useChallengeContextDispatch()
  return (
    <Button
      className="left"
      onClick={() => dispatch(moveLeft(card.id))}
      disabled={card.list === ListOptions.todo}
    >
      <ArrorLeft />
    </Button>
  )
}

const ButtonRight = ({ card } : Props) => {
  const dispatch = useChallengeContextDispatch()
  return (
    <Button
      className="right"
      onClick={() => dispatch(moveRight(card.id))}
      disabled={card.list === ListOptions.done}
    >
      <ArrorRight />
    </Button>
  )
}

export default function List(props: React.PropsWithChildren<Props>): ReactElement {
  const { card } = props
  return (
    <div className="card">
      <ButtonLeft card={card} />
      <h2>{card.title}</h2>
      <ButtonRight card={card} />
    </div>
  )
}
