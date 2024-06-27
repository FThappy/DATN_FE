import type { Metadata } from "next";
import { Inter, Roboto_Condensed } from "next/font/google";
import "./globals.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NextTopLoader from "nextjs-toploader";
import UserNewTab from "@/components/UserNewTab";
import BoxChat from "@/components/BoxChat";
import ConfigSocket from "@/components/ConfigSocket";


// const inter = Inter({ subsets: ["latin"] });
const robotoCondensed = Roboto_Condensed({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Chung Tay",
  description: "Trang web từ thiện",
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
          <UserNewTab />
          <NextTopLoader showSpinner={false} />
          {children}
          <ToastContainer />
          <BoxChat />
          {/* <ConfigSocket /> */}
        </div>
      </body>
    </html>
  );
}
