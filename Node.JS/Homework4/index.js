const http = require('http');
const url = require('url');

const samoglaski = ['a', 'e', 'i', 'o', 'u'];

const karakteri = (name) => {

    let brojSamoglaski = 0;
    let brojSoglaski = 0;
    let brojKarakteri = name.length;
    
    for (let i=0; i<name.length; i++){
        let katakter = name[i];

        if (samoglaski.includes(katakter))
            brojSamoglaski++;
        else
            brojSoglaski++;

    }
    return {brojKarakteri, brojSamoglaski, brojSoglaski};
}

const handler = (req, res) => {
    const { pathname } = url.parse(req.url);
    const [_, route, name] = pathname.split('/');

    if (route == 'ime' && name){
        const {brojKarakteri, brojSamoglaski, brojSoglaski} = karakteri(name);

        res.end('Karakeri: ' + brojKarakteri + "\n" +
                'Soglaski: ' + brojSoglaski + "\n" +
                'Samoglaski: ' + brojSamoglaski +"\n");
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