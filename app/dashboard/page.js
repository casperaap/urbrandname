import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import Counter from "@/components/Counter";
import CheckHandleCard from "@/components/CheckHandleCard";
import HeroHeader from "@/components/HeroHeader";


export const runtime = "nodejs";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <>
    <Navbar className="row-start-1 w-full" />
    
    <div className="grid w-full grid-cols-1 grid-rows-[auto_auto_1fr] items-center justify-items-stretch pt-20 pb-20">
      <div><HeroHeader /> </div>
      <div><CheckHandleCard /></div>
    </div>
    </>
  );
}