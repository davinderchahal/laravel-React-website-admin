import { useEffect, useRef } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import Checkbox from '@/Components/Checkbox';
import { showSessionMsg } from '@/Components/Session';
import { useForm, Head, Link } from '@inertiajs/react';


export default function AddEdit({ auth, faq }) {
    const formRef = useRef();

    const { data, setData, post, processing, clearErrors, errors } = useForm({
        question: (faq) ? faq.question : '',
        answer: (faq) ? faq.answer : '',
        is_show: (faq) ? (faq.is_show) ? true : false : true,
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
        setData('is_show', e.target.checked);
    }

    useEffect(() => {
        const method = formRef.current.getAttribute('data-method');
        setData('_method', method);
    }, [faq]);

    const submit = (e) => {
        e.preventDefault();
        post(e.target.action, {
            onSuccess: () => {
                showSessionMsg();
                clearErrors();
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
                            <h4 className="title d-inline">{(faq) ? 'Edit' : 'Create'} Service</h4>
                        </div>
                        <form method="post" action={(faq) ? route('faq.update', faq) : route('faq.store')} data-method={(faq) ? 'put' : 'post'} ref={formRef} encType="multipart/form-data" autoComplete="off" onSubmit={submit}>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-12">
                                        <InputLabel value="Question" />
                                        <TextInput
                                            name="question"
                                            value={data.question}
                                            errors={errors.question}
                                            placeholder="Question"
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-12">
                                        <InputLabel value="Answer" />
                                        <TextInput
                                            name="answer"
                                            type="textarea"
                                            value={data.answer}
                                            errors={errors.answer}
                                            placeholder="Answer"
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form-check col-4 pl-3">
                                        <Checkbox
                                            name="is_show"
                                            text="Is Show"
                                            checked={data.is_show}
                                            onChange={handleCheckBox}
                                        />
                                        <InputError message={errors.is_show} />
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer">
                                <button type="submit" className="btn btn-fill btn-primary" disabled={processing}>{(faq) ? 'Update' : 'Save'}</button>
                                <Link href={route('faq.index')} className="btn btn-fill btn-danger" as="button">
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
