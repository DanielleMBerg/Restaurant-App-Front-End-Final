import React from 'react';

export function Card(props){
    return (
      <div className="card mb-3 forms">
        <h1 className="card-header">{props.header}</h1>
          <div className="card-body">
            {props.title && 
              (<h1 className="card-title">{props.title}</h1>)}
            {props.text && 
              (<p className="card-text">{props.text}</p>)}
            {props.body}
            {props.status && 
              (<div id='createStatus'>{props.status}</div>)}
          </div>
      </div>      
    );    
  }