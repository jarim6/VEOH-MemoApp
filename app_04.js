//nodejs on sisäänrakennettuja moduuleja. Alla esimerkki miten kutsutaan http-modulia

const http = require('http');
const server=http.createServer((req, res)=>{
        const url=req.url;
        const method=req.method;
        console.log(`HTTP request received: url=${url}, method=${method}`);

        if(url === '/') {
        //res.write('Hello');
        res.write(`
        <html>
        <head><title>MemoAppi</title></head>
        <body>
                <form action="add-note" method="POST">
                <input type="text" name="note">
                <button type="submit">Add note</button>
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
                   const body = Buffer.concat(chunks);  
                   console.log(body);  
                   res.statusCode = 303; //Redirect
                   res.setHeader('Location', '/');
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