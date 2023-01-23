export default class NotesView {
    constructor(root, { onNoteSelect, onNoteAdd, onNoteEdit, onNoteDelete } = {}) {
        this.root = root;
        this.onNoteSelect = onNoteSelect;
        this.onNoteAdd = onNoteAdd;
        this.onNoteEdit = onNoteEdit;
        this.onNoteDelete = onNoteDelete;
        this.root.innerHTML = document.querySelector('#New_note').innerHTML;

        const btnAddNote = this.root.querySelector(".notes__add");
        const inpTitle = this.root.querySelector(".notes__title");
        const inpBody = this.root.querySelector(".notes__body");

        btnAddNote.addEventListener("click", () => {
            this.onNoteAdd();
        });

        [inpTitle, inpBody].forEach(inputField => {
            inputField.addEventListener("blur", () => {
                const updatedTitle = inpTitle.value.trim();
                const updatedBody = inpBody.value.trim();

                this.onNoteEdit(updatedTitle, updatedBody);
            });
        });

        this.updateNotePreviewVisibility(false);
    }

    _createListItemHTML(id, title, body, updated,created) {
        const MAX_BODY_LENGTH = 60;

        const template = document.getElementById('Note_miniature')
        console.log(template)
        const clone = template.content.cloneNode(true)
        let note= clone.querySelector('.notes__list-item')
        note.id=id
        let notetitle=clone.querySelector('.notes__small-title')
        notetitle.innerText=title
        let notebody = clone.querySelector('.notes__small-body')
        notebody.innerText=`
            ${body.substring(0, MAX_BODY_LENGTH)}
            ${body.length > MAX_BODY_LENGTH ? "..." : ""}
            `
        let button= clone.querySelector('.deletebtn')
        button.setAttribute('btn-id', id)
        let edit = clone.querySelector('.notes__small-updated')
        edit.innerText= `
            Last edit:${updated.toLocaleString(undefined, { dateStyle: "full", timeStyle: "short" })}
            Creation date:${created.toLocaleString(undefined, { dateStyle: "full", timeStyle: "short" })}
            `

        console.log(clone.innerHTML)
        return clone
        /*`
            <div class="notes__list-item" data-note-id="${id}">
                <div class="notes__small-title">${title}</div>
                <div class="notes__small-body">
                    ${body.substring(0, MAX_BODY_LENGTH)}
                    ${body.length > MAX_BODY_LENGTH ? "..." : ""}
                </div>
                <input type="button" class="deletebtn" value="Press to delete" btn-id="${id}">
                <div class="notes__small-updated">
                    Last edit:${updated.toLocaleString(undefined, { dateStyle: "full", timeStyle: "short" })}
                </div>
                <div class="notes__small-updated">
                    Creation date:${created.toLocaleString(undefined, { dateStyle: "full", timeStyle: "short" })}
                </div>
            </div>
        `;*/
    }

    updateNoteList(notes) {
        const notesListContainer = this.root.querySelector(".notes__list");

        notesListContainer.innerHTML = "";

        for (const note of notes) {
            const html = this._createListItemHTML(note.id, note.title, note.body, new Date(note.updated),new Date(note.created));
            console.log(html)
            //notesListContainer.insertAdjacentHTML("beforeend", html);
            notesListContainer.appendChild(html)
        }

        // Add select/delete events for each list item
        notesListContainer.querySelectorAll(".notes__list-item").forEach(noteListItem => {
            noteListItem.addEventListener("click", () => {
                this.onNoteSelect(noteListItem.dataset.noteId);
            });     
    })
    //delete handler with a button, more intuituve than the previous one
    let btns = document.querySelectorAll('.deletebtn');
         btns.forEach(button => {
            button.addEventListener('click', ( ) => { 
             const doDelete = confirm("Are you sure you want to delete this note?");
                 if (doDelete) {
                     this.onNoteDelete(button.getAttribute('btn-id'));    
                 }
             });
         });   
}

    updateActiveNote(note) {
        //here the program is throwing an error because when a note is deleted, the program tries to load the empty spot, it doesnt affect the functionality 
        this.root.querySelector(".notes__title").value = note.title;
        this.root.querySelector(".notes__body").value = note.body;

        this.root.querySelectorAll(".notes__list-item").forEach(noteListItem => {
            noteListItem.classList.remove("notes__list-item--selected");
        });

        this.root.querySelector(`.notes__list-item[data-note-id="${note.id}"]`).classList.add("notes__list-item--selected");
    }

    updateNotePreviewVisibility(visible) {
        this.root.querySelector(".notes__preview").style.visibility = visible ? "visible" : "hidden";
    }
}