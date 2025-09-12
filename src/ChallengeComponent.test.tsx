import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { ChallengeComponent } from './ChallengeComponent';
import { act } from 'react';
import userEvent from '@testing-library/user-event';
describe('TaskColumn', () => {
    test('renders with correct title and tasks', () => {
        render(
            <ChallengeComponent />
        );

        expect(screen.getByText('To Do')).toBeInTheDocument();
        expect(screen.getByText('In Progress')).toBeInTheDocument();
        expect(screen.getByText('Done')).toBeInTheDocument();

        expect(screen.getByText('Mow The lawn')).toBeInTheDocument();
        expect(screen.getByText('Rake the leaves')).toBeInTheDocument();
    });

    test('should move tasks between columns', () => {
        render(
            <ChallengeComponent />
        );

        expect(screen.getByTestId('move-left-task-1')).toBeDisabled()
        fireEvent.click(screen.getByTestId('move-right-task-1'))
        expect(screen.getByTestId('move-left-task-1')).toBeEnabled()
        fireEvent.click(screen.getByTestId('move-right-task-1'))
        expect(screen.getByTestId('move-left-task-1')).toBeEnabled()
        expect(screen.getByTestId('move-right-task-1')).toBeDisabled()

        expect(screen.getByTestId('move-right-task-3')).toBeDisabled()
        fireEvent.click(screen.getByTestId('move-left-task-3'))
        expect(screen.getByTestId('move-right-task-3')).toBeEnabled()
        fireEvent.click(screen.getByTestId('move-left-task-3'))
        expect(screen.getByTestId('move-right-task-3')).toBeEnabled()
        expect(screen.getByTestId('move-left-task-3')).toBeDisabled()
    });

    test('should add a new task', async () => {
        const user = userEvent.setup();

        render(
            <ChallengeComponent />
        );

        const input = screen.getByRole('textbox', {
            name: /new task text/i
        }) as HTMLInputElement;
        
        await act(async () => {
            await user.type(input, 'New task');
            await user.click(screen.getByRole('button', {
                name: /new task button/i
            }));
        })

        expect(screen.getByText(/new task/i)).toBeInTheDocument()
    });
});