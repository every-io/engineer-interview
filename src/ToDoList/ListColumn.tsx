import { Item, Direction, TodoStatus } from './types';
import { ListItem } from './ListItem';
import { Card } from '../ui';

interface ListColumnProps {
  title: string;
  items: Item[];
  onMove: (itemId: string, direction: Direction) => void;
  canMove: (status: TodoStatus, direction: Direction) => boolean;
}

export function ListColumn({ title, items, onMove, canMove }: ListColumnProps) {
  return (
    <Card
      style={{
        flex: 1,
        minHeight: '400px',
      }}
    >
      <h3
        style={{
          textAlign: 'center',
          marginBottom: '16px',
        }}
      >
        {title}
      </h3>

      <div>
        {items.map(item => (
          <ListItem
            key={item.id}
            item={item}
            onMove={onMove}
            canMove={canMove}
          />
        ))}
      </div>
    </Card>
  );
}
