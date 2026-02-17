import projectsData from './projects.json';

export type ProjectCategory =
    | 'Commercial & Retail'
    | 'Residential Apartment'
    | 'Single-Family Home';

export type ProjectStatus = 'Completed' | 'In Progress' | 'Ongoing Portfolio';

export interface ProjectImage {
    src: string;
    alt: string;
}

export interface ProjectSpec {
    label: string;
    value: string;
}

export interface Project {
    id: string;
    code: string;
    slug: string;
    title: string;
    title_el?: string;
    category: ProjectCategory;
    category_el?: string;
    location: string;
    status: ProjectStatus;
    specs: ProjectSpec[];
    specs_el?: ProjectSpec[];
    shortDescription: string;
    shortDescription_el?: string;
    fullDescription: string;
    fullDescription_el?: string;
    scopeOfWork: string[];
    scopeOfWork_el?: string[];
    keyFeatures: string[];
    materials?: string[];
    images: ProjectImage[];
    isFeatured?: boolean;
}

// Cast the imported data to the Project type to ensure type safety in the app
export const projects: Project[] = (projectsData as any[]).map(p => ({
    ...p,
    category: p.category as ProjectCategory,
    status: p.status as ProjectStatus
}));

export const getProjects = () => projects;
export const getProjectBySlug = (slug: string) => projects.find(p => p.slug === slug);
export const getProjectsByCategory = (category: ProjectCategory) => projects.filter(p => p.category === category);
export const getFeaturedProjects = () => projects.filter(p => p.isFeatured);
