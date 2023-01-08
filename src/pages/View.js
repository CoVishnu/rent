import React, {useState, useEffect} from 'react';
import {useParams, Link} from "react-router-dom";
import axios from 'axios';
import "./View.css";

const View = () => {
    const [user, setUser] = useState({});
    const {id} = useParams ();  
    useEffect (() => {
        axios
            .get(`http://localhost:5000/api/get/${id}`)
            .then((resp) => setUser({ ...resp.data[0] }));
    }, [id]);

    return (
        <div style={{ marginTop: "150px" }}>
            <div className="card">
                <div className="card-header">
                    <p>User Contact Detail</p>
                </div>
                <div className="container">
                    <strong>ID: </strong>
                    <span>{id}</span>
                    <br/>
                    <br/>
                    <strong>Name: </strong>
                    <span>{user.name}</span>
                    <br/>
                    <br/>
                    <strong>Gender: </strong>
                    <span>{user.gender}</span>
                    <br/>
                    <br/>
                    <strong>Contact: </strong>
                    <span>{user.contact}</span>
                    <br/>
                    <br/>
                    <strong>Pincode: </strong>
                    <span>{user.pincode}</span>
                    <br/>
                    <br/>
                    <strong>Deposit: </strong>
                    <span>{user.deposit}</span>
                    <br/>
                    <br/>
                    <strong>Beds: </strong>
                    <span>{user.beds}</span>
                    <br/>
                    <br/>
                    <strong>Location: </strong>
                    <span>{user.location}</span>
                    <br/>
                    <br/>
                    <strong>Rent: </strong>
                    <span>{user.rent}</span>
                    <br/>
                    <br/>
                    <Link to="/">
                        <div className="btn btn-edit">Go Back</div>
                    </Link>
            </div>
        </div>
    </div>
    );
};
export default View;