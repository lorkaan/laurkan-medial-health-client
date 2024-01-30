import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import React from 'react';
import { Dictionary } from './utils';

interface TaskSelectFieldProps{
    id: string;
    options: Dictionary<string>;
    label: string;
    selectedOption: string;
    performChange?: (para: string) => void;
    readonly? : boolean;
}

interface TaskSelectFieldState{
    id: string;
    options: {[key: string]: string}[];
    label: string;
    selectedIndex: number;
    readonly: boolean;
    value: string;
}

export default class TaskSelectField extends React.Component<TaskSelectFieldProps, {}>{

    /** Make props an interface to limit the object keys 
     * 
     * Expected Props:
     *      options
     *      priorityLevel
     *      id
     *      label
    */
    constructor(props: TaskSelectFieldProps){
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event: any){
        if(this.props.performChange && event.target != null){
            let new_val: string = event.target.value;
            this.props.performChange(new_val)
        }
    }

    render(){
        if(this.props.readonly){
            return (
                <TextField id={this.props.id} label={this.props.label} value={this.props.options[this.props.selectedOption]} variant="filled" 
                    InputProps={{
                        readOnly: this.props.readonly,
                    }}
                />
            );
        }else{
            return(
                <TextField onChange={this.handleChange} value={this.props.selectedOption} id={this.props.id} label={this.props.label} variant="filled" select>
                    {Object.keys(this.props.options).map((selected: string) => (
                        <MenuItem key={selected} value={selected}>
                            {this.props.options[selected]}
                        </MenuItem>
                    ))}
                </TextField>
            ); 
        }           
    }
}