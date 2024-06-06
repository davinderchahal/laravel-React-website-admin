import InputLabel from '@/Components/InputLabel';
export default function Checkbox({ text = '', className = '', ...props }) {
    const checkStyle = {
        top: '33%'
    };
    return (
        <InputLabel className="form-check-label" value="" style={checkStyle}>
            <input
                {...props}
                type="checkbox"
                className={'form-check-input ' + className}
            />
            <span className="form-check-sign"></span>
            {text}
        </InputLabel>

    );
}
