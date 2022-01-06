import React, { useState, useRef, useEffect }  from "react";
import { BsStarFill, BsStarHalf } from 'react-icons/bs';
import { Select } from "../Widgets/Select";
import { Textarea } from '../Widgets/Textarea';
import $ from 'jquery';
import { addReview, getReview } from "../data/Database";
import { useAuth } from "../auth/Auth";


export const Reviews = ({useEntry, productId}) =>{
    const { user } = useAuth();

    const [review, setReview] = useState({count: 0});

    const option = [
        "1 Star", 
        "2 Star", 
        "3 Star", 
        "4 Star", 
        "5 Star"
    ];

    const btnContainerRef = useRef();
    const containerRef = useRef();
    const ratingRef = useRef();
    const commentRef = useRef();

    const show = () =>{
        $(containerRef.current).show("fast");
        $(btnContainerRef.current).hide("fast");
    }

    const hide = () =>{
        $(containerRef.current).hide("fast");
        $(btnContainerRef.current).show("fast");
    }

    const onSubmit = () =>{
        if (!productId) return;
        addReview({
            productId,
            reviewerId: user?.id,
            rating: ratingRef.current.value,
            comment: commentRef.current.value
        });
        setReview({count: review.count +1});
        ratingRef.current.value = "";
        commentRef.current.value = "";
        $(containerRef.current).hide("fast");
        $(btnContainerRef.current).hide("fast");
    }

    const isReviewed = (reviewers) =>{
        for(let view of reviewers){
            if (view?.info?.reviewerId === user?.id){
                $(btnContainerRef.current).hide();
                return;
            }
        };
        $(btnContainerRef.current).show("fast");
    }

    const initReviews = async(id) =>{
        const rev = await getReview(id);
        setReview({count: rev?.length});
        isReviewed(rev);
    }

    useEffect(()=>{
        initReviews(productId);
    }, [productId]);

    return(
        <div className="reviews-container">
            <div style={{color: useEntry && "white"}}>
                <BsStarFill className="reviews-icon" />
                <BsStarFill className="reviews-icon" />
                <BsStarFill className="reviews-icon" />
                <BsStarFill className="reviews-icon" />
                <BsStarFill className="reviews-icon" />
                <span>(<b>{review?.count} Reviews</b>)</span>
            </div>
            <div hidden={!useEntry}>
                <div hidden ref={btnContainerRef}>
                    <button onClick={show} className="btn" style={{backgroundColor:"inherit",color:"white"}}>Add review</button>
                </div>
                <div hidden ref={containerRef} className="reviews-entry-container">
                    <div className="flex-animate">
                        <div className="half-width-animate pad">
                            <Select inputRef={ratingRef} option={option} title="Stars" defaultOption="Select rating" />
                        </div>
                        <div className="max-width-animate pad">
                            <Textarea inputRef={commentRef} rows={4} title="Comment" placeholder="Add comments here" />
                        </div>
                    </div>
                    <div style={{textAlign:"right"}}>                
                        <button onClick={hide} className="btn">Cancel</button>
                        <button onClick={onSubmit} className="btn">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}