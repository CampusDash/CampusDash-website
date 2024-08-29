import "./sliderSection.css";
import Marquee from 'react-fast-marquee';

function Slider(){
    return(
        <>
           <section>
            <div><img className="vector-3" src="./Vector 3 (1).svg" alt="" />
            <img className="vector-4" src="./Vector 4.svg" alt="" /></div>
            <div><h2>What Students & <br />Vendors are saying</h2></div>
            <div className="slider-container">
                {/* slider animation here just follow this as a template */}
            <Marquee direction="left" speed={100} delay={2} pauseOnHover={true}>
                <div className="slider-card">
                    <div className="avatar">
                        <img src="./Rectangle 2.svg" alt="avatar" />
                        <div>
                        <p className="name">Mia Taylor</p>
                        <p className="vendor">vendor</p>
                        </div>
                        
                    </div>
                    <p className="remark">CampusDash has completely transformed the way I do business on campus. As a vendor, reaching students used to be a challenge, but now my products are just a few clicks away from thousands of potential customers. The platform is incredibly user-friendly, and the support from the CampusDash team has been fantastic. My sales have increased, and I've built stronger connections with the student community. I can't imagine running my business without it.</p>
                </div>
                <div className="slider-card">
                    <div className="avatar">
                        <img src="./Rectangle 2.svg" alt="avatar" />
                        <div>
                        <p className="name">Adams Adam</p>
                        <p className="vendor">Student</p>
                        </div>
                    </div>
                    <p className="remark">CampusDash has completely transformed the way I do business on campus. As a vendor, reaching students used to be a challenge, but now my products are just a few clicks away from thousands of potential customers. The platform is incredibly user-friendly, and the support from the CampusDash team has been fantastic. My sales have increased, and I've built stronger connections with the student community. I can't imagine running my business without it.</p>
                </div>
                <div className="slider-card">
                    <div className="avatar">
                        <img src="./Rectangle 2.svg" alt="avatar" />
                        <div>
                        <p className="name">Mary Eze</p>
                        <p className="vendor">Vendor</p>
                        </div>
                    </div>
                    <p className="remark">CampusDash has completely transformed the way I do business on campus. As a vendor, reaching students used to be a challenge, but now my products are just a few clicks away from thousands of potential customers. The platform is incredibly user-friendly, and the support from the CampusDash team has been fantastic. My sales have increased, and I've built stronger connections with the student community. I can't imagine running my business without it.</p>
                </div>
                <div className="slider-card">
                    <div className="avatar">
                        <img src="./Rectangle 2.svg" alt="avatar" />
                        <div>
                        <p className="name">Halima Baba</p>
                        <p className="vendor">Vendor</p>
                        </div>
                        
                    </div>
                    <p className="remark">CampusDash has completely transformed the way I do business on campus. As a vendor, reaching students used to be a challenge, but now my products are just a few clicks away from thousands of potential customers. The platform is incredibly user-friendly, and the support from the CampusDash team has been fantastic. My sales have increased, and I've built stronger connections with the student community. I can't imagine running my business without it.</p>
                </div>
                </Marquee>
                {/* ends here */}
            </div>
         </section>
        </>
    )
}
export default Slider
// const imgSlide= 
// [
// {name:"Mia Taylor", type:"Vendor",review: "CampusDash has completely transformed the way I do business on campus. As a vendor, reaching students used to be a challenge, but now my products are just a few clicks away from thousands of potential customers. The platform is incredibly user-friendly, and the support from the CampusDash team has been fantastic. My sales have increased, and I've built stronger connections with the student community. I can't imagine running my business without it."},
// {name:"Adams Adamu", type:"Vendor",review: "CampusDash has completely transformed the way I do business on campus. As a vendor, reaching students used to be a challenge, but now my products are just a few clicks away from thousands of potential customers. The platform is incredibly user-friendly, and the support from the CampusDash team has been fantastic. My sales have increased, and I've built stronger connections with the student community. I can't imagine running my business without it."},
// {name:"Mary Popola", type:"Vendor",review: "CampusDash has completely transformed the way I do business on campus. As a vendor, reaching students used to be a challenge, but now my products are just a few clicks away from thousands of potential customers. The platform is incredibly user-friendly, and the support from the CampusDash team has been fantastic. My sales have increased, and I've built stronger connections with the student community. I can't imagine running my business without it."},
// {name:"Tunji Adebayo", type:"Vendor",review: "CampusDash has completely transformed the way I do business on campus. As a vendor, reaching students used to be a challenge, but now my products are just a few clicks away from thousands of potential customers. The platform is incredibly user-friendly, and the support from the CampusDash team has been fantastic. My sales have increased, and I've built stronger connections with the student community. I can't imagine running my business without it."},
// {name:"Chiamaka Nwafor", type:"Vendor",review: "CampusDash has completely transformed the way I do business on campus. As a vendor, reaching students used to be a challenge, but now my products are just a few clicks away from thousands of potential customers. The platform is incredibly user-friendly, and the support from the CampusDash team has been fantastic. My sales have increased, and I've built stronger connections with the student community. I can't imagine running my business without it."},
// ]
// const Slider = user.map((imgSlide) => {
//     return(
//         <>
//         <section>
//             <div>
//                 <h2>{imgSlide.name} </h2>
//                 <div>

//                 </div>
//             </div>
//         </section>
//         </>
//     )
// })

   
 
// export default Slider