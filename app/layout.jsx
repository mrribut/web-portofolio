import "./globals.css";

export const metadata = {
  title: "Sahrul Ageng Prasetyo — Web Developer",
  description:
    "Portofolio Sahrul Ageng Prasetyo, lulusan Teknik Informatika yang berfokus pada pengembangan sistem berbasis web.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
