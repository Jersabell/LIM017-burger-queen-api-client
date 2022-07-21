import { peticionGet, peticionPost, peticionPatch, peticionDelete } from '../../utils/fetchAdminProducts';
import { waitFor } from '@testing-library/react';
global.fetch = jest.fn();

test("fetch get", async() => {
    fetch.mockImplementationOnce(() => Promise.resolve(
        {json: () => [{
            name: 'frappe',
            image:'http://image.png',
            price: '40',
            type: 'Desayuno',
            dateEntry: "09/07/2022",
            id: 2
        }]}
    ));
    const products = [{
                name: 'frappe',
                image:'http://image.png',
                price: '40',
                type: 'Desayuno',
                dateEntry: "09/07/2022",
                id: 2
            }];

    const token = 'mesero01'
    const url = 'http://localhost:8080/products';
    
    await waitFor( () =>{
        peticionGet(token, url).then((res) => {
        expect(res).toStrictEqual(products)
    })})
    expect(fetch).toHaveBeenCalledWith("mesero01", {"headers": {"Content-type": "application/json", "authorization": "Bearer http://localhost:8080/products"}, "method": "GET"})
});


test("fetch post", async() => {
    fetch.mockImplementationOnce(() => Promise.resolve(
        {json: () => [{
            name: 'café',
            image:'http://image.png',
            price: '50',
            type: 'Desayuno',
            dateEntry: "09/07/2022",
            id: 2
        }]}
    ));

    const products = [{
                name: 'café',
                image:'http://image.png',
                price: '50',
                type: 'Desayuno',
                dateEntry: "09/07/2022",
                id: 2
            }];

    const token = 'mesero01'
    const url = 'http://localhost:8080/products';
    const newData = {
        name: 'café',
        price: '50',
        type: 'Desayuno',
        dateEntry: new Date().toLocaleString(),
        image: 'http://image.png',
    }
    
    await waitFor( () =>{
        peticionPost(url, token, newData).then((res) => {
        expect(res).toStrictEqual(products)
    })})
    expect(fetch).toHaveBeenCalledWith("http://localhost:8080/products", {
        "body": JSON.stringify({
            name: newData.name,
            price: newData.price,
            type: newData.type,
            dateEntry: new Date().toLocaleString(),
            image: newData.image
        }),
    "headers": {"Content-type": "application/json", "authorization": "Bearer mesero01"}, "method": "POST"})
});

test("fetch patch", async() => {
    fetch.mockImplementationOnce(() => Promise.resolve(
        {json: () => [{
            name: 'café con leche',
            image:'http://image.png',
            price: '50',
            type: 'Desayuno',
            id: 2
        }]}
    ));

    const products = [{
                name: 'café con leche',
                image:'http://image.png',
                price: '50',
                type: 'Desayuno',
                id: 2
            }];

    const token = 'mesero01'
    const id = 2;
    const newData = {
        name: 'café con leche',
        price: '50',
        type: 'Desayuno',
        image: 'http://image.png',
    }
    
    await waitFor( () =>{
        peticionPatch(id, token, newData).then((res) => {
        expect(res).toStrictEqual(products)
    })})
    expect(fetch).toHaveBeenCalledWith("http://localhost:8080/products/2", {
        "body": JSON.stringify({
            name: newData.name,
            price: newData.price,
            type: newData.type,
            image: newData.image
        }),
    "headers": {"Content-type": "application/json", "authorization": "Bearer mesero01"}, "method": "PATCH"})
});

test("fetch delete", async() => {
    fetch.mockImplementationOnce(() => Promise.resolve(
        {json: () => [{}]}
    ));
    const token = 'mesero01'
    const id = 2;
    await waitFor( () =>{
        peticionDelete(id, token).then((res) => {
        expect(res).toStrictEqual([{}])
    })})
    expect(fetch).toHaveBeenCalledWith("http://localhost:8080/products/2", {
    "headers": {"Content-type": "application/json", "authorization": "Bearer mesero01"}, "method": "DELETE"})
});