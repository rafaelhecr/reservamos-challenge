import { render, screen } from '@testing-library/react';
import CitiesList from './CitiesList';
import { describe, it, expect } from 'vitest';

describe('CitiesList', () => {
  it('debe renderizar el texto correctamente', () => {
    render(<CitiesList />);
    expect(screen.getByText('Hello World!')).toBeInTheDocument();
  });
});