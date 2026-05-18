export const StudentFunction = (props) => {
    console.log(props);
    return (
        <div>
            <h2>Student Function</h2>
            <h3> Name: {props.student.ime} </h3>
            <h2> Last Name: {props.student.prezime} </h2>
            <h1> University: {props.student.univerzitet}</h1>
        </div>
    )
} 