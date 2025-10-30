import "./herosection.css";
import NavBar from "../Nav-bar/navBar";


function HeroSection() {
    return (
        <>
            <section id="Home" className="hero-section-bg">
                <div className="bdr-test">
                    <div className="hero-text-box">
                        <h1 className="connecting-stdnts" >Connecting <span className="hero-green">students</span> <br /> with <span className="hero-green">campus vendors</span><br /> for a seamless <br /> <span className="hero-green">shopping</span> experience.</h1>
                        <p className="bridging-gap">Bridging the gap between students and campus vendors for instant  access  to the products you need whether it's textbooks, tech, or treats, we connect you directly with trusted campus vendors, bringing the  essentials  to your fingertips.</p>
                        <img className="people-1" src="./Frame 1171274842 (1).svg" alt="" />
                        <p className="bridging-gap">Join our waitlist today for early access to our platform</p>
                        <div>
                            <input className="hero-email" type="email" placeholder="name@gmail.com" name="" id="" />
                            <button className="hero-join">Join</button>
                        </div>
                    </div>
                    <div>
                        <div>
                            <img className="hero-phone" src="./Frame 8249.svg" alt="" />
                            <img className="hero-phone-b" src="./Frame 8249 1.svg" alt="" />
                        </div>

                    </div>
                </div>





            </section>
        </>
    )
}
export default HeroSection