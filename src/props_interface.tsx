

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

export interface StoredTask{
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

export interface TaskFormProps{
    title: string;
    description: string;
    dueDate: string;
    priorityLevel: string;
    assignee: string;
    notes: string;
    status: string;
    editable?: boolean;
}

export interface TaskFormState{
    title: string;
    description: string;
    due_date: string;
    priority_level: string;
    assignee: string;
    notes: string;
    status: string;
    editable: boolean;
}