import { render, screen } from '@testing-library/react';
import { CardButton, CardButtonDisabled } from "../../../views/Waiter/Order/Orders-Components/CardButton";
import CardProduct from '../../../views/Waiter/Order/Orders-Components/CardProduct';

describe('buttons', () =>{
    test('renders CardButton', () =>{
        render(<CardButton 
            text={'pending'}
        />)
        const linkElement = screen.getByText('pending');
        expect(linkElement).toBeInTheDocument();
    });

    test('renders CardButtonDisabled', () =>{
        render(<CardButtonDisabled
            text={'pending'}
        />)
        const linkElement = screen.getByText('pending');
        expect(linkElement).toBeInTheDocument();
    });
})

test('renders CardProduct', () =>{
    render(<CardProduct
        img = {'img'}
        name = {'burger'}
        qty = {'2'}
        price = {'20'}
           />)
    const linkElement = screen.getByText('Total: 40');
    expect(linkElement).toBeInTheDocument();
})
