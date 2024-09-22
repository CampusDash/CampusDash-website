import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./navBar.css";


function NavBar() {
    const navRef = useRef();

    const showNavbar = () => {
        navRef.current.classList.toggle(
            "responsive_nav"
        );
    };
    const hideNavbar = () => {
        navRef.current.classList.remove(
           "responsive_nav"
        );
    };

    const handleClick = (e) => {
        e.preventDefault()
        const target = e.target.getAttribute('href')
        const location = document.querySelector(target).offsetTop


        window.scrollTo({
            left: 0,
            top: location - 120,
        })
    }
    return (
        <>
            <nav className="nav-bar">
                <Link className="ext-link" to="/">
                <div className="campusdash-logo">
                    <img src="./Campusdash Final LOGO 4 1.svg" alt="campusdash-logo" />
                </div>
                </Link>
                <div className="nav-container-2" ref={navRef}>
                    <div className="nav-links">
                        <ul>
                            <a 
                            className="navv-linkk"
                            href="#home" 
                            onClick={handleClick}
                            >
                            <li className="nav-link-li">Home</li>
                            </a>
                            <Link className="navv-linkk" onClick={hideNavbar} to="about-us"><li className="nav-link-li">About us</li></Link>
                            <a 
                            className="navv-linkk"
                            href="#faq"
                            onClick={handleClick}
                            >
                            <li className="nav-link-li">FAQ</li></a>
                            <li className="nav-link-li">Contact Us</li>
                            <li className="nav-link-li">Campus</li>
                        </ul>
                    </div>
                    <div className="become-vendor">
                        <div>Become a vendor</div>
                    </div>
                    <button
                        className="nav-btn nav-close-btn"
                        onClick={showNavbar}>
                        <FaTimes />
                    </button>
                </div>
                <button
                    className="nav-btn"
                    onClick={showNavbar}>
                    <FaBars />
                </button>
            </nav>
        </>
    )
}
export default NavBar