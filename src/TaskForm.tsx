import TaskTextField from "./TaskTextField";
import TaskSelectField from "./TaskSelectField";
import React from 'react';
import Box from '@mui/material/Box';
import { Button } from "@mui/material";
import { Assignee, Task, getAssigneeName } from "./props_interface";
import { Dictionary } from "./utils";
import TaskDatePicker from "./TaskDataPicker";
import AssigneeSelectField from "./AssigneeSelectField";

interface TaskFormProps{
    task: Task;
    editable: boolean;
    saveTaskCallback?: (para: Task) => void;
    deleteTaskCallback?: (para: string) => void;
    cancelCallback?: () => void;
}

interface TaskFormState{
    task: Task;
}

export default class TaskForm extends React.Component<TaskFormProps, TaskFormState>{

    static priority_level_options: Dictionary<string> = {
        "low": "Low",
        "medium": "Medium",
        "high": "High"
    };

    static status_options: Dictionary<string>  = {
        "pending": "Pending",
        "in progress": "In Progress",
        "completed": "Completed",
        "cancelled": "Cancelled"
    };

    static deleteButtonId: string = "DeleteTaskButton";

    static saveButtonId: string = "SaveTaskButton";

    static cancelButtonId: string = "CancelButtonId";

    constructor(props: TaskFormProps){
        super(props);
        this.state = {
            task: Object.assign({}, this.props.task)
            //task: this.props.task
        }
        this.change_title = this.change_title.bind(this);
        this.change_description = this.change_description.bind(this);
        this.change_notes = this.change_notes.bind(this);
        this.change_date = this.change_date.bind(this);
        this.change_assignee = this.change_assignee.bind(this);
        this.change_priority = this.change_priority.bind(this);
        this.change_status = this.change_status.bind(this);
        this.saveTask = this.saveTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
    }

    deleteTask(){
        if(this.props.deleteTaskCallback){
            this.props.deleteTaskCallback(this.state.task.id);
        }
    }

    saveTask(){
        // Move up the chain as a single task
        if(this.props.saveTaskCallback){
            this.props.saveTaskCallback(this.state.task);
        }
    }

    change_title(val: string){
        let changed_task: Task = this.state.task;
        changed_task.title = val;
        this.setState({task: changed_task});
    }

    change_description(val: string){
        let changed_task: Task = this.state.task;
        changed_task.description = val;
        this.setState({task: changed_task});
    }

    change_notes(val: string){
        let changed_task: Task = this.state.task;
        changed_task.notes = val;
        this.setState({task: changed_task});
    }

    change_date(val: string){
        let changed_task: Task = this.state.task;
        changed_task.dueDate = val;
        this.setState({task: changed_task});
    }

    change_assignee(val: Assignee){
        let changed_task: Task = this.state.task;
        changed_task.assignee = val;
        this.setState({task: changed_task});
    }

    change_priority(val: string){
        let changed_task: Task = this.state.task;
        changed_task.priorityLevel = val;
        this.setState({task: changed_task});
    }

    change_status(val: string){
        let changed_task: Task = this.state.task;
        changed_task.status = val;
        this.setState({task: changed_task});
    }

    render(){
        if(this.props.editable){
            return (
                <div >
                    <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                    >
                        <TaskTextField performChange={this.change_title} id="title" label="Title" value={this.state.task.title} readonly={!this.props.editable}/>
                        <TaskTextField performChange={this.change_description} id="description" label="Description" value={this.state.task.description} readonly={!this.props.editable} multiline={true}/>
                        <TaskTextField performChange={this.change_notes} id="notes" label="Notes" value={this.state.task.notes} readonly={!this.props.editable} multiline={true}/>
                        <AssigneeSelectField performChange={this.change_assignee} id="asignee" label="Asignee" assigned={this.state.task.assignee} readonly={!this.props.editable}/>
                        <TaskDatePicker performChange={this.change_date} id="dueDate" label="Due Date" value={this.state.task.dueDate} readonly={!this.props.editable}/>
                        <TaskSelectField performChange={this.change_priority} id="priorityLevel" label="Priority Level" selectedOption={this.state.task.priorityLevel} readonly={!this.props.editable} options={TaskForm.priority_level_options}/>
                        <TaskSelectField performChange={this.change_status} id="status" label="Status" selectedOption={this.state.task.status} readonly={!this.props.editable} options={TaskForm.status_options}/>
                    </Box>
                    <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                    >
                        <Button id={TaskForm.saveButtonId} onClick={this.saveTask} >Save</Button>
                        <Button id={TaskForm.cancelButtonId} onClick={this.props.cancelCallback}>Cancel</Button>
                        <Button id={TaskForm.deleteButtonId} onClick={this.deleteTask} >Delete</Button>
                    </Box>
                </div>
            );
        }else{
            return (
                <div>
                    <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                    >
                        <TaskTextField id="title" label="Title" value={this.props.task.title} readonly={!this.props.editable}/>
                        <TaskTextField id="description" label="Description" value={this.props.task.description} readonly={!this.props.editable} multiline={true}/>
                        <TaskTextField id="notes" label="Notes" value={this.props.task.notes} readonly={!this.props.editable} multiline={true}/>
                        <TaskTextField id="asignee" label="Asignee" value={getAssigneeName(this.props.task.assignee)} readonly={!this.props.editable}/>
                        <TaskDatePicker id="dueDate" label="Due Date" value={this.props.task.dueDate} readonly={!this.props.editable}/>
                        <TaskSelectField id="priorityLevel" label="Priority Level" selectedOption={this.props.task.priorityLevel} readonly={!this.props.editable} options={TaskForm.priority_level_options}/>
                        <TaskSelectField id="status" label="Status" selectedOption={this.props.task.status} readonly={!this.props.editable} options={TaskForm.status_options}/>
                    </Box>
                </div>
            );
        }
        
    }

}