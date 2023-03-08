import React from "react";
import "./Platform.css";

export default function Platform(props) {

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
    <>
      <div
        className="containplatform"
        style={{
          backgroundColor: props ? props.BackgroundColor : "",
        }}
      >
        {props.Module.map((item, index) => {
          switch (item.CategoryID) {
            case 2:
              if (item.ModuleDetails)
                return item.ModuleDetails.sort(compare).map((moduleDetails, index) => {
                  return (
                    <div
                      className="platformText"
                      key={index}
                      style={{
                        backgroundColor: moduleDetails.BackgroundColor,
                        color: moduleDetails.SubTitleForeColor
                      }}
                    >
                      {moduleDetails ? moduleDetails.Subtitle : ""}
                    </div>
                  );

                }); else break
            case 15:
              if (item.ModuleDetails)

                return item.ModuleDetails.sort(compare).map((moduleDetails, index) => {
                  return (
                    <span className="dastresi" key={index} style={
                      { color: moduleDetails.SubTitleForeColor, backgroundColor: moduleDetails.BackgroundColor }
                    } onClick={() =>
                      (window.location.href = moduleDetails.URL)
                    }>
                      {" "}
                      {moduleDetails ? moduleDetails.Title : ""}
                    </span>
                  );


                });
              else break
            case 21:
              if (item.ModuleDetails)
                return item.ModuleDetails.sort(compare).map((moduleDetails, index) => {

                  return (
                    <button
                      className="smartPlatform"
                      key={index}
                      style={{
                        backgroundColor: moduleDetails.BackgroundColor,
                        color: moduleDetails.SubTitleForeColor
                      }}
                      onClick={() =>
                        (window.location.href = moduleDetails.URL)
                      }
                    >
                      <img src="https://s2.uupload.ir/files/image_2023-02-14_09-28-25-removebg-preview_usmv.png"></img>
                      {moduleDetails ? moduleDetails.Title : ""}
                    </button>
                  );
                });
              else break

            default:
              break;
          }
        })}
      </div>
    </>
  );
}
