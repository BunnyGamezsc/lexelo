import { redirect } from "next/navigation";
import { landingInternalLinks } from "../content/links";

export default function PlansRedirectPage() {
  redirect(landingInternalLinks.pricing);
}
