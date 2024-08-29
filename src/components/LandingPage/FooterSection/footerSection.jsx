import "./footerSection.css"
import { Link } from "react-router-dom";

function Footer() {
    return (
        <>
            <section className="footer">
                <footer className="footer-cont">
                    <div className="footer-texts">
                        <h4>About</h4>
                        <p>About us</p>
                        <p>E-mail</p>
                        <p>LinkedIn</p>
                        <p>Twitter</p>
                        <p>Instagram</p>

                    </div>
                    <div className="footer-texts">
                        <h4>Support</h4>
                        <p>Help Center</p>
                        <p>Vendor Support</p>
                        <p>Report an Issue</p>
                    </div>
                    <div className="footer-texts">
                        <h4>Partnership Opportunities</h4>
                        <p>Become a Vendor</p>
                        <p>Manage Deliveries</p>
                        <p>Sponsorship</p>
                    </div>
                    <div className="footer-texts">
                        <h4 >Legal</h4>
                        <Link className="ext-linkk" to = '/term-of-use'><p>Terms of Service</p></Link>
                        <Link className="ext-linkk" to = "/privacy-policy"><p>Privacy Policy</p></Link>
                        
                    </div>
                </footer>
                <div className="footer-download-2">
                    <div> <img className="footer-campus-dash" src="./CampusDash Logo 2 1 (1).svg" alt="" /></div>
                    <div className="sub-download">
                        <button className="sub-download-22" > <img className="apple-black" src="apple.svg" alt="" /><div>Download Now</div> </button>
                        <button  className="sub-download-22" ><img className="google-play-small" src="./Google Play Store 1.svg" alt="" /><div>Download Now</div></button>
                    </div>
                </div>
            </section>
        </>
    )
}
export default Footer