import { useEffect, useRef } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import UploadedImage from '@/Components/UploadedImage';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { showSessionMsg } from '@/Components/Session';
import { useForm, Head, Link } from '@inertiajs/react';


export default function AddEdit({ auth, service }) {
    const imageRef = useRef();
    const formRef = useRef();

    const { data, setData, post, processing, clearErrors, setDefaults, errors } = useForm({
        title: (service) ? service.title : '',
        icon: (service) ? service.icon : '',
        description: (service) ? service.description : '',
        file: null,
        _method: 'PUT',
    });

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value
        setData(data => ({
            ...data,
            [name]: value,
        }))
    }

    const handleImage = (e) => {
        setData('file', e.target.files[0]);
    }

    useEffect(() => {
        const method = formRef.current.getAttribute('data-method');
        setData('_method', method);
    }, [service]);

    const submit = (e) => {
        e.preventDefault();
        post(e.target.action, {
            onSuccess: () => {
                showSessionMsg();
                clearErrors();
                setDefaults('file', '');
                imageRef.current.value = "";
            }
        });
    }

    const title = 'Service';
    return (
        <AuthenticatedLayout user={auth.user} header={title} >
            <Head title={title} />
            <div className="row">
                <div className="col-md-12">
                    <div className="card card-tasks h-auto">
                        <div className="card-header">
                            <h4 className="title d-inline">{(service) ? 'Edit' : 'Create'} Service</h4>
                        </div>
                        <form method="post" action={(service) ? route('service.update', service) : route('service.store')} data-method={(service) ? 'put' : 'post'} ref={formRef} encType="multipart/form-data" autoComplete="off" onSubmit={submit}>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-8">
                                        <InputLabel value="Title" />
                                        <TextInput
                                            name="title"
                                            value={data.title}
                                            errors={errors.title}
                                            placeholder="Title"
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-4">
                                        <InputLabel value="Icon" />
                                        <TextInput
                                            name="icon"
                                            value={data.icon}
                                            errors={errors.icon}
                                            placeholder="Icon"
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
                                            message={errors.description}
                                            placeholder="Description"
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4">
                                        <InputLabel value="Image" />
                                        <TextInput
                                            type="file"
                                            name="file"
                                            ref={imageRef}
                                            className='mb-0'
                                            errors={errors.file}
                                            infoText='Minimum Dimensions 1024X700'
                                            onChange={handleImage}
                                        />
                                        <UploadedImage src={(service) ? service.image : ''} alt="Image" />
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer">
                                <button type="submit" className="btn btn-fill btn-primary" disabled={processing}>{(service) ? 'Update' : 'Save'}</button>
                                <Link href={route('service.index')} className="btn btn-fill btn-danger" as="button">
                                    Cancel
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
