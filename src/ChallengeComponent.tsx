import React from 'react'
import AddNew from './components/AddNew'
import Board from './components/Board'
import List from './components/List'
import { useCards } from './context/cardsContext'
import { ICard } from './customTypes/types'

export function ChallengeComponent() {
  const { cardList } = useCards()!

  return (
    <>
      <Board>
        <List title="To-Do" cards={cardList.filter((c: ICard) => c.status === 'todo')} />
        <List title="In Progress" cards={cardList.filter((c: ICard) => c.status === 'in_progress')} />
        <List title="Done" cards={cardList.filter((c: ICard) => c.status === 'done')} />
        <AddNew />
      </Board>
    </>
  )
}
