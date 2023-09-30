import { ROUTE } from "@/config/route";
import { redirect } from "next/navigation";

export default function InitialPage() {
  redirect(ROUTE.APP.HOME);
}
