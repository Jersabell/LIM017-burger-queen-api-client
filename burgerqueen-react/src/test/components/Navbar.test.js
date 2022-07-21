import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Navbar from '../../views/components/Navbar';

test('renders content', () =>{
    render(<Navbar 
        name0 = {'HOME'}
        ref0 ={'/Waiter'}
        icon0 = {'fa-solid fa-house'}
        ref1 = {'/Waiter/Orders'}
        name1 = {'ORDERS'}
        icon1 = {'fa-solid fa-list-check'}
    />)
    const linkElement = screen.getByText('HOME');
    expect(linkElement).toBeInTheDocument();
})