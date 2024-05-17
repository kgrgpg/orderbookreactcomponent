# OrderBook.tsx

## Purpose
This component renders the order book for the exchange application. It displays the ask and bid orders with their respective quantities and total quantities, and highlights the spread between the best ask and bid prices.

## Key Decisions
- **WebSocket Integration:** The component connects to a WebSocket server to fetch real-time order book data.
- **Cumulative Quantities:** The bar size within each row represents the cumulative quantity as we move away from the spread.
- **Hover Effect:** Implemented hover effects to highlight rows for better visibility.

## Challenges
- **Dynamic Data Handling:** Ensuring the component updates efficiently with incoming real-time data.
- **Visual Representation:** Accurately displaying the cumulative quantities and ensuring the visual representation is clear and intuitive.

## Code Explanation
- **WebSocket Setup:** The component sets up a WebSocket connection to receive order book updates.
- **Data Processing:** Calculates cumulative quantities and the spread, and updates the state accordingly.
- **Rendering:** Renders the order book table with rows for asks and bids, and includes the spread row in between.

## Future Improvements
- **Performance Optimization:** Further optimize the component for better performance with a large number of updates.
- **Customization:** Add options for customizing the appearance and behavior of the order book.

## Example WebSocket Data Format
```json
{
  "asks": [
    { "price": 100.19, "quantity": 9.34, "totalQuantity": 94.18 },
    { "price": 100.18, "quantity": 2.34, "totalQuantity": 91.44 },
    ...
  ],
  "bids": [
    { "price": 100.00, "quantity": 6.00, "totalQuantity": 6.00 },
    { "price": 99.99, "quantity": 7.21, "totalQuantity": 13.21 },
    ...
  ]
}
