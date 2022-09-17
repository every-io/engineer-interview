import React from 'react';
import { ICard } from '../../customTypes/types';
import Card from '../Card';

import { ListContainer, ListTitle } from './ListStyled';

interface Props {
    title: string,
    cards: ICard[],
}

const List: React.FC<Props> = ({ title, cards }: Props) => {
    return <ListContainer>
        <ListTitle>{title}</ListTitle>
        {cards.map((card: ICard) => (
            <Card card={card} key={card.id} />
        ))}
    </ListContainer>;
}

export default List;