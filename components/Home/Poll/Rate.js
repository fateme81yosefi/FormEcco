import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { BrandContext ,PollContext} from "../../shared/Shared";
import "./Poll.css"
export default function Rate(props) {
    let [Brand, setBrand] = useContext(BrandContext);
    let [poll, setPoll] = useContext(PollContext);

    const [rating, setRating] = useState(1);
    const [hover, setHover] = useState(1);

    document.documentElement.style
        .setProperty('--Brand', Brand);


    useEffect(() => {
        // x.push(props.ratingAll)
        // setPoll(props.ratingAll)
        // console.log("x",poll)
    }, [props.ratingAll])


    return (
        <div className="containRating">
            <div className="star-rating">
                {[...Array(5)].map((star, index) => {
                    index += 1;
                    return (
                        <button
                            type="button"
                            id="buttonPoll"
                            key={index}
                            className={index <= (hover || rating) ? "on" : "off"}
                            onClick={() => { setRating(index); props.setRatingAll(x=>([...x,{ ID: props.id, Score: index }])) }}
                            onMouseEnter={() => setHover(index)}
                            onMouseLeave={() => setHover(rating)}
                         // onClick={(e)=>{e.preventDefault()}}
                         
                        >
                            <div className="vvvv">

                                <div className="circlePoll" ></div>
                                <div className="dashed" style={{ display: index === 1 ? "none" : "flex" }}></div>
                            </div>

                        </button>
                    );
                })}
            </div>
            <div className="numberRate">
                <span> {hover} </span> از 5
            </div>

        </div>
    );
}
