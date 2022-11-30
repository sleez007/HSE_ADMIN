export interface ProjectModel {
    projectTitle: string;
    isCompleted: boolean | string;
    startDuration: string |  null;
    endDuration: string | null;
    projectId: number | null | string
}