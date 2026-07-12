import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dudexa Knowledge Center",
  description: "Verified Dudexa product comparisons, placement guidance, maintenance information and official technical documents.",
};

export default function KnowledgeLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
