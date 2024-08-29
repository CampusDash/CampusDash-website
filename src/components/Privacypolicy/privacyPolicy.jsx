import NavBar from "../LandingPage/Nav-bar/navBar";
import "./privacyPolicy.css";

function PrivacyPolicy() {
    return (
        <>
            <section className="ext-link-bg">
                <img className="ext-link-vector" src="./Vector.svg" alt="img" />
                <header className="terms-of-use">Privacy Policy </header>
            </section>
            <div className="Privacy-list">
                <div className="privacy">
                    <h6 className="P-policy">PRIVACY POLICY</h6>
                    <p className="terms-p">At CampusDash ("We", "Our", or "Us"), your privacy is of utmost importance to us. This Privacy Policy outlines how we collect, use, share and safeguard your personal information when you interact with our services, including our website, mobile application, and any other platform where CampusDash operates. We are committed to ensuring that your personal data is handled with transparency and care. By using our services, you agree to the practices described in this policy. </p>
                </div>
                <div className="Document">
                    <h6 className="terms-h6">2. Document Version Control</h6>
                    <p className="terms-p">This policy may be updated periodically to reflect changes in our operations or applicable laws. Any updates will be communicated via the app or website.</p>
                </div>
                <div className="Why">
                    <h6 className="terms-h6">3. Why We Collect Your Information</h6>
                    <p className="terms-p"> We collect personal information to:
                        <ul className="P-policy-li">
                            <li>Provide CampusDash services.</li>
                            <li>Personalize user experience.</li>
                            <li>Improve and develop new features.</li>
                            <li>Comply with legal obligations.</li>
                            <li>Prevent fraud and ensure security.</li>
                        </ul>
                    </p>
                </div>
                <div className="Consent">
                    <h6 className="terms-h6">4. Consent</h6>
                    <p className="terms-p">By using CampusDash, you consent to our collection and use of data as described in this policy. You can withdraw your consent at any time by contacting us.</p>
                </div>
                <div className="How">
                    <h6 className="terms-h6">5. How We Collect Information</h6>
                    <p className="terms-p">We collect information directly from you when you sign up, interact with our services, or communicate with us. We also gather data automatically through your use of our platform and may receive information from third-party sources.</p>
                </div>
                <div className="Info">
                    <h6 className="terms-h6">6. Information We Collect</h6>
                    <p className="terms-p"> We may collect the following types of information
                        <ul className="P-policy-li">
                            <li>Personal details (name, age, contact information).</li>
                            <li>Usage data (device Information, IP address, browsing history).</li>
                            <li>Location data, if you enable location services.</li>
                        </ul>
                    </p>
                </div>
                <div className="How">
                    <h6 className="terms-h6">7. How We Use Your Information.</h6>
                    <p className="terms-p"> We use your data to:
                        <ul className="P-policy-li">
                            <li>Provide and improve our services.</li>
                            <li>Communicate with you.</li>
                            <li>Ensure security and prevent fraud.</li>
                            <li>Conduct research and analysis.</li>
                        </ul>
                    </p>
                </div>
                <div className="Third">
                    <h6 className="terms-h6">8. Third-Party Services</h6>
                    <p className="terms-p">We may share your information with trusted third-party service providers who assist in operating CampusDash. These partners are required to maintain confidentiality of your information.</p>
                </div>
                <div className="Location">
                    <h6 className="terms-h6">9. Location Services</h6>
                    <p className="terms-p">With your consent, we may share your location to enhance your experience by showing relevant campus events and services.</p>
                </div>
                <div className="Comm">
                    <h6 className="terms-h6">1o. Communication</h6>
                    <p className="terms-p">CampusDash may contact you via email, SMS, or in-app notifications. You can opt out of non-essential communications.</p>
                </div>
                <div>
                    <h6 className="terms-h6">11. Social Media Use</h6>
                    <p className="terms-p">If you interact with us via social media, your data may be subjected to privacy policies of those platforms.</p>
                </div>
                <div>
                    <h6 className="terms-h6">12. Surveys</h6>
                    <p className="terms-p">We may conduct surveys to gather feedback and inprove our services. Participation is voluntary </p>
                </div>
                <div>
                    <h6 className="terms-h6">13. Disclosure of information</h6>
                    <p className="terms-p">We will not sell or rent your personal information. We may disclose data to comply with legal obligations or to protect the right and safety of our users</p>
                </div>
                <div>
                    <h6 className="terms-h6">14. Security</h6>
                    <p className="terms-p">We implement robust security measures to protect your data, including encryption and access control</p>
                </div>
                <div>
                    <h6 className="terms-h6">15. Data Retention</h6>
                    <p className="terms-p">We retain your data as long as necessary to provide services or comply with legal obligations. You can request data deletion at any time</p>
                </div>
                <div>
                    <h6 className="terms-h6">16. Direct Marketing</h6>
                    <p className="terms-p">We may use your information for marketing purposes. You can opt out of marketing communications at any time.</p>
                </div>
                <div>
                    <h6 className="terms-h6">17. Link to Other Websites</h6>
                    <p  className="terms-p">CampusDash may contain links to external sites. We are not responsible for the privacy practice of these sites.</p>
                </div>
                <div>
                    <h6 className="terms-h6">18. Your Rights</h6>
                    <p  className="terms-p">You have the right to access, correct, or delete your personal informations. Contact us to exercise these rights.</p>
                </div>
                <div>
                    <h6 className="terms-h6">19. Changes to This Policy</h6>
                    <p  className="terms-p">From time to time, and for any reason, we may revise and update our privacy notice and our information handling practices. Our Privacy Notice is available in the CampusDash mobile application and website.</p>
                    <p  className="terms-p">If we make any significant changes to our privacy Notice, we will notify you of the changes through the CampusDash application or by other means, such as email. We may also amend this Privacy Notice at any time by posting a revised version on our website or mobile application. The revised version will be effective 7 days after publication. <br />We encourage you to review this Privacy Notice regularly to ensure you are familiar with any changes.</p>
                </div>
                <div className="Governing">
                    <h6 className="terms-h6">20. Governing Law</h6>
                    <p  className="terms-p">This policy is governed by [Applicable Law]. Any disputes will be resolved undrr the jurisdiction of [Country/State].</p>
                </div>
            </div>
        </>
    )
}
export default PrivacyPolicy