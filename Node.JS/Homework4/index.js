const http = require('http');
const url = require('url');

const samoglaski = ['a', 'e', 'i', 'o', 'u'];

const karakteri = (name) => {

    let brojSamoglaski = 0;
    let brojSoglaski = 0;
    let brojKarakteri = name.length;
    let paren = "neparen";

    for (let i=0; i<name.length; i++){
        let katakter = name[i];

        if (samoglaski.includes(katakter))
            brojSamoglaski++;
        else
            brojSoglaski++;

    }
    if (brojKarakteri % 2 == 0)
        paren = "paren";
    return {brojKarakteri, brojSamoglaski, brojSoglaski, paren};
}

const handler = (req, res) => {
    const { pathname } = url.parse(req.url);
    const [_, route, name] = pathname.split('/');

    if (route == 'ime' && name){
        const {brojKarakteri, brojSamoglaski, brojSoglaski, paren} = karakteri(name);

        res.end('Karakeri: ' + brojKarakteri + "\n" +
                'Soglaski: ' + brojSoglaski + "\n" +
                'Samoglaski: ' + brojSamoglaski +"\n" +
                'Parnost: ' + paren);
            return;
            }
    res.end('Nepoznzata ruta');
}


const server = http.createServer(handler);
server.listen(10000, (err) => {
    if (err) 
        return console.log(err.message);
    console.log("Serverot e startuvan");    
        
});