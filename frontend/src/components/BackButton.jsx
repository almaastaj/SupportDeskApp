import React from "react";
import { FaArrowCircleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// NOTE: here we navigate the user in the history stack for a true 'back' button (clicking the button will navigate the user back by one step in the application's navigation history.)
const BackButton = () => {
    const navigate = useNavigate();
    return (
        <button
            className="btn btn-reverse btn-back"
            onClick={() => navigate(-1)}
        >
            <FaArrowCircleLeft /> Back
        </button>
    );
};

export default BackButton;
