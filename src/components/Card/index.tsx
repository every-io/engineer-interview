import React from 'react';
import { useCards } from '../../context/cardsContext';
import { ICard, TMove, TMovement } from '../../customTypes/types';
import IconArrowLeft from '../Icons/arrowLeft';
import IconArrowRight from '../Icons/arrowRight';

import { CardButton, CardContainer, CardTitle } from './CardStyled';

interface Props {
    card: ICard
}

const movements: TMovement = {
    todo: {
        next: 'in_progress',
        prev: null
    },
    in_progress: {
        next: 'done',
        prev: 'todo'
    },
    done: {
        next: null,
        prev: 'in_progress'
    },
}

const Card: React.FC<Props> = ({ card }: Props) => {
    const { move } = useCards()!

    const handleMove = (direction: TMove) => {
        const mv = movements[card.status][direction]

        if (mv) {
            move(card, mv)
        }
    }

    return <CardContainer>
        <CardButton onClick={() => handleMove('prev')} direction='prev' disabled={card.status === 'todo'}>
            <IconArrowLeft />
        </CardButton>
        <CardTitle>{card.title}</CardTitle>
        <CardButton onClick={() => handleMove('next')} direction='next' disabled={card.status === 'done'}>
            <IconArrowRight />
        </CardButton>
    </CardContainer>;
}

export default Card;