import mongoose from "mongoose";

const ticketSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        product: {
            type: String,
            required: [true, "Please select a product"],
            enum: [
                "Samsung Smartphone",
                "Thinkpad Laptop",
                "Titan Watch",
                "Sony Television",
                "others",
            ],
        },
        description: {
            type: String,
            required: [true, "Please enter a description of the issue"],
        },
        status: {
            type: String,
            requred: true,
            enum: ["new", "open", "closed"],
            default: "new",
        },
    },
    { timestamps: true },
);

const Ticket = mongoose.model("Ticket", ticketSchema);

export default Ticket;
