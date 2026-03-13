import ProfileView from "./_comps"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Profile",
  description: "Manage your Dorly account and preferences.",
}

export default function ProfilePage() {
  return <ProfileView />;
}
