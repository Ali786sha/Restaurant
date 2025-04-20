import './Banner.css';
import React from 'react';

import slide1 from '../../assets/images/slide-01.jpg';
import slide2 from '../../assets/images/slide-02.jpg';
import slide3 from '../../assets/images/slide-03.jpg';

const slides = [slide1, slide2, slide3];


const TopSection = () => {
    return (
      <div id="top">

        <div className="container-fluid">

            <div className="row">

                <div className="col-lg-4">
                    <div className="left-content">
                        <div className="inner-content">
                            <h4>Happy Plate!</h4>
                            <h6>THE BEST EXPERIENCE</h6>
                            <div className="main-white-button scroll-to-section">
                                <a href="#reservation">Make A Reservation</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-8">

                    <div className="main-banner header-text">
                  
                        <div className="Modern-Slider"> 
                  
                                  {slides.map((src, index) => (
                                      <div className="item" key={index}>
                                        <div className="img-fill">
                                          <img src={src} alt={`slide-${index + 1}`} />
                                        </div>
                                      </div>
                                    ))}
                                    
                        </div>
                  
                      </div>
                </div>
  

            </div>

        </div>
    </div>
            
    );
   }       

export default TopSection;