//tehtävä 7 lisätään nappi jolla voidaan poistaa 

/******************************************************
Jatkotehtävä:
Lisää tyylitiedosto
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
        <head><title>MemoAppi</title>
        <link rel="stylesheet" type="text/css" href="./style.css">
        <meta http-equiv="Content-Type", content="text/html;charset=UTF-8">
        </head>
        <body>`);

                notes.forEach((value, index) => {
                        res.write(`
                        <div>${value}, index: ${index}, 
                        <form action="del-note" method="POST">
                        <input type="hidden" name="index", value="${index}">
                        <button type="submit" class="delete_button">Delete</button>
                        </form>
                        </div>`);
                });

        res.write(`<form action="add-note" method="POST">
                <input type="text" name="note">
                <button type="submit" class="add_button">Add note</button>
                </form>
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
                   const decoded_body = decodeURIComponent(body);
                   const note = decoded_body.split('=')[1];
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

        else if (url === '/style.css') {
                fs.readFile('./style.css', (err, data) => {
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