import './globals.css';

export const metadata = {
  title: 'Quiz App',
  description: 'A quiz application with leaderboard',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className='bg-main-gradient'>
        {children}
      </body>
    </html>
  );
}
