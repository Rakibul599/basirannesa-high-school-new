import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

// Load Roboto locally from TTF files
const roboto = localFont({
  src: [
    {
      path: "./fonts/roboto/Roboto-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/roboto/Roboto-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Basirannesa High School",
  description: "Official website of Basirannesa High School, providing information about academics, admissions, events, and school activities.",
  keywords: [
    "Basirannesa High School",
    "Basirannesa school website",
    "basirannesaschool",
    "Munshigonj",
    "school admissions",
    "school events",
    "academic programs",
    "student activities",
    "basirannesahighschool",
    "basirannesa high school"
  ],
  authors: [
    { name: "Basirannesa High School", url: "https://basirannesaschool.edu.bd" }
  ],
  icons: {
    icon: "/logo.png",       // main favicon
    shortcut: "/logo.png",   // optional
    apple: "/logo.png"       // optional for Apple devices
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} antialiased`}>
        <Header />
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
