// peticiones para admin
// FETCH GET
export const peticionGet = (url, token) => fetch(url, {
        method: "GET",
        headers: {
            'Content-type': 'application/json',
            'authorization': `Bearer ${token}`
        }
    })
        .then(response => response.json())
        .catch(err => err);

//FETCH POST
export const peticionPost = (url, token, newData) => fetch(url, {
    method: 'POST',
    body: JSON.stringify({
        name: newData.name,
        price: newData.price,
        type: newData.type,
        dateEntry: new Date().toLocaleString(),
        image: newData.image
    }),
    headers: {
        'Content-type': 'application/json',
        'authorization': `Bearer ${token}`
    }
})
    .then(res => res.json())
    .catch(error => error)

// FETCH PATCH 
export const peticionPatch = (id, token, newData) => fetch(`https://mk--server.herokuapp.com/products/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({
        name: newData.name,
        price: newData.price,
        type: newData.type,
        image: newData.image
    }),
    headers: {
        'Content-type': 'application/json',
        'authorization': `Bearer ${token}`
    }
})
    .then(res => res.json())
    .catch(error => error)

// FETCH DELETE
export const peticionDelete = (id, token) => fetch(`https://mk--server.herokuapp.com/products/${id}`, {
    method: 'DELETE',
    headers: {
        'Content-type': 'application/json',
        'authorization': `Bearer ${token}`
    }
})
    .then(res => res.json())
    .catch(error => error)