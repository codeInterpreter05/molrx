import DefaultLayout from "@/components/Layouts/DefaultLayout";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "MolRx - Drug Research Platform",
  description: "A platform for sharing and discussing drug discovery and development",
};

export default function Home() {
  return (
    <>
      <DefaultLayout>
        <p>Hello</p>
      </DefaultLayout>
    </>
  );
}
