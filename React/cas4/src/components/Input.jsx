
export const Input = ({ type, placeholder, value, onChange, name }) => {

    return (
        <p>
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                name={name}
            />
            {name === 'togglePass' && <button className="eye-button">
                <i className="fa fa-eye"></i>
            </button>}
        </p>
    )
}