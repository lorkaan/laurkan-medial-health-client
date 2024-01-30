import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Task } from './props_interface';
import TaskForm from './TaskForm';
import { Button } from '@mui/material';
//import './EditTask.css';

const priority_level = [
    {
        value: "low",
        label: "Low"
    },
    {
        value: "medium",
        label: "Medium"
    },
    {
        value: "high",
        label: "High"
    }
];

const status_level = [
    {
        value: "pending",
        label: "Pending"
    },
    {
        value: "in progress",
        label: "In Progress"
    },
    {
        value: "completed",
        label: "Completed"
    },
    {
        value: "cancelled",
        label: "Cancelled"
    }
];

interface EditTaskProps{
    task: Task | null;
    saveCallback: (para: Task) => void;
    deleteTaskCallback: (para: string) => void;
    cancelCallback: () => void;
}

export default class EditTask extends React.Component<EditTaskProps, any>{

    static overlayId = "OverlayEdit";
    static closeButton  = "CloseEdit";
    static cancelButtonId: string = "CancelButtonId";

    constructor(props: EditTaskProps){
        super(props);
    }

    render(){
        if(this.props.task == null){
            return (<div></div>);
        }else{
            return (
                <div id={EditTask.overlayId}>
                    <div id={EditTask.closeButton} onClick={this.props.cancelCallback}>X</div>
                    <TaskForm editable={true} task={this.props.task} deleteTaskCallback={this.props.deleteTaskCallback} cancelCallback={this.props.cancelCallback} saveTaskCallback={this.props.saveCallback}/>
                </div>
            );
        }
    }
}

