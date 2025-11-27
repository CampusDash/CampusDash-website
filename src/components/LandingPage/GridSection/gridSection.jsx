import "./gridSection.css";
import WaitlistButton from "../Button component/waitliistButton";

function GridSection() {
    return (
        <>
            <section className="grid-container">
                <h5 className="feel">Feel the best experience <br /> with our features</h5>
                <div className="grid">
                    <div className="grid-box">
                        <div className="grid-icons" ><img className="" src="/shopping-bag.svg" alt="shopping-bag" /></div>
                        <h5 className="seemless-shopping">Seamless Shopping</h5>
                        <p className="grid-box-p">CampusDash is your one-stop shop for all things campus. Whether you need textbooks, snacks, tech gadgets, or dorm supplies, we've got it all.</p>
                        <div className="grid-icon"><img className="mockup" src="/Mockup (1).svg" alt="mockup" /></div>
                    </div>
                    <div className="grid-box-a">
                        <div className="grid-icons">  <img src="/people.svg" alt="people" /></div>
                        <h5 className="seemless-shopping" id="tv-seamless">Trusted Vendors</h5>
                        <p className="grid-box-p">We partner exclusively with local vendors who understand the unique needs of students. From the campus bookstore to the tech shop, each vendor is carefully vetted to ensure quality, reliability, and fair pricing.</p>
                        <div className="grid-icon"><img className="avatar" src="/Frame 1171274842.svg" alt="" /></div>
                    </div>
                    <div className="grid-box-b">
                        <div className="grid-icons"><img src="/wallet-money.svg" alt="wallet" /></div>
                        <h5 className="seemless-shopping" id="easy">Easy Payments</h5>
                        <p className="grid-box-p" id="our-p" >Our payment gateway is encrypted and secure, ensuring that your transactions are safe. Plus, with our simple checkout process, you can complete your purchase in just a few taps.</p>
                        <div>
                            <WaitlistButton />
                        </div>
                    </div>
                    <div className="grid-box-c">
                        <div className="grid-icons"><img src="/gift.svg" alt="gift" /></div>
                        <h5 className="seemless-shopping">Dash Rewards</h5>
                        <p className="grid-box-p">CampusDash thrives on community, and we believe in rewarding our users for helping us grow. With our referral program, you can earn exclusive rewards by inviting your friends to join CampusDash. Every time a friend signs up using your referral code and makes a purchase, you’ll earn points that can be redeemed for discounts, special offers, and more. The more friends you refer, the bigger the rewards</p>
                        <div className="grid-icon"><img className="reward-card" src="/Frame 109.svg" alt="" /></div>
                    </div>
                </div>
                <div className="get-the">
                    <h7 className="get-the-app" >Get the Mobile app.</h7>
                    <p>Kindly get notified when the app is released by joining <br /> our waitlist</p>
                    <div>
                        <WaitlistButton />
                    </div>
                </div>
            </section>
        </>
    )
}
export default GridSection