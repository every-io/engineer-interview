import { Item, TodoStatus, Direction } from './types';
import { Button, Card } from '../ui';

interface ListItemProps {
  item: Item;
  canMove: (status: TodoStatus, direction: Direction) => boolean;
  onMove: (itemId: string, direction: Direction) => void;
}

export function ListItem({ item, onMove, canMove }: ListItemProps) {
  const canMovePrev = canMove(item.status, Direction.PREV);
  const canMoveNext = canMove(item.status, Direction.NEXT);

  const handleMovePrev = () => {
    onMove(item.id, Direction.PREV);
  };

  const handleMoveNext = () => {
    onMove(item.id, Direction.NEXT);
  };

  return (
    <Card
      style={{
        margin: '8px 0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Button
        size="sm"
        color="error"
        onClick={handleMovePrev}
        disabled={!canMovePrev}
      >
        ←
      </Button>

      <span
        style={{
          flex: 1,
          textAlign: 'center',
          padding: '0 12px',
        }}
      >
        {item.text}
      </span>

      <Button
        size="sm"
        color="success"
        onClick={handleMoveNext}
        disabled={!canMoveNext}
      >
        →
      </Button>
    </Card>
  );
}
