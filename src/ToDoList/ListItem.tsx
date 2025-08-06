import { Item } from './types';
import { Button, Card } from '../ui';

interface ListItemProps {
  item: Item;
  onMoveLeft: () => void;
  onMoveRight: () => void;
  canMoveLeft: boolean;
  canMoveRight: boolean;
}

export function ListItem({ item, onMoveLeft, onMoveRight, canMoveLeft, canMoveRight }: ListItemProps) {
  return (
    <Card style={{
      margin: '8px 0',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
      <Button
        size="sm"
        color="error"
        onClick={onMoveLeft}
        disabled={!canMoveLeft}
      >
        ←
      </Button>
      
      <span style={{
        flex: 1,
        textAlign: 'center',
        padding: '0 12px'
      }}>
        {item.text}
      </span>
      
      <Button
        size="sm"
        color="success"
        onClick={onMoveRight}
        disabled={!canMoveRight}
      >
        →
      </Button>
    </Card>
  );
}
