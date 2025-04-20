import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import breakfastImage from "../../assets/img/breakfast-1.jpg";
import maincourseImage from "../../assets/img/breakfast-1.jpg";
import dinnerImage from "../../assets/img/breakfast-1.jpg";
import beveragesImage from "../../assets/img/breakfast-1.jpg";

const categoryImages = {
  Breakfast: breakfastImage,
  "Main Course": maincourseImage,
  Dinner: dinnerImage,
  Beverages: beveragesImage,
};

const MenuSection = () => {
  const [filteredItems, setFilteredItems] = useState({});
  const [slideIndex, setSlideIndex] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/menu/public");
        const categorized = res.data.reduce((acc, item) => {
          if (!acc[item.category]) acc[item.category] = [];
          acc[item.category].push(item);
          return acc;
        }, {});
        setFilteredItems(categorized);

        const initialSlides = Object.keys(categorized).reduce((acc, key) => {
          acc[key] = 0;
          return acc;
        }, {});
        setSlideIndex(initialSlides);
      } catch (err) {
        console.error("Error fetching menu:", err);
      }
    };

    fetchMenu();
  }, []);

  const handleSlide = (category, direction) => {
    setSlideIndex((prev) => {
      const max = filteredItems[category].length;
      const newIndex = Math.max(0, Math.min(prev[category] + direction, max - 3));
      return { ...prev, [category]: newIndex };
    });
  };

  const addToCart = (item) => {
    const user = localStorage.getItem("token");
    if (!user) {
      alert("Please login to add items to your cart.");
      navigate("/login");
      return;
    }

    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const itemIndex = existingCart.findIndex((i) => i._id === item._id);

    if (itemIndex !== -1) {
      existingCart[itemIndex].quantity += 1;
    } else {
      existingCart.push({ ...item, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
    alert("Item added to cart.");
  };

  return (
    <section className="py-5 bg-light">
      <Container>
        <div className="text-center mb-5">
          <h2>Our Menu</h2>
          <p>Delicious items grouped by category</p>
        </div>

        {Object.keys(filteredItems).map((category) => (
          <div key={category} className="mb-5">
            <h4 className="mb-3">{category}</h4>
            <Row className="align-items-center mb-2">
              <Col xs="auto">
                <Button
                  variant="outline-dark"
                  size="sm"
                  onClick={() => handleSlide(category, -1)}
                  disabled={slideIndex[category] === 0}
                >
                  ◀
                </Button>
              </Col>
              <Col>
                <Row>
                  {filteredItems[category]
                    .slice(slideIndex[category], slideIndex[category] + 3)
                    .map((item) => (
                      <Col md={4} key={item._id} className="mb-4">
                        <div className="card h-100">
                          <img
                            src={categoryImages[category] || breakfastImage}
                            className="card-img-top"
                            alt={item.name}
                          />
                          <div className="card-body">
                            <h5 className="card-title">{item.name}</h5>
                            <p className="card-text">{item.description}</p>
                            <p className="text-muted">₹{item.price}</p>
                            <Button
                              variant="dark"
                              onClick={() => addToCart(item)}
                            >
                              Add to Cart
                            </Button>
                          </div>
                        </div>
                      </Col>
                    ))}
                </Row>
              </Col>
              <Col xs="auto">
                <Button
                  variant="outline-dark"
                  size="sm"
                  onClick={() => handleSlide(category, 1)}
                  disabled={slideIndex[category] + 3 >= filteredItems[category].length}
                >
                  ▶
                </Button>
              </Col>
            </Row>
          </div>
        ))}
      </Container>
    </section>
  );
};

export default MenuSection;
