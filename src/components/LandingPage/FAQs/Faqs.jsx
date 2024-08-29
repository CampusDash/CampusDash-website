import "./Faqs.css";

function Faqs() {
    return (
        <>
            <section id="faq" className="faqs-container">
                <div>
                    <h3 className="faqs">FAQS</h3>
                    <p className="questions">Got any questions for us</p>
                </div>
                <div className="faq-content">
                    <details>
                        <summary>
                            What is CampusDash?
                        </summary>
                        <p className="summary-p">
                            CampusDash is a platform that connects students with local vendors on campus, making it easy to order products and services. Whether you're looking for food, books, or other essentials, CampusDash helps you get what you need quickly and efficiently
                        </p>
                    </details>
                    <details>
                        <summary>
                        How does CampusDash work?
                        </summary>
                        <p className="summary-p">
                        Simply download the app and sign up, browse available vendors, place your order, and choose a pickup or delivery option. You'll receive real-time updates on your order status, and you'll be notified when it's ready
                        </p>
                    </details>
                    <details>
                        <summary>
                        Who can use CampusDash?
                        </summary>
                        <p className="summary-p">
                        CampusDash is designed for students, faculty, and staff within the university community. Vendors who operate on or near campus can also join the platform to reach their target audience.
                        </p>
                    </details>
                    <details>
                        <summary>
                        Is there a delivery service?
                        </summary>
                        <p className="summary-p">
                        Currently, CampusDash connects you directly with vendors for easy order pickup. We do not offer a delivery service at this time.
                        </p>
                    </details>
                    <details>
                        <summary>
                        How do I sign up as a vendor?
                        </summary>
                        <p className="summary-p">
                        Interested vendors can sign up by filling out our vendor application form on the website or app. Once approved, you'll be able to list your products and services on CampusDash
                        </p>
                    </details>
                    <details>
                        <summary>
                        Is there a fee to use CampusDash?
                        </summary>
                        <p className="summary-p">
                        Signing up as a user is free. Vendors may be subject to a small transaction fee for each order processed through CampusDash.
                        </p>
                    </details>
                    <details>
                        <summary>
                        What types of products can I find on CampusDash?
                        </summary>
                        <p className="summary-p">
                        CampusDash features a variety of products, including food, textbooks, electronics, clothing, and more, all from trusted campus vendors.
                        </p>
                    </details>
                    <details>
                        <summary>
                        How secure is my payment information?
                        </summary>
                        <p className="summary-p">
                        We take your security seriously. All payment transactions are encrypted and processed through secure payment gateways, ensuring that your information is safe
                        </p>
                    </details>
                    <details>
                        <summary>
                        What if I have an issue with my order?
                        </summary>
                        <p className="summary-p">
                        If you encounter any problems with your order, you can contact the vendor directly through the platform, or reach out to CampusDash support for assistance.
                        </p>
                    </details>
                </div>
                <div className="faq-CC">
                    <h3 className="have-questions">Still have questions?</h3>
                    <p className="cant">Can’t find the answer you’re looking for? Please chat to <br /> our friendly team.</p>
                    <button className="get-in-touch">Get in touch</button>
                </div>
            </section>
        </>
    )
}
export default Faqs