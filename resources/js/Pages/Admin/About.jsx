import { useRef } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import UploadedImage from '@/Components/UploadedImage';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { showSessionMsg } from '@/Components/Session';
import { useForm, Head } from '@inertiajs/react';


export default function About({ auth, about }) {
    const imageOneRef = useRef();
    const imageTwoRef = useRef();
    const { data, setData, post, processing, clearErrors, reset, setDefaults, errors } = useForm({
        tagline: (about.tagline) ? about.tagline : '',
        title: (about.title) ? about.title : '',
        description: (about.description) ? about.description : '',
        box_title: (about.box_title) ? about.box_title : '',
        box_description: (about.box_description) ? about.box_description : '',
        service_list: {
            title1: (about.service_list !== null) ? (about.service_list.hasOwnProperty('title1') && about.service_list.title1 !== null) ? about.service_list.title1 : '' : '',
            description1: (about.service_list !== null) ? (about.service_list.hasOwnProperty('description1') && about.service_list.description1 !== null) ? about.service_list.description1 : '' : '',
            title2: (about.service_list !== null) ? (about.service_list.hasOwnProperty('title2') && about.service_list.title2 !== null) ? about.service_list.title2 : '' : '',
            description2: (about.service_list !== null) ? (about.service_list.hasOwnProperty('description2') && about.service_list.description2 !== null) ? about.service_list.description2 : '' : '',
            title3: (about.service_list !== null) ? (about.service_list.hasOwnProperty('title3') && about.service_list.title3 !== null) ? about.service_list.title3 : '' : '',
            description3: (about.service_list !== null) ? (about.service_list.hasOwnProperty('description3') && about.service_list.description3 !== null) ? about.service_list.description3 : '' : '',
        },
        image_one: null,
        image_two: null,
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

    const handleImage = (e) => {
        setData(e.target.name, e.target.files[0]);
    }
    const submit = (e) => {
        e.preventDefault();
        post(e.target.action, {
            onSuccess: () => {
                showSessionMsg();
                clearErrors();
                setDefaults({
                    image_one: '',
                    image_two: '',
                });
                imageOneRef.current.value = "";
                imageTwoRef.current.value = "";
            }
        });
    }
    const title = 'About';
    return (
        <AuthenticatedLayout user={auth.user} header={title} >
            <Head title={title} />
            <div className="row">
                <div className="col-md-12">
                    <div className="card card-tasks h-auto">
                        <div className="card-header">
                            <h4 className="title d-inline">{title}</h4>
                        </div>
                        <form method="post" action={route('about.update', about)} encType="multipart/form-data" autoComplete="off" onSubmit={submit}>
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
                                    <div className="col-12">
                                        <InputLabel value="Box Title" />
                                        <TextInput
                                            name="box_title"
                                            value={data.box_title}
                                            errors={errors.box_title}
                                            placeholder="Box Title"
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <InputLabel value="Box Description" />
                                        <TextInput
                                            name="box_description"
                                            type="textarea"
                                            value={data.box_description}
                                            errors={errors.box_description}
                                            placeholder="Box Description"
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <InputLabel value="Sub Title 1" />
                                        <TextInput
                                            name="service_list.title1"
                                            value={data.service_list.title1}
                                            errors={errors.hasOwnProperty('service_list.title1') ? errors['service_list.title1'] : ''}
                                            placeholder="Sub Title 1"
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <InputLabel value="Sub Description 1" />
                                        <TextInput
                                            name="service_list.description1"
                                            type="textarea"
                                            value={data.service_list.description1}
                                            errors={errors.hasOwnProperty('service_list.description1') ? errors['service_list.description1'] : ''}
                                            placeholder="Sub Description 1"
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <InputLabel value="Sub Title 2" />
                                        <TextInput
                                            name="service_list.title2"
                                            value={data.service_list.title2}
                                            errors={errors.hasOwnProperty('service_list.title2') ? errors['service_list.title2'] : ''}
                                            placeholder="Sub Title 2"
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <InputLabel value="Sub Description 2" />
                                        <TextInput
                                            name="service_list.description2"
                                            type="textarea"
                                            value={data.service_list.description2}
                                            errors={errors.hasOwnProperty('service_list.description2') ? errors['service_list.description2'] : ''}
                                            placeholder="Sub Description 2"
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <InputLabel value="Sub Title 3" />
                                        <TextInput
                                            name="service_list.title3"
                                            value={data.service_list.title3}
                                            errors={errors.hasOwnProperty('service_list.title3') ? errors['service_list.title3'] : ''}
                                            placeholder="Sub Title 3"
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <InputLabel value="Sub Description 3" />
                                        <TextInput
                                            name="service_list.description3"
                                            type="textarea"
                                            value={data.service_list.description3}
                                            errors={errors.hasOwnProperty('service_list.description3') ? errors['service_list.description3'] : ''}
                                            placeholder="Sub Description 3"
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4">
                                        <InputLabel value="Image One" />
                                        <TextInput
                                            type="file"
                                            name="image_one"
                                            ref={imageOneRef}
                                            className='mb-0'
                                            errors={errors.image_one}
                                            infoText="Minimum Dimensions 451X652"
                                            onChange={handleImage}
                                        />
                                        <UploadedImage src={about.thumb_one} alt="Image One" />
                                    </div>
                                    <div className="col-4">
                                        <InputLabel value="Image Two" />
                                        <TextInput
                                            type="file"
                                            name="image_two"
                                            ref={imageTwoRef}
                                            className='mb-0'
                                            errors={errors.image_two}
                                            infoText="Minimum Dimensions 305X441"
                                            onChange={handleImage}
                                        />
                                        <UploadedImage src={about.thumb_two} alt="Image Two" />
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
