export interface Project {
    id: number;
    project_name: string;
    project_summary: string;
    notes: string;
    start_date: string;
    deadline: string;
    status: string;
    category: ProjectCategory;
    client: ProjectClient;
}

export interface ProjectCategory {
    id: number;
    category_name: string;
}

export interface ProjectClient {
    id: number;
    name: string;
}

export interface ProjectsResponse {
    data: Project[];
}