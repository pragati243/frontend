export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <div className="container mx-auto p-4">{children}</div>
      </body>
    </html>
  );
}
