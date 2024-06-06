import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TooltipLink from '@/Components/TooltipLink';
import UploadedImage from '@/Components/UploadedImage';
import { swalWithBootstrapButtons } from '@/Components/SweetAlert';
import { showSessionMsg } from '@/Components/Session';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Index({ auth, services }) {
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
                                    <h4 className="card-title">Manage Services</h4>
                                </div>
                                <div className="col-4 text-right">
                                    <Link href={route('service.create')} className="btn btn-sm btn-primary" as="button">
                                        Create Service
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table tablesorter">
                                    <thead className=" text-primary">
                                        <tr>
                                            <th>Title</th>
                                            <th>Description</th>
                                            <th>Icon</th>
                                            <th>Image</th>
                                            <th style={thStyle}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {services.map(service =>
                                            <tr key={service.id}>
                                                <td>{service.title}</td>
                                                <td>{service.description}</td>
                                                <td>{service.icon}</td>
                                                <td>
                                                    <UploadedImage src={service.image} alt="Image" />
                                                </td>

                                                <td>
                                                    <TooltipLink url={route('service.edit', service)} className="btn btn-sm btn-info btn-round btn-icon float-left" title="Edit" as="button">
                                                        <i className="tim-icons icon-pencil"></i>
                                                    </TooltipLink>

                                                    <TooltipLink url={route('service.destroy', service)} className="btn btn-sm btn-danger btn-round btn-icon" onClick={deleteRecord} title="Delete" >
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
