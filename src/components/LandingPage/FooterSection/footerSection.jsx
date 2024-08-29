import "./footerSection.css"
import { Link } from "react-router-dom";

function Footer() {
    return (
        <>
            <section className="footer">
                <footer className="footer-cont">
                    <div className="footer-texts">
                        <h4 className="footer-texts-h4">About</h4>
                        <p className="footer-text-p">About us</p>
                        <p className="footer-text-p">E-mail</p>
                        <p className="footer-text-p">LinkedIn</p>
                        <p className="footer-text-p">Twitter</p>
                        <p className="footer-text-p">Instagram</p>

                    </div>
                    <div className="footer-texts">
                        <h4  className="footer-texts-h4">Support</h4>
                        <p className="footer-text-p">Help Center</p>
                        <p className="footer-text-p">Vendor Support</p>
                        <p className="footer-text-p">Report an Issue</p>
                    </div>
                    <div className="footer-texts">
                        <h4  className="footer-texts-h4">Partnership Opportunities</h4>
                        <p className="footer-text-p">Become a Vendor</p>
                        <p className="footer-text-p">Manage Deliveries</p>
                        <p className="footer-text-p">Sponsorship</p>
                    </div>
                    <div className="footer-texts">
                        <h4  className="footer-texts-h4" >Legal</h4>
                        <Link className="ext-linkk" to = '/term-of-use'><p className="footer-text-p">Terms of Service</p></Link>
                        <Link className="ext-linkk" to = "/privacy-policy"><p className="footer-text-p">Privacy Policy</p></Link>
                        
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