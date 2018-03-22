import React from 'react';
import Note from './Note';
import Sidebar from './Sidebar';

class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      notes: [], 
      currentNoteIndex: ""
    }
  }

  componentWillMount() {
    fetch('http://localhost:3001/notes')
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          notes: data
        })
      })
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

  handleNoteClick(index) {
    this.setState({
      currentNoteIndex: index
    });
  }

  sync() {
    fetch(
      'http://localhost:3001/notes/sync',
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ message: this.state.notes })
      },
    ).then((response) => response.json())
    .then((data) => {
      this.setState({
        notes: data
      })
    })
  }

  render() {
    return(
      <div className="dashboard">
        <div className="title">
          <h1>My Notetaking App</h1>
          <button onClick={() => this.handleClick()}>Add new note!</button>
          <button onClick={() => this.sync()}>Sync</button>
        </div>
        <Sidebar 
          notes={this.state.notes} 
          handleNoteClick={(index) => this.handleNoteClick(index)}/>
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