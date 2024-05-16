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
    const calculatedSpread = (askOrders[askOrders.length - 1].price - bidOrders[0].price).toFixed(5);

    setAsks(askOrders);
    setBids(bidOrders);
    setSpread(parseFloat(calculatedSpread));
  }, []);

  return (
    <div className="order-book-container">
      <h1>Order Book</h1>
      <div className="order-book-single-column">
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
              <tr key={`ask-${index}`}>
                <td className="asks">{order.price.toFixed(5)}</td>
                <td>{order.quantity.toFixed(5)}</td>
                <td>{order.total.toFixed(5)}</td>
              </tr>
            ))}
            <tr className="spread-row">
              <td colSpan={3}>Spread: {spread} ({((spread / 100) * 100).toFixed(4)}%)</td>
            </tr>
            {bids.map((order, index) => (
              <tr key={`bid-${index}`}>
                <td className="bids">{order.price.toFixed(5)}</td>
                <td>{order.quantity.toFixed(5)}</td>
                <td>{order.total.toFixed(5)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderBook;
