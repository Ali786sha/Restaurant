import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import {
  Container,
  Table,
  Button,
  Alert,
  Row,
  Col,
  Card,
  Badge,
} from "react-bootstrap";

const MyCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/orders/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  const updateQuantity = (id, delta) => {
    const updated = cartItems.map((item) => {
      if (item._id === id) {
        const newQty = item.quantity + delta;
        return { ...item, quantity: newQty > 1 ? newQty : 1 };
      }
      return item;
    });
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const removeItem = (id) => {
    const updated = cartItems.filter((item) => item._id !== id);
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const placeOrder = async () => {
    try {
      const token = localStorage.getItem("token");
      const itemIds = cartItems.flatMap((item) =>
        Array(item.quantity).fill(item._id)
      );
      await axios.post(
        "http://localhost:5000/api/orders/user",
        { itemIds, tableNumber: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCartItems([]);
      localStorage.removeItem("cart");
      fetchOrders();
      setMessage("✅ Order placed successfully!");
    } catch (err) {
      console.error("Error placing order:", err);
      setMessage("❌ Failed to place order.");
    }
  };

  return (
    <>
    <Navbar/>
    <Container className="mt-5 mb-5">
      <Row className="mb-4">
        <Col>
          <h2 className="fw-bold">🛒 My Cart</h2>
          {message && <Alert variant="info">{message}</Alert>}
        </Col>
      </Row>

      {cartItems.length === 0 ? (
        <Alert variant="secondary">Your cart is empty.</Alert>
      ) : (
        <Card className="mb-5 shadow-sm">
          <Card.Body>
            <Table responsive bordered hover>
              <thead className="table-dark text-center">
                <tr>
                  <th>Item</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Total</th>
                  <th>Update</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody className="text-center align-middle">
                {cartItems.map((item) => (
                  <tr key={item._id}>
                    <td className="fw-semibold">{item.name}</td>
                    <td>₹{item.price}</td>
                    <td>
                      <Badge bg="secondary" pill>
                        {item.quantity}
                      </Badge>
                    </td>
                    <td>₹{item.price * item.quantity}</td>
                    <td>
                      <Button
                        variant="outline-dark"
                        size="sm"
                        onClick={() => updateQuantity(item._id, -1)}
                      >
                        −
                      </Button>{" "}
                      <Button
                        variant="outline-dark"
                        size="sm"
                        onClick={() => updateQuantity(item._id, 1)}
                      >
                        +
                      </Button>
                    </td>
                    <td>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => removeItem(item._id)}
                      >
                        ❌ Remove
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className="text-end">
              <h5 className="fw-bold mb-3">Total: ₹{totalPrice}</h5>
              <Button variant="success" onClick={placeOrder}>
                ✅ Place Order
              </Button>
            </div>
          </Card.Body>
        </Card>
      )}

      <Row className="mb-3">
        <Col>
          <h4 className="fw-bold">📦 Order History</h4>
        </Col>
      </Row>

      {orders.length === 0 ? (
        <Alert variant="light">No previous orders found.</Alert>
      ) : (
        <Card className="shadow-sm">
          <Card.Body>
            <Table responsive bordered>
              <thead className="table-secondary text-center">
                <tr>
                  <th>Items</th>
                  <th>Status</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody className="text-center align-middle">
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td className="text-start">
                      <ul className="mb-0">
                        {order.items.map((i, idx) => (
                          <li key={idx}>{i.name}</li>
                        ))}
                      </ul>
                    </td>
                    <td>
                      <Badge
                        bg={
                          order.status === "Completed"
                            ? "success"
                            : "warning text-dark"
                        }
                      >
                        {order.status}
                      </Badge>
                    </td>
                    <td>₹{order.totalPrice}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      )}
    </Container>
    </>
  );
};

export default MyCart;
