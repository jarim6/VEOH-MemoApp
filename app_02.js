//nodejs on sisäänrakennettuja moduuleja. Alla esimerkki miten niitä kutsutaan

const http = require('http');
const server=http.createServer((req, res)=>{
        const url=req.url;
        const method=req.method;
        console.log(`HTTP request received: url=${url}, method=${method}`);
//    console.log(req);
});

server.listen(8080);