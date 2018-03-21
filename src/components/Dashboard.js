import React from 'react';
import Note from './Note'

class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      notes: [
        {
          title: "Example",
          body: "Hello!"
        }
      ], currentNoteIndex: 0
    }
  }

  handleClick() {
    let newNotesArray = this.state.notes.slice()
    let newNote = {}
    newNote.title = ""
    newNote.body = ""
    newNotesArray.push(newNote)

    this.setState({
      notes: newNotesArray,
      currentNoteIndex: newNotesArray.length-1
    });
  }

  handleTitleChange(event) {
    let newNotesArray = this.state.notes.slice()
    let newNote = Object.assign({}, this.state.notes[this.state.currentNoteIndex])
    newNote.title = event.target.value
    newNotesArray[this.state.currentNoteIndex] = newNote

    this.setState({
      notes: newNotesArray,
    });
  }

  handleBodyChange(event) {
    let newNotesArray = this.state.notes.slice()
    let newNote = Object.assign({}, this.state.notes[this.state.currentNoteIndex])
    newNote.body = event.target.value
    newNotesArray[this.state.currentNoteIndex] = newNote

    this.setState({
      notes: newNotesArray,
    });
  }

  render() {
    return(
      <div>
        <button onClick={() => this.handleClick()}>Add new note!</button>
        <Note
          note={this.state.notes[this.state.currentNoteIndex]} 
          handleTitleChange={(e) => this.handleTitleChange(e)}
          handleBodyChange={(e) => this.handleBodyChange(e)}
        />
      </div>
    )
  }
}

export default Dashboard;