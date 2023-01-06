import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import TaskCard from './TaskCard';

describe('TaskCard', () => {
  test('shows task details and advances its status', () => {
    const move = vi.fn();
    const task = { id: 1, title: 'Draft notes', description: 'First pass', priority: 'normal', status: 'todo' };
    render(<TaskCard task={task} onEdit={() => {}} onMove={move} />);
    expect(screen.getByText('Draft notes')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Move to doing'));
    expect(move).toHaveBeenCalledWith(task, 'doing');
  });
});
