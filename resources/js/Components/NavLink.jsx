import { Link } from '@inertiajs/react';

export default function NavLink({ actionName, actionTitle, iconClass = '' }) {
    return (
        <li className={route().current(actionName) ? 'active' : ''} >
            <Link href={route(actionName)} >
                <i className={'tim-icons ' + iconClass}></i>
                <p>{actionTitle}</p>
            </Link>
        </li>
    );
}
