import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { BrandContext } from "../../shared/Shared";
import "./Poll.css"
import Rate from "./Rate";
export default function Poll(props) {

    let [Brand, setBrand] = useContext(BrandContext);
    const [ratingAll, setRatingAll] = useState([]);
    const [hover, setHover] = useState(1);
    const [msg, setMsg] = useState('')


    useEffect(() => {
        props.Module.map((item, index) => {
            switch (item.CategoryID) {

                case 18:
                    if (item.ModuleDetails)

                        item.ModuleDetails.sort(compare).map((moduleDetails) =>
                            setRatingAll(x => ([...x, { ID: moduleDetails.Id, Score: 1 }]))
                        )
                default: break;

            }
        })
    }, []);



    const deleteRepetedComment = () => {
        ratingAll.map((item, index) => {
            for (let i = 0; i < ratingAll.length; i++) {

                if (item.ID === ratingAll[i].ID) {
                    if (index > i) {
                        // setRatingAll(x=>([...x,ratingAll.splice(i, 1)]))
                        setRatingAll(ratingAll.filter((item2, index) => index !== i))
                    }
                }
            }
        })

    }

    useEffect(() => {
        deleteRepetedComment()
    }, [ratingAll]);




    function compare(a, b) {
        if (a.Priority < b.Priority) {
            return -1;
        }
        if (a.Priority > b.Priority) {
            return 1;
        }
        return 0;
    }

    const postData = async () => {
        try {
            const response = await fetch("Ecard/SetComment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    CompanyName: window.location.pathname.split("/")[1]
                    , Comment: JSON.stringify(ratingAll)
                    , Description: document.getElementById("txtPoll").value
                })

            });
            let result = await response.json();
            setMsg(result.ReturnValueMessage)

            if (result.ReturnValue === 0) {
                document.getElementById("errorWindow").style.backgroundColor = "#4cbb17"
                document.getElementById("errorWindow").style.display = "flex"

                setTimeout(() => {
                    document.getElementById("errorWindow").style.backgroundColor = "none"
                    window.location.reload()
                }, 6000)


            } else {
                document.getElementById("errorWindow").style.backgroundColor = "#ed4337"
                document.getElementById("errorWindow").style.display = "flex"

                setTimeout(() => {
                    document.getElementById("errorWindow").style.display = "none"
                    window.location.reload()
                }, 6000)

            }







            // else{
            // }
        } catch (err) {
            console.log("err = ", err);
        } finally {
        }
    };

    props.Module.sort(compare);

    return (
        <>
            <div className="alertError" id="errorWindow">{msg}</div>
            {props.Module.map((item, index) => {

                switch (item.CategoryID) {
                    case 23:
                        if (item.ModuleDetails)
                            return (
                                <div
                                    className="containplatform1"
                                    key={index}
                                    style={{ backgroundColor: item.BackgroundColor }}
                                >
                                    {item.ModuleDetails.sort(compare).map((moduleDetails, index) => {

                                        return (
                                            <img
                                                alt={moduleDetails ? moduleDetails.ImageAlt : ""}
                                                key={index}
                                                src={moduleDetails ? moduleDetails.ImageURL : ""}
                                            />
                                        );

                                    })}{" "}
                                </div>
                            ); else break

                    default:
                        break;
                }
            })}

            <div
                className="containplatform"
                id="containplatformDown"
                style={{
                    backgroundColor: props ? props.BackgroundColor : "",
                }}
            >
                <br />
                <br />
                <br />

                {props.Module.map((item, index) => {
                    switch (item.CategoryID) {

                        case 18:
                            if (item.ModuleDetails)

                                return item.ModuleDetails.sort(compare).map((moduleDetails, index) => (
                                    <span
                                        className="projButton pollButton"
                                        key={index}
                                        style={{ backgroundColor: moduleDetails.BackgroundColor }}
                                    >
                                        <span className="containtxttitle1">
                                            <div className="containcircTitle">
                                                {moduleDetails.Title}
                                            </div>

                                            <Rate id={moduleDetails.Id} ratingAll={ratingAll} setRatingAll={setRatingAll} />
                                        </span>
                                    </span>
                                )); else break

                        case 16:
                            if (item.ModuleDetails)
                                return item.ModuleDetails.sort(compare).map((moduleDetails, index) => {

                                    return (
                                        <span
                                            className="ApiTop"
                                            key={index}
                                            style={{
                                                backgroundColor: moduleDetails.BackgroundColor,
                                                color: moduleDetails.TitleForeColor
                                            }}
                                        >
                                            {moduleDetails ? moduleDetails.Title : ""}
                                        </span>
                                    );

                                }); else break

                        default:
                            break;
                    }
                })}
                <textarea className="textAreaPoll" placeholder="...متن نظر" maxLength="200" id="txtPoll"></textarea>
                <button className="submitComment" style={{ backgroundColor: Brand }} onClick={() => postData()}>ثبت نظر</button>
            </div>
        </>
    );
}
