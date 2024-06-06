import { useRef } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import UploadedImage from '@/Components/UploadedImage';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Checkbox from '@/Components/Checkbox';
import TextInput from '@/Components/TextInput';
import { showSessionMsg } from '@/Components/Session';
import { useForm, Head } from '@inertiajs/react';


export default function Banner({ auth, banner }) {
    const imageRef = useRef();
    const { data, setData, post, processing, clearErrors, setDefaults, errors } = useForm({
        title: (banner.title) ? banner.title : '',
        description: (banner.description) ? banner.description : '',
        btn_text: (banner.btn_text) ? banner.btn_text : '',
        btn_link: (banner.btn_link) ? banner.btn_link : '',
        show_btn: (banner.show_btn) ? true : false,
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
    const handleCheckBox = (e) => {
        setData('show_btn', e.target.checked);
    }
    const handleImage = (e) => {
        setData('file', e.target.files[0]);
    }
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

    const title = 'Banner';
    return (
        <AuthenticatedLayout user={auth.user} header={title} >
            <Head title={title} />
            <div className="row">
                <div className="col-md-12">
                    <div className="card card-tasks h-auto">
                        <div className="card-header">
                            <h4 className="title d-inline">{title}</h4>
                        </div>
                        <form method="post" action={route('banners.update', banner)} encType="multipart/form-data" autoComplete="off" onSubmit={submit}>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-12">
                                        <InputLabel value="Banner Title" />
                                        <TextInput
                                            name="title"
                                            value={data.title}
                                            errors={errors.title}
                                            placeholder="Banner Title"
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <InputLabel value="Banner Description" />
                                        <TextInput
                                            name="description"
                                            type="textarea"
                                            value={data.description}
                                            errors={errors.description}
                                            placeholder="Banner Description"
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4">
                                        <InputLabel value="Button Text" />
                                        <TextInput
                                            name="btn_text"
                                            value={data.btn_text}
                                            errors={errors.btn_text}
                                            placeholder="Button Text"
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-4">
                                        <InputLabel value="Button Link" />
                                        <TextInput
                                            name="btn_link"
                                            value={data.btn_link}
                                            errors={errors.btn_link}
                                            placeholder="Button Link"
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-check col-4">
                                        <Checkbox
                                            name="show_btn"
                                            text="Show Button"
                                            checked={data.show_btn}
                                            onChange={handleCheckBox}
                                        />
                                        <InputError message={errors.show_btn} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4">
                                        <InputLabel value="Banner" />
                                        <TextInput
                                            type="file"
                                            name="file"
                                            ref={imageRef}
                                            className='mb-0'
                                            errors={errors.file}
                                            infoText='Minimum Dimensions 869X570'
                                            onChange={handleImage}
                                        />
                                        <UploadedImage src={banner.image} alt="Banner" />
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
