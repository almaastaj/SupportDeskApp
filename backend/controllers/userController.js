import express from "express";

const registerUser = (req, res) => {
    res.send("Register User Route");
};

const loginUser = (req, res) => {
    res.send("Login User Route");
};

export { registerUser, loginUser };
