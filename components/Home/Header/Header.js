import React from "react";
import "./Header.css";

export default function Header(props) {
  function compare(a, b) {
    if (a.Priority < b.Priority) {
      return -1;
    }
    if (a.Priority > b.Priority) {
      return 1;
    }
    return 0;
  }

  props.Module.sort(compare);
  return (
    <div className="contHeadLogo">
      {props.Module.map((module) => {
        switch (module.CategoryID) {
          case 1:
            if (module.ModuleDetails)
              return module.ModuleDetails.sort(compare).map((moduleDetails, index) =>

                <img
                  key={index}
                  className="logo"
                  alt={moduleDetails ? moduleDetails.ImageAlt : ""}
                  src={moduleDetails ? moduleDetails.ImageURL : ""}
                />

              );
            else break
          default:
            break;
        }
      })}
      {props.Module.map((module) => {
        switch (module.CategoryID) {
          case 1:
            if (module.ModuleDetails)
              return <div
                className="circle"
                style={{
                  backgroundColor: props ? props.BackgroundColor : "",
                }}
              ></div>
            else break
          default:
            break;
        }
      })}

    </div>
  );
}
