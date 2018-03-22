import React from 'react';

class Sidebar extends React.Component {
  renderNotes(array) {
    return array.map((note, index) => {
      return(
        <div onClick={() => this.props.handleNoteClick(index)}>
          { note.title }
        </div>
      )
    })
  }
  
  render() {
    return(
      <ol className="sidebar">
        {this.renderNotes(this.props.notes)}
      </ol>
    )
  }
}

export default Sidebar;