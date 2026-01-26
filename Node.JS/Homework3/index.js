const { log } = require("console");
const {fileRead, fileWrite} = require("./readWrite.js");
const file = "students.json";


//adding student

async function addStudent(student) {
    const data = await fileRead(file);
    let students = [];

    if (data) {
        students = JSON.parse(data);
    }

    const idExist = students.find(s => s.id === student.id);

    if (idExist) {
        console.log("Postoi student so toj ID");
        return;
    }

    students.push(student);

    await fileWrite(file, JSON.stringify(students, null, 2));

    console.log("Uspesno dodaden student!");
}


//edit student name


async function updateStudent(oldName, newName) {
    const data = await fileRead('students.json');
    let students = [];

    if (data)
        students = JSON.parse(data);

    const update = students.map(student => {
        if(student.ime == oldName){
            return{
                ... student, ime: newName
            }
        }
        return student;
    });

    const textFormat = JSON.stringify(update, null, 2);
    await fileWrite(file, textFormat);

    //log
}

//delete student
async function deleteStudent(id) {
    const data = await fileRead('student.json');
    let students = [];

    if(data)
        students = JSON.parse(data);

    const deleteID = students.find(s => s.id === students.id);

    if (deleteID === -1){
        //console.log("Studentot ne e pronajden");
        return -1;
    }

    students.splice (deleteID, 1);
    await fileWrite(file, JSON.stringify(students, null, 2));

    //log
    
}

addStudent({
    id: 4,
    ime: "Filip",
    prezime: "Angelov",
    prosek: 9.2,
    grad: "Sveti Nikole"
})

updateStudent("Filip", "Filip2-smeneto");
deleteStudent(4);