
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { showSessionMsg } from '@/Components/Session';
import { Link, useForm, usePage } from '@inertiajs/react';


export default function UpdateProfileInformation({ mustVerifyEmail, status }) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing } = useForm({
        name: user.name,
        email: user.email,
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('profile.update'), { onSuccess: () => showSessionMsg() });
    };

    return (
        <div className="card card-tasks h-auto">
            <div className="card-header">
                <h4 className="title d-inline"> Profile Information</h4>
                <p className="mt-1 text-sm text-gray-600">
                    Update your account's profile information and email address.
                </p>
            </div>
            <form onSubmit={submit}>
                <div className="card-body">
                    <div className="row">
                        <div className="col-6">
                            <div>
                                <InputLabel value="Name" />
                                <TextInput
                                    name="name"
                                    className="mt-1 block w-full"
                                    value={data.name}
                                    errors={errors.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                    isFocused
                                    autoComplete="name"
                                />
                            </div>
                            <div>
                                <InputLabel value="Email" />
                                <TextInput
                                    name="email"
                                    type="email"
                                    value={data.email}
                                    errors={errors.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                    autoComplete="username"
                                />
                            </div>
                            {mustVerifyEmail && user.email_verified_at === null && (
                                <div>
                                    <p className="text-sm mt-2 text-gray-800">
                                        Your email address is unverified.
                                        <Link
                                            href={route('verification.send')}
                                            method="post"
                                            as="button"
                                            className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            Click here to re-send the verification email.
                                        </Link>
                                    </p>

                                    {status === 'verification-link-sent' && (
                                        <p className="mt-2 font-medium text-sm text-green-600">
                                            A new verification link has been sent to your email address.
                                        </p>
                                    )}
                                </div>
                            )}
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
