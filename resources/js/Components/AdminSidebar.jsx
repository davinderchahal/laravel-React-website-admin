import NavLink from '@/Components/NavLink';
export default function AdminSidebar() {
    return (
        <div className="sidebar">
            <div className="sidebar-wrapper">
                <div className="logo">
                    <a href="#" className="simple-text logo-mini">AD</a>
                    <a href="#" className="simple-text logo-normal">Admin</a>
                </div>
                <ul className="nav">
                    <NavLink actionName='dashboard' actionTitle='Dashboard' iconClass='icon-support-17' />
                    <NavLink actionName='banners.index' actionTitle='Banner' iconClass='icon-bold' />
                    <NavLink actionName='about.index' actionTitle='About' iconClass='icon-paper' />
                    <NavLink actionName='home-section.index' actionTitle='Home' iconClass='icon-world' />
                    <NavLink actionName='contact.index' actionTitle='Contact' iconClass='icon-square-pin' />
                    <NavLink actionName='page-banner.index' actionTitle='Page Banner' iconClass='icon-image-02' />
                    <NavLink actionName='service.index' actionTitle='Service' iconClass='icon-bullet-list-67' />
                    <NavLink actionName='faq.index' actionTitle='FAQs' iconClass='icon-chat-33' />
                    <NavLink actionName='image.index' actionTitle='Gallery' iconClass='icon-camera-18' />
                </ul>
            </div>
        </div>
    );
}
