import { ExternalLink } from 'lucide-react'


type ProjectLink = {
  url: string
  label: string
  icon?: React.ComponentType
}

export type Project = {
  name: string
  status: 'active' | 'upcoming'
  description: string
  url?: string | ProjectLink[]
}

const getStatusColor = (status: Project['status']) => {
  switch (status) {
    case 'active':
      return 'text-green-700 bg-green-100'
    case 'upcoming':
      return 'text-blue-700 bg-blue-100'
    default:
      return 'text-gray-700 bg-gray-100'
  }
}

const ProjectLink = ({ url, label, icon: Icon }: ProjectLink) => (
  // eslint-disable-next-line react/jsx-no-target-blank
  <a
    href={url}
    target="_blank"
    rel="noopener"
    className="inline-flex items-center gap-1 text-gray-600 hover:text-gray-900"
    onClick={(e) => e.stopPropagation()}
  >
    {Icon && <Icon />}
    {label && <span>{label}</span>}
    <ExternalLink className="w-4 h-4" />
  </a>
)

export const ProjectCard = ({ project }: { project: Project }) => {
  const content = (
    <>
      <div className="flex items-center justify-between gap-3 mb-2">
        <div className="flex items-center gap-2">
          <h3 className="text-xl font-medium">{project.name}</h3>
          {project.url && (
            <div className="flex items-center gap-2">
              {Array.isArray(project.url) ? (
                project.url.map((link) => (
                  <ProjectLink key={link.url} {...link} />
                ))
              ) : (
                <ExternalLink className="w-4 h-4 text-gray-400 transition-colors group-hover:text-gray-600" />
              )}
            </div>
          )}
        </div>
        <span
          className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
            project.status,
          )}`}
        >
          {project.status}
        </span>
      </div>
      <p className="text-gray-600">{project.description}</p>
    </>
  )

  if (project.url && !Array.isArray(project.url)) {
    return (
      // eslint-disable-next-line react/jsx-no-target-blank
      <a
        href={project.url}
        target="_blank"
        rel="noopener"
        className="block py-4 px-4 -mx-4 transition-colors hover:bg-gray-50 group rounded-lg"
      >
        {content}
      </a>
    )
  }

  return (
    <div className="block py-4 px-4 -mx-4 transition-colors hover:bg-gray-50 group rounded-lg">
      {content}
    </div>
  )
}
