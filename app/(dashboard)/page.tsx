import { UserButton } from "@clerk/nextjs";

export default function Dashboard() {
  return (
    <>
      <p>This is an authenticated route</p>
      <UserButton afterSignOutUrl="/" />
    </>
  );
}
