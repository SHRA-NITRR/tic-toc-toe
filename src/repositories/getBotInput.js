import fetch from 'isomorphic-fetch';


export const getBotInput = (currentState) => {
    const endpoint = 'https://koa-ttt.herokuapp.com';
    
    const options = {
        body: JSON.stringify(currentState),
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Accept':'application/json'
          }
    };

    return fetch(endpoint, options)
        .then((response) => {
            return response.json();
        })
};