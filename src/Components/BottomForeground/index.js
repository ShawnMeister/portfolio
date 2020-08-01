import React from "react";
import MiniAxe from "./../../Assets/images/DestinyAxeSmall.png";
import MountainForeground from "./../../Assets/images/mountains-bottom-foreground.png";

export default (props) => {
  return (
    <div className="mountainForeground">
      <img alt="pic of Shawn" className="imgOnly" src={MountainForeground} />

      <style jsx="">{`
        .mountainForeground {
          position: fixed;
          bottom: -150px;
          left: 0px;
          z-index: 10;
          color: white;
          font-family: ;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: -0.02em;
          // opacity: 0.5;
          transition: all 0.6s;
          filter: brightness 0.7;
          cursor: url("{{MiniAxe}}, auto");

         

        }
        @media only screen and (max-width: 500px){
          .mountainForeground {
          bottom: 0px;
          }
        }

        .imgOnly {
          width: 100vw;
        }
        
.imgOnly:hover {

    cursor: url("data:image/svg+xml;utf8,
    <svg xmlns="http://www.w3.org/2000/svg"  width="40" height="48" viewport="0 0 100 100"
    style="fill:black;font-size:24px;"><text y="50%">💚</text></svg>")
              16 0,
            auto; /*emojicursor.app*/
}

 
      `}</style>
    </div>
  );
};
