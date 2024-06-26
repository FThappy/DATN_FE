
import SidebarFriends from "./SidebarFriends";

export default function FriendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#f1eff4d1] w-full h-auto    ">
      <div className="flex relative w-full gap-2">
        <SidebarFriends />
        {children}
      </div>
    </div>
  );
}
