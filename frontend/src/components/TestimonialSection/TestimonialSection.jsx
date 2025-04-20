import React from "react";
import "./TestimonialSection.css";
import testi from "../../assets/img/testi-bg.jpg";
const TestimonialSection = () => {
  return (
    <section
      id="gtco-testimonial"
      className="overlay bg-fixed section-padding"
      style={{
        backgroundImage: `url(${testi})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container">
        <div className="section-content">
          <div className="heading-section text-center">
            <span className="subheading">Testimony</span>
            <h2>Happy Customer</h2>
          </div>

          <div className="row justify-content-center mt-4">
            {/* You can reuse this block or loop through testimonials from backend later */}
            <div className="col-md-8 text-center testimonial-box">
              <p className="testimonial-text">
                “This place is amazing! The food is delicious and the ambiance
                is just perfect. Definitely coming back.”
              </p>
              <h5 className="customer-name">- John Doe</h5>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
