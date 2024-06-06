import { forwardRef, useEffect, useRef } from 'react';
import InputError from '@/Components/InputError';
import InfoText from '@/Components/InfoText';
export default forwardRef(function TextInput({ type = 'text', className = '', errors = '', infoText = '', isFocused = false, ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <>
            {type == 'textarea'
                ? <textarea
                    {...props}
                    className={'form-control ' + (errors.length ? 'is-invalid ' : '') + className}
                    ref={input}
                >
                </textarea>
                : <input
                    {...props}
                    type={type}
                    className={'form-control ' + (errors.length ? 'is-invalid ' : '') + className}
                    ref={input}
                />
            }
            <InfoText value={infoText} />
            {Array.isArray(errors)
                ? errors.map((value, index) => {
                    return <InputError message={value} key={index} />
                })
                : <InputError message={errors} />
            }
        </>
    );
});
