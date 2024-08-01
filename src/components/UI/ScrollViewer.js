import React from 'react';
import ReactDOM from 'react-dom';
 
import ReactScrollbar from 'react-scrollbar-js';
 
class ScrollableComponent extends React.Component {
 
  render() {
    const myScrollbar = {
      width: 400,
      height: 400,
    };
    return(
      <ReactScrollbar style={myScrollbar}>
        <div className="should-have-a-children scroll-me">
          <p>And Now</p>
          <p>You Can Put</p>
          <p>A Long Content Here</p>
        </div>
      </ReactScrollbar>
    )
  }
 
}