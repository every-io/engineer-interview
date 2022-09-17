import React, { ReactNode } from 'react';

import { BoardContainer } from './BoardStyled';

interface Props {
    children: ReactNode
}

const Board: React.FC<Props> = ({ children }: Props) => {
    return <BoardContainer>
        {children}
    </BoardContainer>;
}

export default Board;