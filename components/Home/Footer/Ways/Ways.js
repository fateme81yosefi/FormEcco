import React, { useContext } from "react";
import { BrandContext, DataContext } from "../../../shared/Shared";

import "./Ways.css";
export default function Ways(props) {
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
  let [Brand, setBrand] = useContext(BrandContext);
  let xc
  return (
    <div
      className="container"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <div className="containWays">
        {props.Module.map((item, index) => {
          switch (item.CategoryID) {
            case 24:
              if (item.ModuleDetails)

                return (
                  <div className="mrtup" key={index}>
                    <div
                      className="picMainWay"
                      style={{ backgroundColor: item.BackgroundColor }}
                    >
                      <div
                        className="picMainWay1"
                        style={{ backgroundColor: item.BackgroundColor }}
                      >
                        {item.ModuleDetails.sort(compare).map(
                          (modeuleDetails, index) => {
                            return (
                              <img
                                src={
                                  modeuleDetails ? modeuleDetails.ImageURL : ""
                                }
                                alt={modeuleDetails.ImageAlt}
                                key={index}
                                className="mail"
                              />
                            );
                          }
                        )}
                      </div>
                    </div>{" "}
                  </div>
                ); else break

            default:
              break;
          }
        })}

        <div
          className="col-12"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {props.Module.map((item, index) => {
            switch (item.CategoryID) {
              case 17:
                if (item.ModuleDetails)

                  return (
                    <div
                      className="headOfWay"
                      key={index}
                      style={{
                        backgroundColor: item.BackgroundColor,
                        color: item.ModuleDetails
                          ? item.ModuleDetails[0]
                            ? item.ModuleDetails[0].TitleForeColor
                            : ""
                          : "",
                      }}
                    >
                      {item.ModuleDetails
                        ? item.ModuleDetails[0]
                          ? item.ModuleDetails[0].Title
                          : ""
                        : ""}
                    </div>
                  );
                else break

              case 6:
                if (item.ModuleDetails)

                  return item.ModuleDetails.sort(compare).map(
                    (moduleDetails, index) => {
                      xc = "tel:" + moduleDetails.Subtitle
                      return <div className="line" key={index}>

                        <a
                          className="number"
                          href={xc}
                          style={{ backgroundColor: moduleDetails.BackgroundColor, color: moduleDetails.SubTitleForeColor }}
                        >
                          {moduleDetails.Subtitle}
                        </a>
                        <span className="dot"></span>
                        <div className="n&img">
                          <span className="name">
                            <span className="twopoint" style={{ backgroundColor: moduleDetails.BackgroundColor, color: moduleDetails.TitleForeColor }}>:</span>
                            {moduleDetails.Title}
                          </span>
                          <span className="imagewaylitt">
                            <img
                              src={moduleDetails.ImageURL}
                              alt={moduleDetails.ImageAlt}
                            />
                          </span>
                        </div>
                      </div>
                    }
                  ); else break

              default:
                break;
            }
          })}
        </div>
      </div>
    </div>
  );
}
