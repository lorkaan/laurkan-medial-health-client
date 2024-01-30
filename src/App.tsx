import React from 'react';
//import logo from './logo.svg';
import './App.css';

import TaskList from './TaskList';

/** This is designed to pair with a simple Flask server to provide persistence
 * and access to the static json files being used as a makeshift NoSQL database.
 * 
 * Current Implementation:
 *  - Persistence via NoSQL database on the accompanying server in the form of a JSON file 
 *    (makeshift database for testing)
 *  - Fallback redunancy for loading Tasks (returns to original test file if storage file is missing)
 *  - Adding Asignees via server (<server>/add_assignee)
 *  - Editing and Removing Tasks
 *  - An interface that allows for changes to be reversed at the individual Task level as well as
 *    at the global list level (assuming you don't click Save or Store respectively)
 *  - Assigning Tasks via a Drop Down menu
 *  - 
 * 
 * Future improvements that ran out of time before I could fully implement:
 *  - Search feature over the Tasks by assignee, priority and/or status
 *  - Sort feature over the Tasks by assignee, priority and/or status
 *  - A transformation of the Assign object in storage to Data Structure that allows faster 
 *    searching and sorting.
 *  - A reset to default list setting. It is still there and will load if there is no storage
 *    file found. But you have to manually delete it from the server at the moment.
 *  - An integrated system for adding users. You need to go to the <server>/add_assignee page
 *    to get a very simple add assignee functionality. Also, validation to stop multiple users
 *    being erronously added.
 *  - An account system for customizing a dashboard to users based on id. 
 * 
 */

class App extends React.Component<any, any>{

  constructor(props:any){
    super(props);
    this.state = {editable:false};
  }

  
  render(){
    return (
      <div className="App">
        <TaskList />
      </div>
    );
  }

}


export default App;
