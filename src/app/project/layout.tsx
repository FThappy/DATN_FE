import Navbar from "@/components/Navbar";

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div >
      <Navbar />
      <div className="border-slate-400 w-full h-[1px] border-b-[1px]"></div>
      {children}
    </div>
  );
}
