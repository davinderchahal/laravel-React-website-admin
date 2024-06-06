import { useRef } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import UploadedImage from '@/Components/UploadedImage';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { showSessionMsg } from '@/Components/Session';
import { useForm, Head } from '@inertiajs/react';


export default function HomeSection({ auth, homeSection }) {
    const imageRef = useRef();
    const { data, setData, post, processing, clearErrors, setDefaults, errors } = useForm({
        sec1_tagline: (homeSection.sec1_tagline) ? homeSection.sec1_tagline : '',
        sec1_title: (homeSection.sec1_title) ? homeSection.sec1_title : '',
        sec2_tagline: (homeSection.sec2_tagline) ? homeSection.sec2_tagline : '',
        sec2_title: (homeSection.sec2_title) ? homeSection.sec2_title : '',
        video_sec_title: (homeSection.video_sec_title) ? homeSection.video_sec_title : '',
        video_sec_link: (homeSection.video_sec_link) ? homeSection.video_sec_link : '',
        video_sec_btn_text: (homeSection.video_sec_btn_text) ? homeSection.video_sec_btn_text : '',
        video_sec_btn_link: (homeSection.video_sec_btn_link) ? homeSection.video_sec_btn_link : '',
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
    const submit = (e) => {
        e.preventDefault();
        post(route('home-section.update', homeSection), {
            onSuccess: () => {
                showSessionMsg();
                clearErrors();
                setDefaults('file', '');
                imageRef.current.value = "";
            }
        });
    }

    const title = 'Home Sections';
    return (
        <AuthenticatedLayout user={auth.user} header={title} >
            <Head title={title} />
            <div className="row">
                <div className="col-md-12">
                    <div className="card card-tasks h-auto">
                        <div className="card-header">
                            <h4 className="title d-inline">Section 1</h4>
                        </div>
                        <form onSubmit={submit} autoComplete="off">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-6">
                                        <InputLabel value="Tagline" />
                                        <TextInput
                                            name="sec1_tagline"
                                            value={data.sec1_tagline}
                                            errors={errors.sec1_tagline}
                                            placeholder="Tagline"
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-6">
                                        <InputLabel value="Title" />
                                        <TextInput
                                            name="sec1_title"
                                            value={data.sec1_title}
                                            errors={errors.sec1_title}
                                            placeholder="Title"
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer">
                                <button type="submit" className="btn btn-fill btn-primary" disabled={processing}>Update</button>
                            </div>
                        </form>
                    </div>
                    <div className="card card-tasks h-auto">
                        <div className="card-header">
                            <h4 className="title d-inline">Section 2</h4>
                        </div>
                        <form onSubmit={submit} autoComplete="off">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-6">
                                        <InputLabel value="Tagline" />
                                        <TextInput
                                            name="sec2_tagline"
                                            value={data.sec2_tagline}
                                            errors={errors.sec2_tagline}
                                            placeholder="Tagline"
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-6">
                                        <InputLabel value="Title" />
                                        <TextInput
                                            name="sec2_title"
                                            value={data.sec2_title}
                                            errors={errors.sec2_title}
                                            placeholder="Title"
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer">
                                <button type="submit" className="btn btn-fill btn-primary" disabled={processing}>Update</button>
                            </div>
                        </form>
                    </div>
                    <div className="card card-tasks h-auto">
                        <div className="card-header">
                            <h4 className="title d-inline">Video Section</h4>
                        </div>
                        <form onSubmit={submit} autoComplete="off">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-6">
                                        <InputLabel value="Title" />
                                        <TextInput
                                            name="video_sec_title"
                                            value={data.video_sec_title}
                                            errors={errors.video_sec_title}
                                            placeholder="Title"
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-6">
                                        <InputLabel value="Video Url" />
                                        <TextInput
                                            name="video_sec_link"
                                            value={data.video_sec_link}
                                            errors={errors.video_sec_link}
                                            placeholder="Video Url"
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <InputLabel value="Button Text" />
                                        <TextInput
                                            name="video_sec_btn_text"
                                            value={data.video_sec_btn_text}
                                            errors={errors.video_sec_btn_text}
                                            placeholder="Button Text"
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-6">
                                        <InputLabel value="Button Link" />
                                        <TextInput
                                            name="video_sec_btn_link"
                                            value={data.video_sec_btn_link}
                                            errors={errors.video_sec_btn_link}
                                            placeholder="Button Link"
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <InputLabel value="Banner" />
                                        <TextInput
                                            type="file"
                                            name="file"
                                            ref={imageRef}
                                            className='mb-0'
                                            errors={errors.file}
                                            infoText='Minimum Dimensions 1320X324'
                                            onChange={handleImage}
                                        />
                                        <UploadedImage src={homeSection.video_sec_banner} alt="Banner" />
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer">
                                <button type="submit" className="btn btn-fill btn-primary" disabled={processing}>Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout >
    );
}
