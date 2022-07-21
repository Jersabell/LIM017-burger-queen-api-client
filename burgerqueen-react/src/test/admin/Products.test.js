import React from "react";
import { render, screen, waitFor, fireEvent, act } from '@testing-library/react';
import Products from '../../views/Admin/Products';


global.fetch = jest.fn();

describe('Products', () => {
  beforeEach(() => fetch.mockImplementationOnce(() => Promise.resolve(
    {
      json: () => [{
        name: 'frappe',
        image: 'http://image.png',
        price: '40',
        type: 'Desayuno',
        dateEntry: "09/07/2022",
        id: 2
      }]
    })));

  test('render products at component', async () => {
    render(<Products />)
    
    const items = await screen.findByText("frappe");
    // eslint-disable-next-line testing-library/no-debugging-utils
    screen.debug()
    expect(items).toBeInTheDocument();
  });

  test('render click', async () => {
    render(<Products />)
    const buttonEdit = await screen.findByTestId('button-edit');
    expect(buttonEdit).toBeInTheDocument();
    fireEvent.click(buttonEdit)
    expect(screen.getByTestId('box-modal')).toBeInTheDocument();
  });

  // test('add click', async () => {
  //   render(<Products />)
  //   const buttonAdd =  await screen.findByTestId('button-add');
  //   expect(buttonAdd).toBeInTheDocument();
  //   fireEvent.click(buttonAdd)
  //   expect(screen.getByText('CANCEL')).toBeInTheDocument();
  // });

  // test('edit click', async () => {
  //   render(<Products />)
  //   const buttonEdit = screen.getByTestId('button-edit');
  //   fireEvent.click(buttonEdit)
  //   expect(screen.getByTestId('box-modal')).toBeInTheDocument();
  // });

  test('delete click', async () => {
    fetch.mockImplementationOnce(() => Promise.resolve(
      { json: () => [{}] }
    ));
    render(<Products />)
    const buttonDelete = await screen.findByTestId('button-2');
    // const product = await screen.findByTestId('2')
    // expect(buttonDelete).toBeInTheDocument();
    fireEvent.click(buttonDelete)
    expect(fetch).toHaveBeenCalledTimes(2)
    // await waitFor( () => {
    //   expect(product).toBe(false)
    // })

  })

});




