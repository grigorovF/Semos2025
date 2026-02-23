const express = require("express");
const db = require("./pkg/db/index");
const movies = require("./handler/movies")
const actors = require("./handler/actors")
const app = express();

//*POVIK MIDDELWARE
app.use(express.urlencoded({extended:true}));
app.use(express.json());

db.init();

//CRUD
app.get("/movies", movies.getAll);
app.get("/movies/:id", movies.getOne);
app.post("/movies", movies.create);
app.patch("/movies:id", movies.update);
app.delete("/movies:id", movies.delete);


app.get("/actors", actors.getAll);
app.get("/actors/:id", actors.getOne);
app.post("/actors", actors.createActor);
app.patch("/actors/:id", actors.updateActor);
app.delete("/actors/:id", actors.deleteActor);

app.listen(process.env.PORT, (err) => {
    if (err)
        return console.log(err.message);
    console.log(`Suuc started on port ${process.env.PORT}`)
})