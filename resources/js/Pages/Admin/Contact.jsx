import { useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { showSessionMsg } from '@/Components/Session';
import { useForm, Head } from '@inertiajs/react';


export default function Contact({ auth, contact }) {
    const { data, setData, post, processing, clearErrors, setDefaults, errors } = useForm({
        tagline: (contact.tagline) ? contact.tagline : '',
        title: (contact.title) ? contact.title : '',
        description: (contact.description) ? contact.description : '',
        phone: (contact.phone) ? contact.phone : '',
        email: (contact.email) ? contact.email : '',
        address: (contact.address) ? contact.address : '',
        social_media: {
            facebook: (contact.social_media !== null) ? (contact.social_media.hasOwnProperty('facebook') && contact.social_media.facebook !== null) ? contact.social_media.facebook : '' : '',
            insta: (contact.social_media !== null) ? (contact.social_media.hasOwnProperty('insta') && contact.social_media.insta !== null) ? contact.social_media.insta : '' : '',
            linkedin: (contact.social_media !== null) ? (contact.social_media.hasOwnProperty('linkedin') && contact.social_media.linkedin !== null) ? contact.social_media.linkedin : '' : '',
            twitter: (contact.social_media !== null) ? (contact.social_media.hasOwnProperty('twitter') && contact.social_media.twitter !== null) ? contact.social_media.twitter : '' : '',
            youtube: (contact.social_media !== null) ? (contact.social_media.hasOwnProperty('youtube') && contact.social_media.youtube !== null) ? contact.social_media.youtube : '' : '',
        },
        _method: 'PUT',
    });

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value
        var nameSplit = name.split(".");
        if (nameSplit.length > 1) {
            var serviceList = nameSplit[0];
            var inputKey = nameSplit[1];
            var updatedValues = {};
            updatedValues[inputKey] = value;
            var serviceListObj = data[serviceList];
            serviceListObj = Object.assign(serviceListObj, updatedValues);
            setData(data => ({
                ...data,
                [serviceList]: serviceListObj,
            }))
        }
        setData(data => ({
            ...data,
            [name]: value,
        }))
    }

    const submit = (e) => {
        e.preventDefault();
        post(e.target.action, {
            onSuccess: () => {
                showSessionMsg();
                clearErrors();
            }
        });
    }

    const title = 'Contact';
    return (
        <AuthenticatedLayout user={auth.user} header={title} >
            <Head title={title} />
            <div className="row">
                <div className="col-md-12">
                    <div className="card card-tasks h-auto">
                        <div className="card-header">
                            <h4 className="title d-inline">{title}</h4>
                        </div>
                        <form method="post" action={route('contact.update', contact)} encType="multipart/form-data" autoComplete="off" onSubmit={submit}>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-12">
                                        <InputLabel value="Tagline" />
                                        <TextInput
                                            name="tagline"
                                            value={data.tagline}
                                            errors={errors.tagline}
                                            placeholder="Tagline"
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <InputLabel value="Title" />
                                        <TextInput
                                            name="title"
                                            value={data.title}
                                            errors={errors.title}
                                            placeholder="Title"
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <InputLabel value="Description" />
                                        <TextInput
                                            name="description"
                                            type="textarea"
                                            value={data.description}
                                            errors={errors.description}
                                            placeholder="Description"
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4">
                                        <InputLabel value="Phone" />
                                        <TextInput
                                            name="phone"
                                            value={data.phone}
                                            errors={errors.phone}
                                            placeholder="Phone"
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-4">
                                        <InputLabel value="Email" />
                                        <TextInput
                                            name="email"
                                            value={data.email}
                                            errors={errors.email}
                                            placeholder="Email"
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-4">
                                        <InputLabel value="Address" />
                                        <TextInput
                                            name="address"
                                            value={data.address}
                                            errors={errors.address}
                                            placeholder="Address"
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <InputLabel value="Facebook Link" />
                                        <TextInput
                                            name="social_media.facebook"
                                            value={data.social_media.facebook}
                                            errors={errors.hasOwnProperty('social_media.facebook') ? errors['social_media.facebook'] : ''}
                                            placeholder="Facebook Link"
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-6">
                                        <InputLabel value="Instagram Link" />
                                        <TextInput
                                            name="social_media.insta"
                                            value={data.social_media.insta}
                                            errors={errors.hasOwnProperty('social_media.insta') ? errors['social_media.insta'] : ''}
                                            placeholder="Instagram Link"
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-6">
                                        <InputLabel value="Linkedin Link" />
                                        <TextInput
                                            name="social_media.linkedin"
                                            value={data.social_media.linkedin}
                                            errors={errors.hasOwnProperty('social_media.linkedin') ? errors['social_media.linkedin'] : ''}
                                            placeholder="Linkedin Link"
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-6">
                                        <InputLabel value="Twitter Link" />
                                        <TextInput
                                            name="social_media.twitter"
                                            value={data.social_media.twitter}
                                            errors={errors.hasOwnProperty('social_media.twitter') ? errors['social_media.twitter'] : ''}
                                            placeholder="Twitter Link"
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-6">
                                        <InputLabel value="Youtube Link" />
                                        <TextInput
                                            name="social_media.youtube"
                                            value={data.social_media.youtube}
                                            errors={errors.hasOwnProperty('social_media.youtube') ? errors['social_media.youtube'] : ''}
                                            placeholder="Youtube Link"
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer">
                                <button type="submit" className="btn btn-fill btn-primary" disabled={processing}>Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
