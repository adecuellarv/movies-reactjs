import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Home from './home';

jest.mock('axios', () => require('jest-mock-axios').default);

jest.mock('../../components/search/search', () => {
  const React = require('react'); 
  return function MockSearch(props: any) {
    return React.createElement('div', { 'data-testid': 'mock-search' }, 'Mock Search Component');
  };
});

describe('Home Component', () => {
  it('should render the search icon', () => {
    render(React.createElement(Home));
    const searchIcon = screen.getByText((content, element: any) => {
      return element.classList.contains('search-icon');
    });

    expect(searchIcon).toBeInTheDocument();
  });

  it('should toggle the modal when the search icon is clicked', () => {
    render(React.createElement(Home));
    const searchIcon = screen.getByText((content, element: any) => {
      return element.classList.contains('search-icon');
    });

    expect(screen.queryByTestId('mock-search')).not.toBeInTheDocument();

    fireEvent.click(searchIcon);

    expect(screen.getByTestId('mock-search')).toBeInTheDocument();

    fireEvent.click(searchIcon);

    expect(screen.queryByTestId('mock-search')).not.toBeInTheDocument();
  });
});