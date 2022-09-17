import { nanoid } from "nanoid";
import React, { useState } from "react";

import { ICard, TStatus } from "../customTypes/types";

type CardsContextType = {
    cardList: ICard[]
    addNew: (title: string) => void
    move: (card: ICard, status: TStatus) => void
};

const CardsContext = React.createContext<CardsContextType | undefined>(undefined);

type Props = {
    children: React.ReactNode;
};


export const CardsProvider = ({ children }: Props) => {
    const [cardList, setCardlist] = useState<ICard[]>([])

    const addNew = (title: string) => {
        if (!title) return alert('Please enter a title for the new card')

        setCardlist([...cardList, {
            title,
            id: nanoid(),
            status: 'todo'
        }])
    }

    const move = (card: ICard, status: TStatus) => {
        const cardIndex = cardList.findIndex((c: ICard) => card.id === c.id)

        if (cardIndex < 0) return alert('Card does not exist')

        let cardToChange = { ...cardList[cardIndex] }

        let newCardList = cardList.filter((c: ICard) => card.id !== c.id)

        newCardList.push({
            ...cardToChange,
            status
        })

        setCardlist(newCardList)
    }

    const value = {
        cardList,
        addNew,
        move
    };

    return <CardsContext.Provider value={value}>{children}</CardsContext.Provider>;
};

export const useCards = () => React.useContext(CardsContext);
