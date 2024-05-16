// app/layout.tsx
import '../styles/globals.css';

export const metadata = {
  title: 'Order Book App',
  description: 'A simple order book application',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
