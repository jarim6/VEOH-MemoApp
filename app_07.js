//tehtävä 7 lisätään nappi jolla voidaan poistaa 

/******************************************************
Jatkotehtävä:
MemoApp app_07.js
- Lisää Delete-nappi, jolla voi poistaa noten. (input type=number name="index")
==> Uusi <form> html:ääääään

- Käsittele /delete-note POST pyyntö


- notes.splice(index, 1)
******************************************************/


//nodejs on sisäänrakennettuja moduuleja. Alla esimerkki miten kutsutaan http-modulia

const http = require('http');
const fs = require('fs');
const notes = [];

const server=http.createServer((req, res)=>{
        const url=req.url;
        const method=req.method;
        console.log(`HTTP request received: url=${url}, method=${method}`);

        if(url === '/') {
        //res.write('Hello');
        res.write(`
        <html>
        <head><title>MemoAppi</title></head>
        <body>`);
                notes.forEach((value, index) => {
                        res.write(`<div>${value}, index: ${index}</div>`);
                });

        res.write(`<form action="add-note" method="POST">
                <input type="text" name="note">
                <button type="submit">Add note</button>
                </form>`);
        res.write(`<form action="del-note" method="POST">
                <input type="number" name="index">
                <button type="submit">Delete</button>
        
        </body>
        </html>
        `);
        res.statusCode = 200 //OK
        res.end();
        return;
        }

        else if(url === '/add-note') {
                console.log('/add-note');
                const chunks = [];
                req.on('data', (chunk) => {
                        chunks.push(chunk);
                });

        
                req.on('end', () => {
                   const body = Buffer.concat(chunks).toString();  
                   const note = body.split('=')[1];
                   notes.push(note);
                   //console.log(body);  
                   res.statusCode = 303; //Redirect
                   res.setHeader('Location', '/');
                   res.end();
                });
        return;
        }

        else if(url === '/del-note') {
                console.log('/del-note');
                const chunks = [];
                req.on('data', (chunk) => {
                        chunks.push(chunk);
                });

        
                req.on('end', () => {
                   const body = Buffer.concat(chunks).toString();  
                   const index = body.split('=')[1];
                   notes.splice(index, 1);
                   //console.log(body);  
                   res.statusCode = 303; //Redirect
                   res.setHeader('Location', '/');
                   res.end();
                });
        return;
        }


        else if (url === '/favicon.ico') {
                fs.readFile('./favicon.ico', (err, data) => {
                        res.write(data);
                        res.end();
                });
                return;
        }

        console.log(`${url} not found`);
        res.write(`
        <html>
        <head><title>MemoApp - 404</title></head>
        <body>
        <h1>404 Page not found!</h1>
        </body>
        </html> `);
        res.statusCode = 404 //Virhe not found
        res.end();
        
        
       

});

server.listen(8080);