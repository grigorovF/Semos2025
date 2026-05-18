export const Welcome = (props) => {
    console.log(props)

    return (
        <div>
            <h2>Name: {props.name}, Lastname: {props.lastName}</h2>
            <p>Age: {props.age}</p>
        </div>
    )
}