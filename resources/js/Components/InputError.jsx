export default function InputError({ message, className = '', ...props }) {
    return message ? (
        <span {...props} className={'invalid-feedback mt-2' + className} role="alert">{message}</span>
    ) : null;
}
