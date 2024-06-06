export default function AssetsImage({ src = '', ...props }) {
    const imgPath = window.imgSrc;
    return (
        (imgPath) ? <img src={imgPath + src} {...props} /> : ''
    );
}
