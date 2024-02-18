import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import BackButton from "../components/BackButton";
import { createTicket } from "../features/tickets/ticketSlice";

const NewTicket = () => {
    const { user } = useSelector((state) => state.auth);

    const [name] = useState(user.name);
    const [email] = useState(user.email);
    const [product, setProduct] = useState("Samsung Smartphone");
    const [description, setDescription] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(createTicket({ product, description }))
            .unwrap()
            .then(() => {
                // We got a good response so navigate the user
                navigate("/tickets");
                toast.success("New ticket created!");
            })
            .catch(toast.error);
    };

    return (
        <>
            <BackButton />
            <section className="heading">
                <h1>Create New Ticket</h1>
                <p>Please fill out the form below 👇</p>
            </section>
            <section className="form">
                <div className="form-group">
                    <label htmlFor="name">Customer Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={name}
                        disabled
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Customer Email</label>
                    <input
                        type="text"
                        className="form-control"
                        value={email}
                        disabled
                    />
                </div>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor="product">Product</label>
                        <select
                            name="product"
                            id="product"
                            value={product}
                            onChange={(e) => setProduct(e.target.value)}
                        >
                            <option value="Samsung Smartphone">
                                Samsung Smartphone
                            </option>
                            <option value="Thinkpad Laptop">
                                Thinkpad Laptop
                            </option>
                            <option value="Titan Watch">Titan Watch</option>
                            <option value="Sony Television">
                                Sony Television
                            </option>
                            <option value="others">others</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">
                            Description of the issue
                        </label>
                        <textarea
                            name="description"
                            id="description"
                            className="form-control"
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-block">Submit</button>
                    </div>
                </form>
            </section>
        </>
    );
};

export default NewTicket;
