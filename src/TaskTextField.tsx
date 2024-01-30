import TextField from '@mui/material/TextField';
import React from 'react';

interface TaskTextFieldProps{
    id: string;
    value: string;
    label: string;
    performChange?: (para: string) => void;
    readonly?: boolean;
    multiline?: boolean;
}

export default class TaskTextField extends React.Component<TaskTextFieldProps, {}>{

    /** Make props an interface to limit the object keys 
     * 
     * Expected Props:
     *      value
     *      id
     *      label
     *      readonly
    */
    constructor(props: TaskTextFieldProps){
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
        if(this.props.multiline){
            return(
                <TextField name={this.props.id} onChange={this.handleChange} label={this.props.label} variant="filled" value={this.props.value} multiline
                    InputProps={{
                        readOnly: this.props.readonly,
                    }}
                />
            ); 
        }else{
            return(
                <TextField id={this.props.id} onChange={this.handleChange} label={this.props.label} variant="filled" value={this.props.value} 
                    InputProps={{
                        readOnly: this.props.readonly,
                    }}
                />
            ); 
        }           
    }
}