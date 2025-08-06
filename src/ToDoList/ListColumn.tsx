import { Column, TodoStatus } from './types';
import { ListItem } from './ListItem';
import { Card } from '../ui';
import { STATUS_CODES } from 'http';

interface ListColumnProps {
  column: Column;
  onMoveLeft: (itemId: string) => void;
  onMoveRight: (itemId: string) => void;
}

export function ListColumn({ column, onMoveLeft, onMoveRight }: ListColumnProps) {
  return (
    <Card style={{
      flex: 1,
      minHeight: '400px'
    }}>
      <h3 style={{
        textAlign: 'center',
        marginBottom: '16px',
        color: '#495057',
        textTransform: 'capitalize'
      }}>
        {column.title}
      </h3>
      
      <div>
        {column.items.map(item => (
          <ListItem
            key={item.id}
            item={item}
            onMoveLeft={() => onMoveLeft(item.id)}
            onMoveRight={() => onMoveRight(item.id)}
            canMoveLeft={column.status !== TodoStatus.TODO}
            canMoveRight={column.status !== TodoStatus.DONE}
          />
        ))}
      </div>
    </Card>
  );
}
