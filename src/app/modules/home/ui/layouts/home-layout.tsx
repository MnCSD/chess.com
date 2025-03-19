import { SidebarProvider } from "@/components/ui/sidebar";
import { HomeSidebar } from "../home-sidebar";
import { HomeNavbar } from "../home-navbar";

interface HomeLayoutProps {
  children: React.ReactNode;
}

export const HomeLayout = ({ children }: HomeLayoutProps) => {
  return (
    <div className="w-full">
      <HomeNavbar />
      <div className="flex min-h-screen">
        <main className="flex-1 overflow-y-auto xl:ml-[145px] lg:ml-[50px]">
          <HomeSidebar isMobile={false} />
          {children}
        </main>
      </div>
    </div>
  );
};

// lg:w-[50px] xl:w-[145px]
