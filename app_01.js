//nodejs on sisäänrakennettuja moduuleja. Alla esimerkki miten niitä kutsutaan

const http = require('http');
const server=http.createServer((req, res)=>{
    console.log(req);
});

server.listen(8080);