import "./herosection.css";
import NavBar from "../Nav-bar/navBar";


function HeroSection() {
    return (
        <>
            <section id="Home">
                <div className="shapes-bg">
                    <img className="ellipse1" src="/Ellipse 1299.svg" alt="" />
                    <img className="ellipse2" src="/Ellipse 1300.svg" alt="" />
                    <img className="phone-display" src="/UHJK 1.svg" alt="" />
                    <p className="conecting-stdnts">
                    <img className="bg-blur-white" src="/Rectangle 5983.svg" alt="bg-blur" />
                        Connecting students  with campus <span>vendors</span> for a seamless <span>shopping</span> experience.
                    </p>
                    <div className="waitlist">
                        <input className="waitlist-email" type="email" placeholder="name@email.com" name="" id="" />
                        <button className="waitlist-btn-submit">Join the waitlist</button>
                    </div>

                </div>

            </section>
        </>
    )
}
export default HeroSection