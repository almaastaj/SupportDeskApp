import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../features/auth/authSlice";

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password2: "",
    });

    const { name, email, password, password2 } = formData;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isLoading } = useSelector((state) => state.auth);

    // * NOTE: no need for useEffect here as we can catch the AsyncThunkAction rejection in our onSubmit or redirect them on the resolution. Side effects shoulld go in event handlers where possible (https://beta.reactjs.org/learn/keeping-components-pure#where-you-can-cause-side-effects)

    // onChange Function
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    // OnSubmit function
    const onSubmit = (e) => {
        //  It prevents the default behavior of the event, which in this case is the default behavior of a form submission. By calling preventDefault(), you prevent the form from being submitted and the page from reloading.
        e.preventDefault();

        if (password !== password2) {
            toast.error("Password do not match!");
        } else {
            const userData = {
                name,
                email,
                password,
            };
            // NOTE: by unwrapping the AsyncThunkAction we can navigate the user after getting a good response from our API or catch the AsyncThunkAction rejection to show an error message
            dispatch(register(userData))
                .unwrap()
                .then((user) => {
                    toast.success(`Registered new user - ${user.name}`);
                    navigate("/");
                })
                .catch(toast.error);
        }
    };

    return (
        <>
            <section className="heading">
                <h1>
                    <FaUser /> Register
                </h1>
                <p>Please create an account to use this App!</p>
            </section>
            <section className="form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={name}
                            onChange={onChange}
                            placeholder="Enter your name..."
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={email}
                            onChange={onChange}
                            placeholder="Enter your email address..."
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            value={password}
                            onChange={onChange}
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            className="form-control"
                            id="password2"
                            name="password2"
                            value={password2}
                            onChange={onChange}
                            placeholder="Confirm your password"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-block">Submit</button>
                    </div>
                </form>
            </section>
        </>
    );
};

export default Register;
