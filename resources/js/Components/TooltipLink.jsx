import { Link } from '@inertiajs/react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

export default function TooltipLink({ url, className = '', title = '', children, ...props }) {
    return (
        <OverlayTrigger overlay={<Tooltip >{title}</Tooltip>}>
            <Link href={url} className={className} {...props}>
                {children}
            </Link>
        </OverlayTrigger>
    );
}
