import React from "react";
import { render, screen, waitFor, fireEvent, act } from '@testing-library/react';
import Products from '../../views/Admin/Products';
import{ peticionDelete } from '../../utils/fetchAdminProducts';

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

  test('click Edit', async () => {
    render(<Products />)
    const buttonEdit = await screen.findByTestId('button-edit');
    expect(buttonEdit).toBeInTheDocument();
    expect(fetch).toHaveBeenCalledTimes(1)
    fireEvent.click(buttonEdit)
    expect(screen.getByTestId('box-modal')).toBeInTheDocument();
  });

  test.only('delete click', async () => {
    fetch.mockImplementationOnce(() => Promise.resolve(
      {json: () => [{}]}
    ));
    render(<Products />)
    // eslint-disable-next-line testing-library/no-debugging-utils
    screen.debug()
    const buttonDelete = await screen.findByTestId('button-2');
    fireEvent.click(buttonDelete);
    expect(fetch).toHaveBeenNthCalledWith(2, "http://localhost:8080/products/2", {
      "headers": {"Content-type": "application/json", "authorization": "Bearer null"}, "method": "DELETE"})
  })

  // test('add click', async () => {
  //   render(<Products />)
  //   const buttonAdd =  await screen.findByTestId('button-add');
  //   expect(buttonAdd).toBeInTheDocument();
  //   fireEvent.click(buttonAdd)
  //   expect(screen.getByText('CANCEL')).toBeInTheDocument();
  // });

});






