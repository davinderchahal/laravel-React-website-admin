import AdminSidebar from '@/Components/AdminSidebar';
import AdminNav from '@/Components/AdminNav';
import AdminFooter from '@/Components/AdminFooter';


export default function Authenticated({ user, header, children }) {
    return (
        <div className="wrapper">
            <AdminSidebar />
            <div className="main-panel">
                <AdminNav user={user} header={header} />
                <div className="content">
                    <main>{children}</main>
                </div>
                <AdminFooter />
            </div>
        </div>
    );
}
