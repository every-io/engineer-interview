import React, { useState } from 'react';
import { useCards } from '../../context/cardsContext';
import IconPlus from '../Icons/plus';

import { AddNewContainer } from './AddNewStyled';

const AddNew: React.FC = () => {
    const { addNew } = useCards()!

    const [addNewTitle, setAddNewTitle] = useState<string>('')

    const handleAddNew = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        addNew(addNewTitle)
        setAddNewTitle('')
    }

    return <AddNewContainer onSubmit={(e) => handleAddNew(e)}>
        <input
            type="text"
            onChange={(e) => setAddNewTitle(e.target.value)} value={addNewTitle}
            placeholder='Add Task'
            required
        />
        <button type='submit'>
            <IconPlus />
        </button>
    </AddNewContainer>;
}

export default AddNew;