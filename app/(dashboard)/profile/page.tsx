import ProfileView from "./_comps"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Profile",
  description: "Manage your Dawarly account and preferences.",
}

export default function ProfilePage() {
  return <ProfileView />
}
