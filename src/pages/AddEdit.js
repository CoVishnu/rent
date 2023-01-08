import React, {useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom' ;
import {useHistory, useParams, Link} from "react-router-dom";
import "./AddEdit.css";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
    name: "",
    gender: "",
    contact: "",
    pincode: "",
    deposit: "",
    beds: "",
    location: "",
    rent: "",
}

const AddEdit = () => {
    const [state, setState] = useState(initialState);

    const {name, gender, contact, pincode, deposit, beds, location, rent} = state;

    const navigate = useNavigate();

    const {id} = useParams();

    useEffect(() => {
        axios.get(`http://localhost:5000/api/get/${id}`).then((resp) => setState({...resp.data[0]}))   
    }, [id])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !gender || !contact || !pincode || !deposit || !beds || !location || !rent) {
            toast.error("Please provide value into each input field");
            } else {
                if(!id){
                    axios
                    .post("http://localhost:5000/api/post", {
                        name,
                        gender,
                        contact,
                        pincode,
                        deposit,
                        beds,
                        location,
                        rent,
                    })
                    .then(() => {
                        setState({name: "", gender: "", contact: "", pincode: "", deposit: "", beds: "", location: "", rent: "" });
                    })
                    .catch((err) => toast.error(err.respond.data));
                    toast.success("Room Added Succesfully");
                } else{
                    axios
                    .put(`http://localhost:5000/api/update/${id}`, {
                        name,
                        gender,
                        contact,
                        pincode,
                        deposit,
                        beds,
                        location,
                        rent,
                    })
                    .then(() => {
                        setState({name: "", gender: "", contact: "", pincode: "", deposit: "", beds: "", location: "", rent: "" });
                    })
                    .catch((err) => toast.error(err.respond.data));
                    toast.success("Room Updated Succesfully");
                }
                setTimeout(() => navigate("/"), 500);
            }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value});
    }
    return (
        <div style={{marginTop: "100px"}}>
        <form style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center"
        }}
        onSubmit={handleSubmit}

        >
            <label htmlFor="name">Owner Name</label>
            <input
            type="text"
            id="name"
            name="name"
            placeholder="Owner Name ..."
            value={name || ""}
            onChange={handleInputChange}
            />
             <label htmlFor="gender">Gender</label>
            <input
            type="text"
            id="gender"
            name="gender"
            placeholder="For Gender ..."
            value={gender || ""}
            onChange={handleInputChange}
            />
            <label htmlFor="contact">Contact</label>
            <input
            type="number"
            id="contact"
            name="contact"
            placeholder="Owner Contact No ..."
            value={contact || ""}
            onChange={handleInputChange}
            /><label htmlFor="pincode">Pincode</label>
            <input
            type="number"
            id="pincode"
            name="pincode"
            placeholder="Pincode ..."
            value={pincode || ""}
            onChange={handleInputChange}
            />
            <label htmlFor="deposit">Deposit</label>
            <input
            type="number"
            id="deposit"
            name="deposit"
            placeholder="Room Deposit ..."
            value={deposit || ""}
            onChange={handleInputChange}
            />
            <label htmlFor="beds">No Of Beds</label>
            <input
            type="number"
            id="beds"
            name="beds"
            placeholder="No Of Beds ..."
            value={beds || ""}
            onChange={handleInputChange}
            />
            <label htmlFor="location">Location</label>
            <input
            type="text"
            id="loaction"
            name="location"
            placeholder="Room Loaction ..."
            value={location || ""}
            onChange={handleInputChange}
            />
            <label htmlFor="rent">Rent</label>
            <input
            type="number"
            id="rent"
            name="rent"
            placeholder="Room Rent ..."
            value={rent || ""}
            onChange={handleInputChange}
            />
            <input type="submit" value={id ? "Update" : "Save"} />
            <Link to="/">
                <input type="button" value="Go Back"/>
            </Link>
        </form>
        </div>
    )
}

export default AddEdit