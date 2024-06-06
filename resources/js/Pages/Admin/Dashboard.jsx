import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { showSessionMsg } from '@/Components/Session';
import { useForm, Head } from '@inertiajs/react';

export default function Dashboard({ auth, enquiries }) {
    const { patch } = useForm();
    const statusChange = (e) => {
        e.preventDefault();
        patch(e.target.href, { onSuccess: () => showSessionMsg() });
    };
    const title = 'Dashboard';;
    return (
        <AuthenticatedLayout user={auth.user} header={title} >
            <Head title={title} />

            <div className="row">
                <div className="col-md-12">
                    <div className="card ">
                        <div className="card-header">
                            <h4 className="card-title">Manage Enquiry</h4>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table tablesorter" id="">
                                    <thead className=" text-primary">
                                        <tr>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Phone</th>
                                            <th>Subject</th>
                                            <th>Message</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {enquiries.map(enquiry =>
                                            <tr key={enquiry.id}>
                                                <td>{enquiry.name}</td>
                                                <td>{enquiry.email}</td>
                                                <td>{enquiry.phone}</td>
                                                <td>{enquiry.subject}</td>
                                                <td>{enquiry.message}</td>
                                                <td>
                                                    <a href={route('enquiry.status', enquiry)} className={(enquiry.is_attended == 1) ? 'btn btn-sm btn-success' : 'btn btn-sm btn-warning'} onClick={statusChange} title="Change Status" data-toggle="tooltip">
                                                        {(enquiry.is_attended) ? 'Attended' : 'Unattended'}
                                                    </a>
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
