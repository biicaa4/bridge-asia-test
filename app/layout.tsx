import './globals.css';
import Footer from './components/Footer'; // Adjust the path based on where your Footer component is located

export const metadata = {
  title: 'Quiz App',
  description: 'A quiz application with leaderboard',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-main-gradient min-h-screen flex flex-col">
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
