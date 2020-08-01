import React from "react";
import ShawnSmile from "./../../Assets/images/ShawnSmile.png";

export default props => {
  return (
    <div className="credits">
      <img alt="pic of Shawn" className="imgOnly" src={ShawnSmile} />

      <style jsx="">{`
        .credits {
          position: fixed;
          bottom: 30px;
          left: 30px;
          z-index: 10;
          color: white;
          font-family: ;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: -0.02em;
          opacity: 0.5;
          transition: all 0.6s;
        }

        .credits:hover {
          opacity: 1;
        }

        .imgOnly:hover {
          cursor: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'  width='40' height='48' viewport='0 0 100 100' style='fill:black;font-size:24px;'><text y='50%'>💚</text></svg>")
              16 0,
            auto; /*emojicursor.app*/
        }
      `}</style>
    </div>
  );
};
