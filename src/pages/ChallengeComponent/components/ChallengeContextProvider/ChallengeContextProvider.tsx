import React, { useContext, useReducer } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { CardType, ListOptions } from '../../../../types';

/** types */
enum actions {
  add = 'add',
  moveRight = 'move-right',
  moveLeft = 'move-left'
}

type State = CardType[]

type Action =
 | { type: actions.add, title: string }
 | { type: actions.moveLeft, id: string }
 | { type: actions.moveRight, id: string };

/** contexts */
const ChallengeContextState = React.createContext<State>([])
const ChallengeContextDispatch = React.createContext<React.Dispatch<Action>>(() => { })

const initialState: CardType[] = []

/** reducer */
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case actions.add:
      return [
        ...state,
        {
          id: uuidv4(),
          title: action.title,
          list: ListOptions.todo
        }
      ];
    
    case actions.moveLeft:
      return state
        .map(card => {
          if (card.id === action.id) {
            return ({
              ...card,
              list: card.list === ListOptions.done ? ListOptions.inprogress : ListOptions.todo              
            })
          }
          return card
        });
    case actions.moveRight:
      return state
        .map(card => {
          if (card.id === action.id) {
            return ({
              ...card,
              list: card.list === ListOptions.todo ? ListOptions.inprogress : ListOptions.done
            })
          }
        return card
      });
    
    
    default:
      return state
  }
}

/** actions creator */
export const add = (title: string) : Action => ({ type: actions.add, title }) 
export const moveRight = (id: string) : Action => ({ type: actions.moveRight, id})
export const moveLeft = (id: string) : Action => ({ type: actions.moveLeft, id })

/** hooks */
export const useCards = () => useContext(ChallengeContextState)
export const useChallengeContextDispatch = () => useContext(ChallengeContextDispatch)

const ChallengeContextProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <ChallengeContextState.Provider value={state}>
      <ChallengeContextDispatch.Provider value={dispatch}>
        {children}
      </ChallengeContextDispatch.Provider>
    </ChallengeContextState.Provider>
  )
}

export default ChallengeContextProvider