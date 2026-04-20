
export const Input = ({ type, placeholder, value, onChange, name, setTogle }) => {

    return (
        <p>
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                name={name}
            />
            {name === 'togglePass' && <button type='button' onClick={setTogle} className="eye-button">
                <i className={type === 'password' ? 'fa fa-eye' : 'fa fa-eye-slash'} > </i>
            </button>}
        </p>
    )
}