import { useState, useEffect } from 'react';
import AssetsImage from '@/Components/AssetsImage';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login() {
    const [emailBorder, setEmailBorder] = useState(false);
    const [passBorder, setPasBorder] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
    });
    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const handleInputFocus = (e) => {
        const name = e.target.name;
        (name === 'email') ? setEmailBorder(true) : setPasBorder(true);
    };

    const handleInputBlur = (e) => {
        const name = e.target.name;
        (name === 'email') ? setEmailBorder(false) : setPasBorder(false);
    };

    const borderColorFocus = {
        borderColor: '#e14eca'
    };
    const borderColorNotFocus = {
        borderColor: 'rgba(29, 37, 59, 0.2)'
    };
    const errorBorderColor = {
        borderColor: '#ec250d'
    };
    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <GuestLayout>
            <Head title="Login" />
            <div className="col-lg-4 col-md-6 ml-auto mr-auto">
                <form onSubmit={submit}>
                    <div className="card card-login card-white">
                        <div className="card-header">
                            <AssetsImage src="img/card-primary.png" alt="" />
                            <h1 className="card-title">Log In</h1>
                        </div>
                        <div className="card-body">
                            <p className="text-dark mb-2">Sign in with <strong>email</strong> and the <strong>password</strong></p>

                            <div className={errors.hasOwnProperty('email') ? 'input-group has-danger' : 'input-group'}>
                                <div className="input-group-prepend">
                                    <div className="input-group-text" style={errors.hasOwnProperty('email') ? errorBorderColor : emailBorder ? borderColorFocus : borderColorNotFocus}>
                                        <i className="tim-icons icon-email-85"></i>
                                    </div>
                                </div>
                                <TextInput
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    errors={errors.email}
                                    placeholder="Email"
                                    onChange={(e) => setData('email', e.target.value)}
                                    onFocus={handleInputFocus}
                                    onBlur={handleInputBlur}
                                />
                            </div>
                            <div className={errors.hasOwnProperty('password') ? 'input-group has-danger' : 'input-group'}>
                                <div className="input-group-prepend">
                                    <div className="input-group-text" style={errors.hasOwnProperty('password') ? errorBorderColor : passBorder ? borderColorFocus : borderColorNotFocus}>
                                        <i className="tim-icons icon-lock-circle"></i>
                                    </div>
                                </div>
                                <TextInput
                                    type="password"
                                    name="password"
                                    errors={errors.password}
                                    placeholder="Password"
                                    autoComplete="current-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                    onFocus={handleInputFocus}
                                    onBlur={handleInputBlur}
                                />
                            </div>
                        </div>
                        <div className="card-footer">
                            <button type="submit" href="" className="btn btn-primary btn-lg btn-block mb-3" disabled={processing}>Login</button>
                        </div>
                    </div>
                </form>
            </div>
        </GuestLayout>
    );
}
