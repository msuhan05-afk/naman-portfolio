import { notFound } from "next/navigation";
import { getContent, caseStudySections } from "@/lib/content";
import CaseStudyClient from "./CaseStudyClient";

export const dynamic = "force-dynamic";

export default async function Page({ params }) {
  const c = await getContent();
  const project = c.projects.find((p) => p.slug === params.slug);
  if (!project) return notFound();
  const sections =
    Array.isArray(project.sections) && project.sections.length
      ? project.sections
      : caseStudySections;
  return <CaseStudyClient project={project} sections={sections} />;
}
