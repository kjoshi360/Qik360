import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';

describe('App', () => {
  it('renders Home page when visiting root', () => {
    localStorage.clear();
    window.history.pushState({}, 'Home', '/');
    render(<BrowserRouter><App /></BrowserRouter>);
    expect(screen.getByText('Home')).toBeInTheDocument();
  });
});
