import React from "react";

import MountainForeground from "./../../Assets/images/mountains-bottom-foreground.png";

export default (props) => {
  return (
    <div className="mountainForeground">
      <img alt="pic of Shawn" className="imgOnly" src={MountainForeground} />

      <style jsx="">{`
        .mountainForeground {
          z-index: 10;

          opacity: 0.9;
          transition: all 0.6s;
          filter: brightness 0.7;
        }

        .imgOnly {
          width: 100vw;
          filter: hue-rotate(260deg) grayscale(66%);
        }

        // .imgOnly:hover {

        //     cursor: url("data:image/svg+xml;utf8,
        //     <svg xmlns="http://www.w3.org/2000/svg"  width="40" height="48" viewport="0 0 100 100"
        //     style="fill:black;font-size:24px;"><text y="50%">💚</text></svg>")
        //               16 0,
        //             auto; /*emojicursor.app*/
        // }
      `}</style>
    </div>
  );
};
