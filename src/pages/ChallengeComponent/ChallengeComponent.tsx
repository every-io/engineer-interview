import Board from './components/Board'
import List from './components/List'
import { useCards } from './components/ChallengeContextProvider/ChallengeContextProvider';
import InputCard from './components/InputCard';

const TodoList = () => {
  const cards = useCards()
  return <List
    title="To Do"
    cards={cards.filter(card => card.list === "todo")}
  />
}

const InProgressList = () => {
  const cards = useCards()
  return <List
    title="In Progress"
    cards={cards.filter(card => card.list === "inprogress")}
  />
}

const DoneList = () => {
  const cards = useCards()
  return <List
    title="Done"
    cards={cards.filter(card => card.list === "done")}
  />
}

export function ChallengeComponent() {
  return (
    <Board>
      <TodoList />
      <InProgressList />
      <DoneList/>
      <InputCard />
    </Board>
  )
}


export default ChallengeComponent
