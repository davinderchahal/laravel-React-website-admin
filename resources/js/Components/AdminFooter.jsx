export default function AdminFooter() {
    return (
        <footer className="footer">
            <div className="container-fluid">
                <div className="copyright">
                    &copy; {(new Date().getFullYear())} made with <i className="tim-icons icon-heart-2"></i> by
                    <a href="https://github.com/davinderchahal" target="_blank"> Davinder Chahal</a> for a better web.
                </div>
            </div>
        </footer>
    );
}
