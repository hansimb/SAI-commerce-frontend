import { notFound, redirect } from "next/navigation";

import { getAdminAppUrl } from "@/lib/admin/env";

export default function AdminPage() {
  const adminAppUrl = getAdminAppUrl();

  if (!adminAppUrl) {
    notFound();
  }

  redirect(adminAppUrl);
}
