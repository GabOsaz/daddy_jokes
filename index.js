const request = require('request');

const fs = require('fs');

const searchTerm = process.argv[2];
const options = {
    url: `https://icanhazdadjoke.com/search?term=${searchTerm}`,
    headers: {
        'User-Agent': 'request',
        'Accept': 'application/json'
    } 
};

request(options, function(error, response, body) {
    if (!error && response.statusCode == 200){
        const jokes = JSON.parse(body).results;
        fileJoke(jokes)
        console.log(jokes)
    } else {
        console.log('Error', error)
    }
})

const fileJoke = (jokes) => {
    if(jokes.length !== 0) {
        const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
        const joke = randomJoke.joke;
        fs.appendFile('fetchedJokes.txt', joke + "\n", err => {
            if (err) throw err ; 
            console.log('Random joke updated')
        })
    } else {
        console.log('No joke matches your search term')
    }
}
