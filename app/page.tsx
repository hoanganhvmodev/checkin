import { redirect } from "next/navigation";

export default function Home() {
  redirect("/checkin");

  // return (
  //   <main className="flex flex-col items-center justify-between p-24">
  //     Home Page
  //   </main>
  // );
}
