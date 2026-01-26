//? http modul za kreiranje server


const { log } = require('console');
const http = require('http');
const url = require("url");

const handler = (req, res) => {
 
    //console.log(req.url);
    //console.log(req.method);
    //console.log(req.headers["user-agent"]);

    //console.log(req);
    //vrakanje

    //const test = req.url.split("/");

   const [_, route, param1] = req.url.split('/');

    if (route === 'random') {
        const random = Math.floor(Math.random() ) + 1;
        res.end("Izbran broj: " + random);
        return;
    }

    if (route === 'hello' && param1) {
        res.end("Zdravo " + param1);
        return;
    }
     
    res.end('Nepoznata ruta');
};

const server = http.createServer(handler);

server.listen(10000, (err) =>{
    if (err) return console.log(err.message);
    console.log("Server successfully started")
})

//?Servis koj ke obrabotuva ruti od sledniot tip
//? ime bojan pero alleksandra marija sashko risto
//? parno: da, karakteri:5, soglaski, samoglaski

//! Exo server
//! Kevraka random broj od 1 do 10
//! Ke vraka pozdrav + ime