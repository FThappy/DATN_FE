import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function EventLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div >
      <Navbar />
      {children}
    </div>
  );
}
