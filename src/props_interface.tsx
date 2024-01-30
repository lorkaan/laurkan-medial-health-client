

export interface Assignee{
    userId: number;
    displayName: string;
}

export interface Task{
    title: string;
    description: string;
    dueDate: string;
    priorityLevel: string;
    assignee: Assignee;
    notes: string;
    status: string;
    id: string;
}


export function getAssigneeName(assignee: Assignee){
    return assignee.displayName;
}
