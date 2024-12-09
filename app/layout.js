import "./globals.css";

export const metadata = {
      title: "Jacob Johnson | Developer, Designer, Creative",
      description: "Web Developer and Designer out of Minneapolis, MN",
};

export default function RootLayout({ children }) {
      return (
            <html lang="en">
                  <body>
                        {children}
                  </body>
            </html>
      );
}
