"use client";

import React from 'react';
import './OrderBook.css';

const OrderBook = () => {
  const asks = [
    { price: 100.19, quantity: 9.34, totalQuantity: 94.18 },
    { price: 100.18, quantity: 2.34, totalQuantity: 91.44 },
    { price: 100.17, quantity: 4.61, totalQuantity: 86.00 },
    { price: 100.16, quantity: 7.14, totalQuantity: 78.86 },
    { price: 100.15, quantity: 2.39, totalQuantity: 71.72 },
    { price: 100.14, quantity: 6.39, totalQuantity: 69.33 },
    { price: 100.13, quantity: 3.83, totalQuantity: 65.50 },
    { price: 100.12, quantity: 5.80, totalQuantity: 61.67 },
    { price: 100.11, quantity: 7.77, totalQuantity: 55.87 },
    { price: 100.10, quantity: 4.21, totalQuantity: 48.10 },
    { price: 100.09, quantity: 2.98, totalQuantity: 43.89 },
    { price: 100.08, quantity: 3.90, totalQuantity: 40.90 },
    { price: 100.07, quantity: 8.44, totalQuantity: 37.00 },
    { price: 100.06, quantity: 2.77, totalQuantity: 28.56 },
    { price: 100.05, quantity: 5.32, totalQuantity: 25.79 },
    { price: 100.04, quantity: 3.65, totalQuantity: 20.47 },
    { price: 100.03, quantity: 4.70, totalQuantity: 16.82 },
    { price: 100.02, quantity: 5.12, totalQuantity: 12.12 },
    { price: 100.01, quantity: 6.09, totalQuantity: 6.00 },
  ];

  const bids = [
    { price: 100.00, quantity: 6.00, totalQuantity: 6.00 },
    { price: 99.99, quantity: 7.21, totalQuantity: 13.21 },
    { price: 99.98, quantity: 3.56, totalQuantity: 16.77 },
    { price: 99.97, quantity: 8.54, totalQuantity: 25.31 },
    { price: 99.96, quantity: 2.39, totalQuantity: 27.70 },
    { price: 99.95, quantity: 6.24, totalQuantity: 33.94 },
    { price: 99.94, quantity: 4.89, totalQuantity: 38.83 },
    { price: 99.93, quantity: 7.65, totalQuantity: 46.48 },
    { price: 99.92, quantity: 5.32, totalQuantity: 51.80 },
    { price: 99.91, quantity: 3.89, totalQuantity: 55.69 },
    { price: 99.90, quantity: 2.55, totalQuantity: 58.24 },
    { price: 99.89, quantity: 7.65, totalQuantity: 65.89 },
    { price: 99.88, quantity: 6.32, totalQuantity: 72.21 },
    { price: 99.87, quantity: 4.56, totalQuantity: 76.77 },
    { price: 99.86, quantity: 3.12, totalQuantity: 79.89 },
    { price: 99.85, quantity: 5.56, totalQuantity: 85.45 },
    { price: 99.84, quantity: 6.77, totalQuantity: 92.22 },
    { price: 99.83, quantity: 4.56, totalQuantity: 96.78 },
    { price: 99.82, quantity: 3.45, totalQuantity: 100.23 },
  ];

  // Calculate cumulative quantities
  const cumulativeAsks = [...asks].reverse().map((ask, index, arr) => {
    return {
      ...ask,
      cumulativeQuantity:
        arr.slice(0, index + 1).reduce((sum, { quantity }) => sum + quantity, 0),
    };
  });

  const cumulativeBids = bids.map((bid, index) => {
    return {
      ...bid,
      cumulativeQuantity:
        bids.slice(0, index + 1).reduce((sum, { quantity }) => sum + quantity, 0),
    };
  });

  const maxCumulativeQuantity = Math.max(
    ...cumulativeAsks.map((ask) => ask.cumulativeQuantity),
    ...cumulativeBids.map((bid) => bid.cumulativeQuantity)
  );

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
            {cumulativeAsks.reverse().map((ask, index) => (
              <tr
                key={index}
                className={`asks ${index % 2 === 0 ? 'light-red' : 'dark-red'}`}
              >
                <td>
                  <div
                    className="bar"
                    style={{
                      width: `${
                        (ask.cumulativeQuantity / maxCumulativeQuantity) * 100
                      }%`,
                    }}
                  ></div>
                  {ask.price}
                </td>
                <td>{ask.quantity.toFixed(2)}</td>
                <td>{ask.totalQuantity.toFixed(2)}</td>
              </tr>
            ))}
            <tr className="spread-row">
              <td colSpan={3}>Spread: 0.19 (0.1900%)</td>
            </tr>
            {cumulativeBids.map((bid, index) => (
              <tr
                key={index}
                className={`bids ${index % 2 === 0 ? 'light-green' : 'dark-green'}`}
              >
                <td>
                  <div
                    className="bar"
                    style={{
                      width: `${
                        (bid.cumulativeQuantity / maxCumulativeQuantity) * 100
                      }%`,
                    }}
                  ></div>
                  {bid.price}
                </td>
                <td>{bid.quantity.toFixed(2)}</td>
                <td>{bid.totalQuantity.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderBook;
