# Laurkan - Medial Health Take Home Project

Current Implementation:\
  - Persistence via NoSQL database on the accompanying server in the form of a JSON file \
      (makeshift database for testing)\
  - Fallback redunancy for loading Tasks (returns to original test file if storage file is missing)\
  - Adding Asignees via server (<server>/add_assignee)\
  - Editing and Removing Tasks\
  - An interface that allows for changes to be reversed at the individual Task level as well as\
    at the global list level (assuming you don't click Save or Store respectively)\
  - Assigning Tasks via a Drop Down menu\

## Starting

You should be able to just use `npm install` to get the dependencies necessary for a couple things (like the DatePicker).

### `npm start`
I have kept the app running on default localhost:3000 address. Additionally, the Supplemental found [here](https://github.com/lorkaan/laurkan-medial-health-server) is configured to use localhost:5001. This client was designed to work in tandem with the server, so it will need it running in order to get access to the json data files to build the Task List from.

### Random Notes
I apologize, I did not have time to go though and document things, but I found Typescript to be pretty explicit so hopefully it won't be too bad. Some of the names for a few of the static variables are a little weird since I didn't quite have as much time as I thought, so I was unable to rename all the repurposed variables.




