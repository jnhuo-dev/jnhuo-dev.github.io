import type { Project } from "../../types/project";
import SafeImage from "../common/SafeImage";

type ProjectGalleryProps = {
  project: Project;
};

export default function ProjectGallery({ project }: ProjectGalleryProps) {
  const images = Array.from(new Set([project.coverImage, ...project.images].filter(Boolean)));

  return (
    <div
      className={`project-gallery ${images.length === 1 ? "project-gallery--single" : ""}`}
      aria-label={`${project.title} 이미지`}
    >
      {images.length > 0 ? (
        images.map((image, index) => (
          <figure className="gallery-item" key={image}>
            <SafeImage src={image} alt={`${project.title} image ${index + 1}`} title={project.title} />
          </figure>
        ))
      ) : (
        <figure className="gallery-item">
          <SafeImage alt={`${project.title} placeholder`} title={project.title} />
        </figure>
      )}
    </div>
  );
}
