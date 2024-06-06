import { useEffect, useRef } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import UploadedImage from '@/Components/UploadedImage';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { showSessionMsg } from '@/Components/Session';
import { useForm, Head } from '@inertiajs/react';


export default function PageBanner({ auth, pageBanner }) {
    const imageOneRef = useRef();
    const imageTwoRef = useRef();
    const imageThreeRef = useRef();
    const formRef = useRef();

    const { data, setData, post, processing, clearErrors, setDefaults, errors } = useForm({
        image_one: null,
        image_two: null,
        image_three: null,
        _method: 'put',
    });

    const handleImage = (e) => {
        const name = e.target.name;
        const value = e.target.files[0]
        setData(data => ({
            ...data,
            [name]: value,
        }))
    }

    useEffect(() => {
        const method = formRef.current.getAttribute('data-method');
        setData('_method', method);
    }, [pageBanner]);

    const submit = (e) => {
        e.preventDefault();
        post(e.target.action, {
            onSuccess: () => {
                showSessionMsg();
                clearErrors();
                setDefaults({
                    image_one: '',
                    image_two: '',
                    image_three: '',
                });
                imageOneRef.current.value = "";
                imageTwoRef.current.value = "";
                imageThreeRef.current.value = "";
            }
        });
    }

    const title = 'Page Banner';
    return (
        <AuthenticatedLayout user={auth.user} header={title} >
            <Head title={title} />
            <div className="row">
                <div className="col-md-12">
                    <div className="card card-tasks h-auto">
                        <div className="card-header">
                            <h4 className="title d-inline">{title}</h4>
                        </div>
                        <form method='post' action={(pageBanner) ? route('page-banner.update', pageBanner) : route('page-banner.store')} data-method={(pageBanner) ? 'put' : 'post'} ref={formRef} encType="multipart/form-data" autoComplete="off" onSubmit={submit}>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-3">
                                        <InputLabel value="About Banner" />
                                        <TextInput
                                            type="file"
                                            name="image_one"
                                            ref={imageOneRef}
                                            className='mb-0'
                                            errors={errors.image_one}
                                            infoText='Minimum Dimensions 1920X700'
                                            onChange={handleImage}
                                        />
                                        <UploadedImage src={(pageBanner) ? pageBanner.about_banner : ''} alt="About Banner" />
                                    </div>
                                    <div className="col-3">
                                        <InputLabel value="Contact Banner" />
                                        <TextInput
                                            type="file"
                                            name="image_two"
                                            ref={imageTwoRef}
                                            className='mb-0'
                                            errors={errors.image_two}
                                            infoText='Minimum Dimensions 1920X700'
                                            onChange={handleImage}
                                        />
                                        <UploadedImage src={(pageBanner) ? pageBanner.contact_banner : ''} alt="Contact Banner" />
                                    </div>
                                    <div className="col-3">
                                        <InputLabel value="FAQs Banner" />
                                        <TextInput
                                            type="file"
                                            name="image_three"
                                            ref={imageThreeRef}
                                            className='mb-0'
                                            errors={errors.image_three}
                                            infoText='Minimum Dimensions 1920X700'
                                            onChange={handleImage}
                                        />
                                        <UploadedImage src={(pageBanner) ? pageBanner.faqs_banner : ''} alt="FAQs Banner" />
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
