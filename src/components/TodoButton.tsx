interface TodoButtonProps {
    direction: 'left' | 'right';
    disabled: boolean;
    handleClick: (direction: 'left' | 'right') => void;
}
const TodoButton = ({ direction, disabled, handleClick }: TodoButtonProps) => {
    return (
        <button
            disabled={disabled}
            className={`w-10 h-10 rounded-full ${direction === 'left' ? 'bg-red-500' : 'bg-blue-500'} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={() => handleClick(direction)}
        >
            {direction === 'left' ? '◀' : '▶'}
        </button>
    );
};

export default TodoButton;