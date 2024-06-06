import { useRef } from 'react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { showSessionMsg } from '@/Components/Session';
import { useForm } from '@inertiajs/react';


export default function UpdatePasswordForm() {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const { data, setData, errors, put, reset, processing } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => { reset(); showSessionMsg() },
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <div className="card card-tasks h-auto">
            <div className="card-header">
                <h4 className="title d-inline"> Update Password</h4>
                <p className="mt-1 text-sm text-gray-600">
                    Ensure your account is using a long, random password to stay secure.
                </p>
            </div>
            <form onSubmit={updatePassword}>
                <div className="card-body">
                    <div className="row">
                        <div className="col-6">
                            <div>
                                <InputLabel value="Current Password" />
                                <TextInput
                                    type="password"
                                    name="current_password"
                                    value={data.current_password}
                                    errors={errors.current_password}
                                    ref={currentPasswordInput}
                                    onChange={(e) => setData('current_password', e.target.value)}
                                    autoComplete="current-password"
                                />
                            </div>
                            <div>
                                <InputLabel value="New Password" />
                                <TextInput
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    errors={errors.password}
                                    ref={passwordInput}
                                    onChange={(e) => setData('password', e.target.value)}
                                    autoComplete="new-password"
                                />
                            </div>
                            <div>
                                <InputLabel value="Confirm Password" />
                                <TextInput
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    errors={errors.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    autoComplete="new-password"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-footer">
                    <button type="submit" className="btn btn-fill btn-primary" disabled={processing}>Update</button>
                </div>
            </form>
        </div>
    );
}
