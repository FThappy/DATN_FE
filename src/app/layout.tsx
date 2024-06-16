import type { Metadata } from "next";
import { Inter, Roboto_Condensed } from "next/font/google";
import "./globals.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NextTopLoader from "nextjs-toploader";


// const inter = Inter({ subsets: ["latin"] });
const robotoCondensed = Roboto_Condensed({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Chung Tay",
  description: "Trang web từ thiện",
  openGraph: {
    title: "Chung Tay",
    description: "Trang web từ thiện",
    url: "https://datn-fe-3xyo.onrender.com/",
    siteName: "Next.js",
    images: [
      {
        url: "/logo.png", // Must be an absolute URL
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={`${robotoCondensed.className} antialiased`}>
        <div>
          <NextTopLoader showSpinner={false} />
          {children}
          <ToastContainer />
        </div>
      </body>
    </html>
  );
}
