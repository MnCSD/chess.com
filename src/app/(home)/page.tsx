import Image from "next/image";
import { HomeView } from "../modules/home/ui/views/home-view";
import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if (!session?.user?.country && !session?.user?.level) {
    redirect("/preferences");
  } else {
    redirect("/home");
  }

  return (
    <main className="">
      {/* <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button className="bg-black/30 border-black/20 border-b-3 w-full py-4 rounded-md flex items-center pl-[20%] gap-x-10 cursor-pointer hover:bg-black/50 transition-colors duration-300">
          <p className="text-white"> Sign Out</p>
        </button>
      </form> */}
      <HomeView />
    </main>
  );
}
