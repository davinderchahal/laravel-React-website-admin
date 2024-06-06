export default function UploadedImage({ src, className = 'mt-3', width = '100', ...props }) {
    const storagePath = window.storageUrl;
    return (
        (storagePath && src) ? <a href={storagePath + src} target="_blank"><img {...props} src={storagePath + src} className={className} width={width} /></a> : ''
    );
}
