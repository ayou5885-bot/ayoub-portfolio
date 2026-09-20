import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { useReveal } from "@/hooks/useReveal";

export default function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const { ref, visible } = useReveal<HTMLAnchorElement>();

  // Featured layout for the first project, standard for the rest
  const isFeatured = index === 0;

  return (
    <a
      ref={ref}
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`reveal group relative flex flex-col overflow-hidden rounded-xl border border-[#e6e3dd] bg-[#ffffff] transition-all duration-700 hover:border-[#161513]/20 hover:shadow-[0_24px_60px_-24px_rgba(22,21,19,0.18)] ${
        visible ? "is-visible" : ""
      } ${isFeatured ? "md:flex-row md:items-stretch" : ""}`}
      style={{ transitionDelay: `${(index % 2) * 80}ms` }}
      aria-label={`View ${project.name} project — opens in a new tab`}
    >
      {/* Image */}
      <div
        className={`relative overflow-hidden bg-[#e6e3dd] ${
          isFeatured ? "md:w-[58%]" : "aspect-[16/10]"
        }`}
      >
        <div
          className={`h-full w-full ${isFeatured ? "min-h-[280px]" : ""}`}
        >
          <img
            src={project.image}
            alt={project.imageAlt}
            loading={index < 2 ? "eager" : "lazy"}
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
          />
        </div>
        {/* External link badge */}
        <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-[#f7f6f3]/90 text-[#161513] opacity-0 backdrop-blur-sm transition-all duration-400 group-hover:opacity-100 group-hover:translate-y-0 translate-y-1">
          <ArrowUpRight size={16} />
        </div>
        <span className="absolute left-4 top-4 rounded-full bg-[#f7f6f3]/90 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.12em] text-[#4b4944] backdrop-blur-sm">
          {project.category}
        </span>
      </div>

      {/* Content */}
      <div
        className={`flex flex-col justify-between p-6 md:p-8 ${
          isFeatured ? "md:w-[42%] md:justify-center" : ""
        }`}
      >
        <div>
          <h3
            className={`font-serif tracking-tight text-[#161513] ${
              isFeatured ? "text-3xl md:text-4xl" : "text-2xl"
            }`}
          >
            {project.name}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-[#4b4944] md:text-[15px]">
            {project.description}
          </p>
        </div>

        <div className="mt-6 flex items-center gap-2 text-sm font-medium text-[#161513]">
          <span className="relative">
            View Project
            <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#161513] transition-all duration-300 group-hover:w-full" />
          </span>
          <ArrowUpRight
            size={15}
            className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5"
          />
        </div>
      </div>
    </a>
  );
}
