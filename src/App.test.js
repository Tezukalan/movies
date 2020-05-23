import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

describe('App', () => {
  beforeEach(() => {
    render(<App />);
  });

  it('should have title', () => {
    expect(document.title).toBe('');
  });
});
