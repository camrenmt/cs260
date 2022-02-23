function load_all() {
    renderDate();
    addNoteButton = document.getElementById('add-note-list');
    addTaskListeners();

    addNoteButton.addEventListener('click', (e) => {
        newNote = document.getElementById('note-template').cloneNode(true);
        newNote.classList.remove('d-none')
        newNote.removeAttribute('id');
        
        addNoteButton.parentNode.insertBefore(newNote, addNoteButton);
        addTaskListeners();
    });

    function addTaskListeners() {
        document.querySelectorAll(".task-complete").forEach(e => {
            e.addEventListener('click', (f) => {
                if (e.classList.contains('dot-empty')) {
                    e.classList.remove('dot-empty');
                    e.classList.add('dot-filled');
                } else {
                    e.classList.remove('dot-filled');
                    e.classList.add('dot-empty');
                }
            });
        });
    }
}