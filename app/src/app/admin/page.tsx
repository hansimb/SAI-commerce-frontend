import { redirect } from "next/navigation";

import { getAdminAppUrl } from "@/lib/admin/env";

export default function AdminPage() {
  redirect(getAdminAppUrl());
}
