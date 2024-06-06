import { useEffect, useRef } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import UploadedImage from '@/Components/UploadedImage';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import TooltipLink from '@/Components/TooltipLink';
import { swalWithBootstrapButtons } from '@/Components/SweetAlert';
import { showSessionMsg } from '@/Components/Session';
import { useForm, Head } from '@inertiajs/react';


export default function Gallery({ auth, images }) {
    const imageRef = useRef();

    const { data, setData, post, processing, clearErrors, setDefaults, errors } = useForm({
        files: []
    });
    const { delete: destroy } = useForm();

    const handleImage = (e) => {
        const name = e.target.name;
        const value = e.target.files
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
                setDefaults({
                    files: [],
                });
                imageRef.current.value = "";
            }
        });
    }
    const deleteRecord = (e) => {
        e.preventDefault();
        const url = e.currentTarget.href;
        swalWithBootstrapButtons.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                destroy(url, { onSuccess: () => showSessionMsg() })
            }
        });
    };

    const imgStyle = {
        position: 'absolute',
        top: 0,
        right: '27px'
    };

    const title = 'Gallery';
    return (
        <AuthenticatedLayout user={auth.user} header={title} >
            <Head title={title} />
            <div className="row">
                <div className="col-md-12">
                    <div className="card card-tasks h-auto">
                        <div className="card-header">
                            <h4 className="title d-inline">{title}</h4>
                        </div>
                        <form method='post' action={route('image.store')} encType="multipart/form-data" autoComplete="off" onSubmit={submit}>
                            <div className="card-body">
                                <div className="row">
                                    <div className='col-4'>
                                        <InputLabel value="Images" />
                                        <TextInput
                                            type="file"
                                            name="files"
                                            className='mb-0'
                                            ref={imageRef}
                                            errors={Object.values(errors)}
                                            infoText='Minimum Dimensions 416X533'
                                            onChange={handleImage}
                                            multiple
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
            {images.length
                ? <div className="row">
                    <div className="col-md-12">
                        <div className="card card-tasks h-auto">
                            <div className="card-body">
                                <div className="row">
                                    {images.map(image =>
                                        <div className="col-3 mb-3" key={image.id}>
                                            <UploadedImage src={image.image} className="float-left ml-1" alt="Image" width="200" height="200" />
                                            <TooltipLink url={route('image.destroy', image.id)} className="btn btn-sm btn-danger btn-round btn-icon" onClick={deleteRecord} title="Delete" style={imgStyle} >
                                                <i className="tim-icons icon-simple-remove"></i>
                                            </TooltipLink>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                : ''
            }
        </AuthenticatedLayout>
    );
}
