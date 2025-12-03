import "@/styles/globals.css";

export default function RootLayout({ children }) {
  return (
    <html>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css"
        precedence="default"
      />
      <body>{children}</body>
    </html>
  );
}
