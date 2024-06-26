import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function FeatureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {children}
    </div>
  );
}
