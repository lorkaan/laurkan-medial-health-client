import React from 'react';
import TaskForm from './TaskForm';
import { Task } from './props_interface';
import { Dictionary, fetchData, sendData } from './utils';
import { Button, IconButton, Snackbar } from '@mui/material';
import EditTask from './EditTask';

interface TaskListProps{
    editable?: boolean;
}

interface TaskListState{
    task_lookup: Dictionary<Task>;
    cur_edit_task: Task | null;
    save_status: string;
    notification_status: boolean;
    greyout: string; // The class to use to greyout the applcation during popup usage
}

interface SuccessResponse{
    success: number;
}

export default class TaskList extends React.Component<TaskListProps, TaskListState>{
    static domId: string = "GreyOut";   // Should be class, but as its just a single case, id works perfectly
    static StoreButton: string = "StoreList";
    static ListItemFormClass: string = "li_item_form";
    static default_filename = "http://127.0.0.1:5001/tasklist";
    static store_url = "http://127.0.0.1:5001/store_tasks";

    constructor(props: TaskListProps){
        super(props);
        this.state = {
            task_lookup: {},
            cur_edit_task: null,
            save_status: "",
            notification_status: false,
            greyout: ""
        }
        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleSaveEdit = this.handleSaveEdit.bind(this);
        this.handleCancelEdit = this.handleCancelEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleStoreTaskList = this.handleStoreTaskList.bind(this);
        this.handleNoteClose = this.handleNoteClose.bind(this);
    }

    handleEditClick(task_id: string){
        if(task_id.length > 0){
            let task: Task | null = this.state.task_lookup[task_id] || null;
            if(task != null){
                this.setState({cur_edit_task: task, greyout:TaskList.domId});
            }
        }else{
            this.setState({cur_edit_task: null, greyout: ""});
        }     
    }

    handleSaveEdit(changed_task: Task){
        let new_tasks: Dictionary<Task> = this.state.task_lookup;
        new_tasks[changed_task.id] = changed_task;
        this.setState({task_lookup: new_tasks, cur_edit_task: null});
    }

    handleCancelEdit(){
        this.setState({cur_edit_task: null, greyout: ""});
    }

    handleDelete(task_id: string){
        let tasks = this.state.task_lookup;
        delete tasks[task_id];
        this.setState({task_lookup: tasks, cur_edit_task: null});
    }

    handleStoreTaskList(){
        sendData<Dictionary<Task>, SuccessResponse>(TaskList.store_url, this.state.task_lookup)
        .then((resp)=> {
            if(resp.success == 1){
                // Succcess
                this.setState({save_status: "Save Successful", notification_status: true});
            }else{
                // Fail
                this.setState({save_status: "Failed to Save", notification_status: true});
            }
        })
    }

    handleNoteClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        this.setState({save_status: "", notification_status: false});
        if (reason === 'clickaway') {
          return;
        }
    };

    async componentDidMount() {
        fetchData<Task[]>(TaskList.default_filename)
        .then((tasks)=>{
            // Build Lookup Table
            let task_dict: Dictionary<Task> = {};
            for(let i = 0; i < tasks.length; i++){
                task_dict[tasks[i].id] = tasks[i];
            }
          this.setState({task_lookup: task_dict});
        });
    }

    render(){
        return (
            <div>
                <Snackbar
                    open={this.state.notification_status}
                    autoHideDuration={5000}
                    onClose={this.handleNoteClose}
                    message={this.state.save_status}
                />
                <EditTask task={this.state.cur_edit_task} deleteTaskCallback={this.handleDelete} cancelCallback={this.handleCancelEdit} saveCallback={this.handleSaveEdit}/>
                <div id={this.state.greyout}>
                    <Button variant="contained" id={TaskList.StoreButton} onClick={this.handleStoreTaskList}>Store</Button>
                    {Object.keys(this.state.task_lookup).map((task_id: string) => (
                        <div  className={TaskList.ListItemFormClass}>
                            <TaskForm 
                                key={task_id}
                                task={this.state.task_lookup[task_id]}
                                editable={false}
                            />
                            <Button variant="contained" onClick={this.handleEditClick.bind(this, task_id)}>Edit</Button>
                        </div>
                        ))
                    }
                </div>
            </div>
        );
    }
}