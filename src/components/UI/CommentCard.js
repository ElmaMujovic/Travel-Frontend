import React from 'react';
import './Navigation.css'

const CommentCard = (props) => {
    const {time, name, surname, text} = props;
    return ( 
        <div className="comment-card">
            <p style={{fontWeight:"bold"}}>{name} {surname}</p>
            <div className='text-com'>{text}</div>
            <p style={{fontSize:"10px"}}>{time}</p>
        </div>
     );
}
 
export default CommentCard;