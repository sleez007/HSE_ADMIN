export interface DetailModel{
    reportId: string;
    reportedBy: string;
    assignTo: string;
    location: string;
    incidentCategory: string;
    description: string;
    response: string;
    isCorrectiveActionRequired: string;
    correctiveAction: string;
    incidentSource: string;
    riskMatrix: string;
    incidentStatus: string;
    incidentRemarks: string;
    dueDate: string;
    createdAt: string
    id: number | string;
}