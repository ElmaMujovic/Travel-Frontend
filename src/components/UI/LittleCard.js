import React from "react";
const LittleCard = (props) => {
    const {p1, p2,imgsrc} = props;
    function changeRotation(e) {
        e.target.style.transform = "rotate(360deg)";
        e.target.style.transitionDuration="1s"; 
        
      }
      function StaySame(e) {
        e.target.style.transform = "rotate(0deg)";
        
      }
    return (
        
        <div className="lcard">
            <img src={imgsrc} alt="" onMouseOver={changeRotation} onMouseLeave={StaySame}/>
            <p>{p1}</p>
            <div className="line" style={{backgroundColor:"black", marginLeft:"10rem", width:"2rem"}}></div>
            <p>{p2}</p>
        </div>
      );
}
 
export default LittleCard;