//FETCH GET
export const peticionGet = (url, token) => fetch(url, {
    method: "GET",
    headers: {
        'Content-type': 'application/json',
        'authorization': `Bearer ${token}`
    }
})
    .then(response => response.json())
    .then(json => json)
    .catch(err => err);

//FETCH POST
export const peticionPost = (url,token, newUser) => fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            name: newUser.name,
            email: newUser.email,
            password: newUser.password,
            roles: { [newUser.roles]: true }
        }),
        headers: {
            'Content-type': 'application/json',
            'authorization': `Bearer ${token}`
        }
    })
        .then(res => res.json())
        .catch(error => error)

// FETCH PATCH 
export const peticionPatch = (id, token, newUser) => fetch(`https://mk--server.herokuapp.com/users/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({
        name: newUser.name,
        email: newUser.email,
        roles: { [newUser.roles]: true },
        password: newUser.password
    }),
    headers: {
        'Content-type': 'application/json',
        'authorization': `Bearer ${token}`
    }
})
    .then(res => res.json())
    .catch(error => error)

// FETCH DELETE
export const peticionDelete = (id, token) => fetch(`https://mk--server.herokuapp.com/users/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
            'authorization': `Bearer ${token}`
        }
    })
        .then(res => {
            return res.json()
        })
        .catch(error => error)
