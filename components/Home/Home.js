import React, { useEffect, useContext } from "react";

import Header from "./Header/Header";
import Platform from "./Platform/Platform";
import Access from "./Access/Access";
import Ways from "./Footer/Ways/Ways";
import SocialMedia from "./Footer/SocialMedia/SocialMedia";
import { BrandContext, DataContext } from "../shared/Shared";
import "../Home/Home.css";
import { BrowserRouter, Switch, Route, useLocation } from "react-router-dom";
import { useState } from "react";
import Poll from "./Poll/Poll";
export default function Home() {
  let [Brand, setBrand] = useContext(BrandContext);
  let [Data, setData] = useContext(DataContext);
  const [D, setD] = useState([]);
  const [A, setA] = useState([]);
  const [result, setResult] = useState([]);



  const GetData = async () => {

    try {
      const response = await fetch("Ecard/GetHomePageInfo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ CompanyName: window.location.pathname.split("/")[1] }),

      });

      if (!response.ok) throw new Error("nashod");



      let result = await response.json();
      console.log(result)

      if (result.ReturnValue === 2) {
        return document.write(result.ReturnValueMessage)
      }


      setD(result.Section);
      setA(result);
      setData(result.Setting.NameEN)
      setResult(result.Result)

    } catch (err) {
      console.log("err = ", err);
    } finally {
    }
  };

  document.title = A ? A.Setting ? A.Setting.Name : "" : ""

  useEffect(() => {
    GetData();
  }, []);

  setBrand(A ? A.Setting ? A.Setting.BrandColor : "" : "")


  function compare(a, b) {
    if (a.Priority < b.Priority) {
      return -1;
    }
    if (a.Priority > b.Priority) {
      return 1;
    }
    return 0;
  }

  D.sort(compare);

  var link = document.querySelector("link[rel~='icon']");
  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.head.appendChild(link);
  }
  link.href = A ? A.Setting ? A.Setting.IconURL : "" : "";

  return (
    <BrowserRouter>
      <Switch>

        <Route path="/">
          <>
            <div
              className="blueLine"
              style={{ backgroundColor: Brand }}
            ></div>

            {result.ReturnValue !== 0 ?
              <div className="container"
                style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
                <div className="containplatform">
                  <div className="platformText">
                    {result.ReturnValueMessage}
                  </div>
                </div>
              </div>
              :
              D.map((section, index) => {
                switch ("" + section.Priority + section.type) {
                  case "10":
                    return (
                      <div
                        className="container"
                        key={index}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexDirection: "column",
                          borderColor: section.BorderColor,

                        }}
                      >
                        <Header {...section} />
                      </div>
                    );

                  case "21":
                    return (
                      <div
                        className="container"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexDirection: "column",
                          borderColor: section.BorderColor,
                        }}
                        key={index}
                      >
                        <Platform {...section} />
                      </div>
                    );

                  case "31":
                    return (
                      <div
                        className="container"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexDirection: "column",
                          borderColor: section.BorderColor,

                        }}
                        key={index}
                      >
                        <Access {...section} />
                      </div>
                    );

                  case "41":
                    return (
                      <div
                        className="container"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexDirection: "column",
                          borderColor: section.BorderColor,

                        }}
                        key={index}
                      >
                        <Poll {...section} />
                      </div>
                    );

                  case "52":
                    return (
                      <div
                        className="containFooter"
                        style={{
                          backgroundColor: section.BackgroundColor,
                          borderColor: section.BorderColor
                        }}
                        key={index}
                      >
                        <Ways {...section} />
                      </div>
                    );

                  case "62":
                    return (
                      <div
                        className="containFooter"
                        style={{
                          backgroundColor: section.BackgroundColor, borderColor: section.BorderColor
                        }}
                        key={index}
                      >
                        <SocialMedia {...section} />
                        <br />
                      </div>
                    );

                  default:
                    break;
                }
              })}


          </>
        </Route>


      </Switch>
    </BrowserRouter>
  );
}
