import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import "aos/dist/aos.css";
import { AuthProvider } from "../firebase/authContext";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Clinica + Saúde",
  description: "Clinica + Saúde",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${montserrat.className} antialiased`}
      > 
      <AuthProvider>  
        {children}  
      </AuthProvider>
      </body>
    </html>
  );
}
