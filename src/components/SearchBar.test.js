import { render, screen } from '@testing-library/react';
import SearchBar from './SearchBar';
import { describe, it, expect } from 'vitest';

describe('SearchBar', () => {
  it('debe renderizar el texto correctamente', () => {
    render(<SearchBar />);
    expect(screen.getByText('Type city that you want know Weather')).toBeInTheDocument();
  });
});