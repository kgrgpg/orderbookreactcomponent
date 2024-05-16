"use client";

import React, { useEffect, useState } from 'react';
import './OrderBook.css';

interface Order {
  price: number;
  quantity: number;
  total: number;
}

const generateOrders = (count: number, startPrice: number, priceIncrement: number): Order[] => {
  const orders: Order[] = [];
  let total = 0;

  for (let i = 0; i < count; i++) {
    const price = startPrice + i * priceIncrement;
    const quantity = parseFloat((Math.random() * 10).toFixed(2));
    total += quantity;
    orders.push({ price, quantity, total });
  }

  return orders;
};

const OrderBook: React.FC = () => {
  const [asks, setAsks] = useState<Order[]>([]);
  const [bids, setBids] = useState<Order[]>([]);
  const [spread, setSpread] = useState<number>(0);

  useEffect(() => {
    const askOrders = generateOrders(20, 100, 0.01).reverse();
    const bidOrders = generateOrders(20, 100, -0.01);
    const calculatedSpread = (askOrders[0].price - bidOrders[0].price).toFixed(5);

    setAsks(askOrders);
    setBids(bidOrders);
    setSpread(parseFloat(calculatedSpread));
  }, []);

  return (
    <div className="order-book-container">
      <h1>Order Book</h1>
      <div className="order-book">
        <div className="order-book-column asks">
          <table>
            <thead>
              <tr>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total Quantity</th>
              </tr>
            </thead>
            <tbody>
              {asks.map((order, index) => (
                <tr key={index}>
                  <td>{order.price.toFixed(5)}</td>
                  <td>{order.quantity.toFixed(5)}</td>
                  <td>{order.total.toFixed(5)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="order-book-column spread">
          <div>Spread: {spread} ({((spread / 100) * 100).toFixed(4)}%)</div>
        </div>
        <div className="order-book-column bids">
          <table>
            <thead>
              <tr>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total Quantity</th>
              </tr>
            </thead>
            <tbody>
              {bids.map((order, index) => (
                <tr key={index}>
                  <td>{order.price.toFixed(5)}</td>
                  <td>{order.quantity.toFixed(5)}</td>
                  <td>{order.total.toFixed(5)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderBook;
