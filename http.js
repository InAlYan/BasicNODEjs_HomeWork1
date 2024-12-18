const http = require('http');

function createCounter(initValue) {
    let val = initValue;
    return {
        increment() {val++;},
        getValue() {return val;}
    }
}

const rootCount = createCounter(0);
const aboutCount = createCounter(0);
const notFoundCount = createCounter(0);

const port =  3000;

const httpServer = http.createServer((req, res) => {
    if (req.url === '/') {

        rootCount.increment();
        res.writeHead(200, {'content-type': 'text/html; charset=UTF-8'});

        res.end(`<h1>Главная страница загружена ${rootCount.getValue()} раз</h1>
        <a href='/about'>About</a>`);

    } else if (req.url === '/about') {

        aboutCount.increment();
        res.writeHead(200, {'content-type': 'text/html; charset=UTF-8'});

        res.end(`<h1>Страница About загружена ${aboutCount.getValue()} раз</h1>
        <a href='/'>Home</a>`);

    } else {

        notFoundCount.increment();
        res.writeHead(404, {'content-type': 'text/html; charset=UTF-8'});

        res.end(`<h1>Страница не найдена ${notFoundCount.getValue()} раз</h1>`);

    }
});

httpServer.listen(port, () => console.log(`Сервер запущен на порту ${port}`));