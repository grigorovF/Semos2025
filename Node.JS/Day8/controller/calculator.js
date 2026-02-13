const fs = require("fs");

//! _dirname e apsolutna pateka na aplikacija
// parsiranje na templejt i objektot so informacii
//readfile

const parseTemplate = async(template, object = null) => {
    return new Promise ((succ, fail) => {
        fs.readFile(`${__dirname}/../views/${template}`, "utf8", 
            (err, content) => {
                if (err){
                return fail(err);
                }
                if (object){
                    for (property in object){
                        content = content.replaceAll(`{{${property}}}`, object[property]);
                    }
                }
                return succ(content);
            });
    });
};

const bmiCalcullator = async (req, res) => {
    const weight = req.params.weight;
    const height = req.params.weight;
    const bmi = weight /(height*height);

    const response = await parseTemplate("calculator.html", {
        data: bmi,
        "ime": "Filip",
        "test": "testiraj",
    });

    res.send(response);
}

const  test = async (req, res) => {
    const response = await parseTemplate("calculator.html");
    res.send(response);
}

module.exports = {
    bmiCalcullator,
    test,
}