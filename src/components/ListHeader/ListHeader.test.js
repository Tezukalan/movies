import React from 'react';
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import ListHeader from './ListHeader';

afterEach(cleanup);

describe('ListHeader', () => {
  const mockHandleChange = jest.fn();
  let selectNode;

  beforeEach(() => {
    render(<ListHeader sortCriterion="popularity.desc" onSelectChange={mockHandleChange} />);

    selectNode = screen.getByTestId('sort').querySelector('select');
  });

  it('displays selected sortCriterion', () => {
    expect(selectNode.value).toBe('popularity.desc');
  });

  it('sets sortCriterion when change and call handleChange callback', () => {
    fireEvent.change(selectNode, { target: { value: 'release_date.desc' } });
    expect(selectNode.value).toBe('release_date.desc');
    expect(mockHandleChange).toHaveBeenCalled();
  });
});
