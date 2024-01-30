import React from "react";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";

export default class TaskDatePicker extends React.Component<any, any>{
    constructor(props: any){
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event: any){
        if(this.props.performChange){
            let new_val: string = event.format("YYYY-MM-DD");
            this.props.performChange(new_val)
        }
    }
    
    render(){
        if(this.props.readonly){
            return(
                <LocalizationProvider dateAdapter={AdapterDayjs}>   
                    <DatePicker name={this.props.id} label={this.props.label} value={dayjs(this.props.value)} readOnly/>
                </LocalizationProvider>
            );
        }else{
            return(
                <LocalizationProvider dateAdapter={AdapterDayjs}>   
                    <DatePicker onChange={this.handleChange} name={this.props.id} label={this.props.label} value={dayjs(this.props.value)}/>
                </LocalizationProvider>
            );
        }
    }
}