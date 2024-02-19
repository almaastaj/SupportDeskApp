import React from "react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Modal from "react-modal";
import { FaPlus } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { getTicket, closeTicket } from "../features/tickets/ticketSlice";
import { getNotes, createNote } from "../features/notes/noteSlice";
import { useParams, useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import NoteItem from "../components/NoteItem";

const customStyles = {
    content: {
        width: "600px",
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        position: "relative",
    },
};

Modal.setAppElement("#root");

const Ticket = () => {
    const { ticket } = useSelector((state) => state.tickets);
    const { notes } = useSelector((state) => state.notes);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [noteText, setNoteText] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { ticketId } = useParams();

    useEffect(() => {
        dispatch(getTicket(ticketId)).unwrap().catch(toast.error);
        dispatch(getNotes(ticketId)).unwrap().catch(toast.error);
    }, [ticketId, dispatch]);

    // Close ticket
    const onTicketClose = () => {
        // NOTE: we can unwrap our AsyncThunkACtion here so no need for isError and isSuccess state
        dispatch(closeTicket(ticketId))
            .unwrap()
            .then(() => {
                toast.success("Ticket Closed");
                navigate("/tickets");
            })
            .catch(toast.error);
    };

    // Open/close modal
    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);

    // Create note submit
    const onNoteSubmit = (e) => {
        e.preventDefault();
        // NOTE: we can unwrap our AsyncThunkACtion here so no need for isError and isSuccess state
        dispatch(createNote({ noteText, ticketId }))
            .unwrap()
            .then(() => {
                setNoteText("");
                closeModal();
            })
            .catch(toast.error);
    };

    if (!ticket) {
        return <Spinner />;
    }

    return (
        <div className="ticket-page">
            <header className="ticket-header">
                <BackButton />
                <h2>
                    Ticket ID: {ticket._id}
                    <span className={`status status-${ticket.status}`}>
                        {ticket.status}
                    </span>
                </h2>
                <h3>
                    Date Submitted:{" "}
                    {new Date(ticket.createdAt).toLocaleString("en-IN", {
                        timeZone: "Asia/Kolkata",
                    })}
                </h3>
                <h3>Product: {ticket.product}</h3>
                <hr />
                <div className="ticket-desc">
                    <h3>Description of Issue</h3>
                    <p>{ticket.description}</p>
                </div>
                <h2>Notes</h2>
            </header>

            {ticket.status !== "closed" && (
                <button onClick={openModal} className="btn">
                    <FaPlus /> Add Note
                </button>
            )}

            {/* Modal Screen UI */}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Add Note"
            >
                <h2>Add Note</h2>
                <button className="btn-close" onClick={closeModal}>
                    X
                </button>
                <form onSubmit={onNoteSubmit}>
                    <div className="form-group">
                        <textarea
                            name="noteText"
                            id="noteText"
                            className="form-control"
                            placeholder="Note text"
                            value={noteText}
                            onChange={(e) => setNoteText(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <button className="btn" type="submit">
                            Submit
                        </button>
                    </div>
                </form>
            </Modal>

            {/* Display Notes */}
            {notes ? (
                notes.map((note) => <NoteItem key={note._id} note={note} />)
            ) : (
                <Spinner />
            )}

            {ticket.status !== "closed" && (
                <button
                    onClick={onTicketClose}
                    className="btn btn-block btn-danger"
                >
                    Close Ticket
                </button>
            )}
        </div>
    );
};

export default Ticket;
