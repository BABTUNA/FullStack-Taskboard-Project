import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, test } from 'vitest';
import { AuthProvider } from '../auth/AuthContext';
import AuthPage from './AuthPage';

describe('AuthPage', () => {
  test('shows registration fields', () => {
    render(<MemoryRouter><AuthProvider><AuthPage mode="register" /></AuthProvider></MemoryRouter>);
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });
});
