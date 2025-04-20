import React from "react";
import { Link } from "react-router-dom";
import "./SpecialDishesSection.css";
import steakImg from "../../assets/img/steak.jpg";
import Salmon from "../../assets/img/salmon-zucchini.jpg";

const SpecialDishesSection = () => {
  return (
    <section id="gtco-special-dishes" className="bg-grey section-padding">
      <div className="container">
        <div className="section-content">
          <div className="heading-section text-center">
            <span className="subheading">Specialties</span>
            <h2>Special Dishes</h2>
          </div>

          {/* First Dish */}
          <div className="row mt-5">
            <div className="col-lg-5 col-md-6 align-self-center py-5">
              <h2 className="special-number">01.</h2>
              <div className="dishes-text">
                <h3>
                  <span>Beef</span>
                  <br />
                  Steak Sauce
                </h3>
                <p className="pt-3">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Cupiditate, ea vero alias perferendis quas animi doloribus
                  voluptates.
                </p>
                <h3 className="special-dishes-price">$15.00</h3>
                <Link to="/book" className="btn-primary mt-3">
                  Book a table
                </Link>
              </div>
            </div>

            <div className="col-lg-5 offset-lg-2 col-md-6 align-self-center mt-4 mt-md-0">
              <img
                src={steakImg}
                alt="Beef Steak"
                className="img-fluid shadow w-100"
              />
            </div>
          </div>

          {/* Second Dish */}
          <div className="row mt-5">
            <div className="col-lg-5 col-md-6 align-self-center order-2 order-md-1 mt-4 mt-md-0">
              <img
                src={Salmon}
                alt="Salmon Zucchini"
                className="img-fluid shadow w-100"
              />
            </div>

            <div className="col-lg-5 offset-lg-2 col-md-6 align-self-center order-1 order-md-2 py-5">
              <h2 className="special-number">02.</h2>
              <div className="dishes-text">
                <h3>
                  <span>Salmon</span>
                  <br />
                  Zucchini
                </h3>
                <p className="pt-3">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Blanditiis, accusamus culpa quam amet ipsam odit ea doloremque
                  accusantium quo.
                </p>
                <h3 className="special-dishes-price">$12.00</h3>
                <Link to="/book" className="btn-primary mt-3">
                  Book a table
                  <span>
                    <i className="fa fa-long-arrow-right ml-2"></i>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialDishesSection;
