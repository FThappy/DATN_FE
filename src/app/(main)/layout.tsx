import Navbar from "@/components/Navbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />
      <div className="border-slate-200 w-full h-[1px] border-b-[1px]"></div>
      {children}
    </div>
  );
}
