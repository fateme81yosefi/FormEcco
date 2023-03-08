import React, { useContext, useState, useEffect } from "react";
import { DataContext } from "../../../shared/Shared";
import "./SocialMedia.css";
export default function SocialMedia(props) {
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
  const [x, setX] = useState();

  useEffect(() => {
    setX(
      props
        ? props.Module
          ? props.Module[1]
            ? props.Module[1].ModuleDetails
              ? props.Module[1].ModuleDetails.length
              : ""
            : ""
          : ""
        : ""
    );
  }, [x]);

  const checkNum = {
    flexDirection: x > 4 ? "column" : "",
  };
 
  const checkNums = {
    width: x > 4 ? "100%" : "",
    justifyContent: x > 4 ? "center" : "",

  }
  return (
    <div
      className="container"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        backgroundColor: props.BackgroundColor,
      }}
    >
      {" "}
      <div className="containSocial" id="containSocialId" style={checkNum}>
        {props.Module.map((item, index) => {
          switch (item.CategoryID) {
            case 20:
              if (item.ModuleDetails)
              return item.ModuleDetails.sort(compare).map(
                (moduleDetails, index2) => {
                      return (
                        <span
                          key={index2}
                          style={{
                            backgroundColor: moduleDetails.BackgroundColor,
                            color: moduleDetails.TitleForeColor,
                          }}
                        >
                          {moduleDetails ? moduleDetails.Title : ""}
                        </span>
                      );

              
                }
              );
              else break;

            case 25:
              if (item.ModuleDetails)

              return (
                <div key={index} className="containLogo" style={checkNums}>
                  {item.ModuleDetails.sort(compare).map(
                    (moduleDetails, index1) =>
                      moduleDetails ? (
                        <img
                          key={index1}
                          onClick={() =>
                            (window.location.href = moduleDetails.URL)
                          }
                          className="socialMediaLogo"
                          src={moduleDetails.ImageURL}
                          alt={moduleDetails.ImageAlt}
                        />
                      ) : (
                        ""
                      )
                  )}
                </div>
              );
              else break
            default:
              break;
          }
        })}
      </div>
    </div>
  );
}
