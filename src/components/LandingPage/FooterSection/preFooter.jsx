import "./footerSection.css";

function PreFooter(){
    return(
        <>
         <section>
                <h3 className="your-next" >Your next order is just a tap <br /> away with CampusDash.</h3>
                <div className="downlload-btn-container">
                    <button className="download-btn" ><img className="download-logo" src="/apple-white.svg" alt="apple-logo" /> <div className="download-now">Download Now</div></button>
                    <button className="download-btn"  ><img className="download-logo" src="/Google Play Store 1.svg" alt="playstore-logo" /><div className="download-now">Download Now</div></button>
                </div>
                <img className="footer-half-phone" src="/001 1.svg" alt="" />
            </section>
        </>
    )
}
export default PreFooter