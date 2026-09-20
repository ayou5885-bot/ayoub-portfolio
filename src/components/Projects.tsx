import { projects } from "@/data/projects";
import { useReveal } from "@/hooks/useReveal";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section id="projects" className="px-6 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <div
          ref={ref}
          className={`reveal mb-14 md:mb-20 ${visible ? "is-visible" : ""}`}
        >
          <p className="mb-5 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.22em] text-[#8a8780]">
            <span className="inline-block h-px w-10 bg-[#8a8780]" />
            Selected Work
          </p>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h2 className="text-4xl font-serif leading-tight tracking-tight text-[#161513] sm:text-5xl md:text-6xl">
              Projects
            </h2>
            <p className="max-w-sm text-sm leading-relaxed text-[#4b4944] md:text-right">
              A selection of websites and web applications I've designed and
              built. Each one opens live in a new tab.
            </p>
          </div>
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
