export interface ProjectModel {
    projectTitle: string;
    isCompleted: boolean | string;
    startDuration: string | Date | null;
    endDuration: string | Date |null;
    projectId: number | null | string
}