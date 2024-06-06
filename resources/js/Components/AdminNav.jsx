import AssetsImage from '@/Components/AssetsImage';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';

export default function AdminNav({ user, header }) {
    const h5Style = {
        lineHeight: '50px'
    };
    return (
        <nav className="navbar navbar-expand-lg navbar-absolute navbar-transparent">
            <div className="container-fluid">
                <div className="navbar-wrapper">
                    <div className="navbar-toggle d-inline">
                        <button type="button" className="navbar-toggler">
                            <span className="navbar-toggler-bar bar1"></span>
                            <span className="navbar-toggler-bar bar2"></span>
                            <span className="navbar-toggler-bar bar3"></span>
                        </button>
                    </div>
                    <a className="navbar-brand" href="#">{header}</a>
                </div>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navigation" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-bar navbar-kebab"></span>
                    <span className="navbar-toggler-bar navbar-kebab"></span>
                    <span className="navbar-toggler-bar navbar-kebab"></span>
                </button>
                <div className="collapse navbar-collapse" id="navigation">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <h5 className="mb-0" style={h5Style}>{user.name}</h5>
                        </li>
                        <li className="dropdown nav-item">
                            <a href="#" className="dropdown-toggle nav-link" data-toggle="dropdown">
                                <div className="photo">
                                    <AssetsImage src="img/anime3.png" alt="Profile Photo" />
                                </div>
                                <b className="caret d-none d-lg-block d-xl-block"></b>
                                <p className="d-lg-none">Log out</p>
                            </a>
                            <ul className="dropdown-menu dropdown-navbar dropdown-black">
                                <li className="nav-link">
                                    <ResponsiveNavLink href={route('profile.edit')} className="nav-item dropdown-item">Profile</ResponsiveNavLink>
                                </li>
                                <li className="nav-link">
                                    <ResponsiveNavLink method="post" href={route('logout')} className="nav-item dropdown-item" as="button">
                                        Log Out
                                    </ResponsiveNavLink>
                                </li>
                            </ul>
                        </li>
                        <li className="separator d-lg-none"></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
