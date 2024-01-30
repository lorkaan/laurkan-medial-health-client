import React from "react";
import { Assignee } from "./props_interface";
import { Dictionary, fetchData } from "./utils";
import { MenuItem, TextField } from "@mui/material";

interface AssigneeSelectProps{
    id: string;
    label: string;
    assigned: Assignee;
    performChange?: (para: Assignee) => void;
    readonly: boolean;
}

interface AssigneeState{
    options: Dictionary<Assignee>;
}


export default class AssigneeSelectField extends React.Component<AssigneeSelectProps, AssigneeState>{

    static default_filename = "http://127.0.0.1:5001/get_assignees"

    constructor(props: AssigneeSelectProps){
        super(props);
        this.state = {
            options: {}
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event: any){
        if(this.props.performChange && event.target != null){
            let new_val: Assignee = this.state.options[event.target.value];
            this.props.performChange(new_val)
        }
    }

    async componentDidMount() {
        fetchData<Assignee[]>(AssigneeSelectField.default_filename)
        .then((assignees)=>{
            let new_options: Dictionary<Assignee> = {};
            for(let i = 0; i < assignees.length; i++){
                new_options[assignees[i].userId] = assignees[i];
            }
          this.setState({options: new_options});
        });
    }

    render(){
        if(this.props.readonly){
            return (
                <TextField id={this.props.id} label={this.props.label} value={this.props.assigned.displayName} variant="filled" 
                    InputProps={{
                        readOnly: this.props.readonly,
                    }}
                />
            );
        }else{
            return(
                <TextField onChange={this.handleChange} value={this.props.assigned.userId} id={this.props.id} label={this.props.label} variant="filled" select>
                    {Object.keys(this.state.options).map((userId: string) => (
                        <MenuItem key={userId} value={userId}>
                            {this.state.options[userId].displayName}
                        </MenuItem>
                    ))}
                </TextField>
            ); 
        }           
    }
}