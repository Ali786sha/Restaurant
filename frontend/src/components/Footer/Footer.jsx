import React from "react";
import "./Footer.css";


const Footer = () => {
  return (
    <footer className="mastfoot pb-5 bg-white section-padding pb-0">
      <div className="inner container">
        <div className="row">
          {/* Left column: logo and about */}
          <div className="col-lg-4">
            <div className="footer-widget pr-lg-5 pr-0">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et obcaecati quisquam id sit omnis explicabo voluptate aut placeat, soluta, nisi ea magni facere, itaque incidunt modi? Magni, et voluptatum dolorem.
              </p>
              <nav className="nav nav-mastfoot justify-content-start">
                <span className="nav-link"><i className="fab fa-facebook-f"></i></span>
                <span className="nav-link"><i className="fab fa-twitter"></i></span>
                <span className="nav-link"><i className="fab fa-instagram"></i></span>
              </nav>
            </div>
          </div>

          {/* Middle column: open hours */}
          <div className="col-lg-4">
            <div className="footer-widget px-lg-5 px-0">
              <h4>Open Hours</h4>
              <ul className="list-unstyled open-hours">
                {[
                  ["Monday", "9:00 - 24:00"],
                  ["Tuesday", "9:00 - 24:00"],
                  ["Wednesday", "9:00 - 24:00"],
                  ["Thursday", "9:00 - 24:00"],
                  ["Friday", "9:00 - 02:00"],
                  ["Saturday", "9:00 - 02:00"],
                  ["Sunday", "Closed"],
                ].map(([day, time], index) => (
                  <li key={index} className="d-flex justify-content-between">
                    <span>{day}</span><span>{time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right column: newsletter */}
          <div className="col-lg-4">
            <div className="footer-widget pl-lg-5 pl-0">
              <h4>Newsletter</h4>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
              <form id="newsletter">
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    id="emailNewsletter"
                    placeholder="Enter email"
                    aria-describedby="emailNewsletter"
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">Submit</button>
              </form>
            </div>
          </div>

          {/* Footer bottom row */}
          <div className="col-md-12 d-flex align-items-center">
            <p className="mx-auto text-center mb-0">
              &copy; 2019. All Rights Reserved. Design by{" "}
              <a href="https://gettemplates.co" target="_blank" rel="noopener noreferrer">GetTemplates</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
