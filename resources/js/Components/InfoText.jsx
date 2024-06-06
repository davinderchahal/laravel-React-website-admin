export default function InfoText({ value, className = '' }) {
    return (
        (value) ? <small className={'form-text text-muted' + className} >{value}</small> : ''

    );
}
