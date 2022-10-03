import App from "./App.js"

const root = document.getElementById("app");
const app = new App(root);
/*
const view = new NotesView(app, {
    onNoteAdd(){
        console.log("Let´s add some notes");
    },
    onNoteSelect(id){
        console.log("Note Selected:" + id);
    },
    onNodeEdit(newTitle, newBody){
        console.log(newTitle);
        console.log(newBody);
    },
    onNoteDelete(id){
        console.log("Note DELETED:" + id);
    },
    
});

view.updateNodeList(NotesAPI.getAllNotes());
view.updateActiveNote(notes[0]);*/