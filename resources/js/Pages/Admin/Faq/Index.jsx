import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TooltipLink from '@/Components/TooltipLink';
import { swalWithBootstrapButtons } from '@/Components/SweetAlert';
import { showSessionMsg } from '@/Components/Session';
import { Head, Link, useForm } from '@inertiajs/react';


export default function Index({ auth, faqs }) {
    const { delete: destroy } = useForm();
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

    const thStyle = {
        width: '12%'
    }
    const title = 'Service';
    return (
        <AuthenticatedLayout user={auth.user} header={title} >
            <Head title={title} />
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <div className="row">
                                <div className="col-8">
                                    <h4 className="card-title">Manage FAQs</h4>
                                </div>
                                <div className="col-4 text-right">
                                    <Link href={route('faq.create')} className="btn btn-sm btn-primary" as="button">
                                        Create FAQ
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table tablesorter">
                                    <thead className=" text-primary">
                                        <tr>
                                            <th>Question</th>
                                            <th>Answer</th>
                                            <th>Status</th>
                                            <th style={thStyle}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {faqs.map(faq =>
                                            <tr key={faq.id}>
                                                <td>{faq.question}</td>
                                                <td>{faq.answer}</td>
                                                <td>{(faq.is_show) ? 'Show' : 'Not Show'}</td>
                                                <td>
                                                    <TooltipLink url={route('faq.edit', faq)} className="btn btn-sm btn-info btn-round btn-icon float-left" title="Edit" as="button" >
                                                        <i className="tim-icons icon-pencil"></i>
                                                    </TooltipLink>

                                                    <TooltipLink url={route('faq.destroy', faq)} className="btn btn-sm btn-danger btn-round btn-icon" onClick={deleteRecord} title="Delete" >
                                                        <i className="tim-icons icon-trash-simple"></i>
                                                    </TooltipLink>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
