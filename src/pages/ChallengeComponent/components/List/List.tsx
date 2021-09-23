import React, { ReactElement } from 'react'
import Card from '../Card'
import './List.css'

import { CardType } from '../../../../types'

interface Props {
  title: string
  cards: CardType[]
}

export default function List(props: React.PropsWithChildren<Props>): ReactElement {
  const Cards = props.cards.map(card => (
    <Card key={card.id} card={card} >
      {card.title}
    </Card>
  ))
  return (
    <div className="list" >
      <h1>{props.title}</h1>
      {Cards}
    </div>
  )
}
