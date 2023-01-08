import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import "./Home.css";
import {toast} from "react-toastify";
import axios from "axios";

export const Home = () => {
    const [data, setData] = useState([]);

    const loadData = async () => {
        const response = await axios.get("http://localhost:5000/api/get");
        setData(response.data);
    };

    useEffect(() => {
        loadData();
    }, []);

    const deleteContact = (id) => {
        if (window.confirm("Are you sure that you wanted to delete that room ?")) {
        axios.delete(`http://localhost:5000/api/remove/${id}`);
        toast.success("Room Deleted Successfully");
        setTimeout(() => loadData(), 500);
        }
    }
  return (
    
    <div style={{marginTop: "150px"}}>
        <div className='heading'>
        <div className='hd'>
          <h1>Rooms Available In <span>Pune</span></h1>
        </div>
        </div>
        <Link to="/addContact">
            <button className='btn btn-contact'>Add Rooms</button>
        </Link>
        <table className='styled-table'>
         <thead>
                <tr>
                    <th style={{textAlign: "center"}}>No.</th>
                    <th style={{textAlign: "center"}}>Owner Name</th>
                    <th style={{textAlign: "center"}}>Gender</th>
                    <th style={{textAlign: "center"}}>Contact</th>
                    <th style={{textAlign: "center"}}>Pincode</th>
                    <th style={{textAlign: "center"}}>Deposit</th>
                    <th style={{textAlign: "center"}}>No Of Beds</th>
                    <th style={{textAlign: "center"}}>Location</th>
                    <th style={{textAlign: "center"}}>Rent</th>
                    <th style={{textAlign: "center"}}>Action</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) =>{
                    return(
                        <tr key={item.id}>
                            <th scope="coloumn">{index+1}</th>
                            <td>{item.name}</td>
                            <td>{item.gender}</td>
                            <td>{item.contact}</td>
                            <td>{item.pincode}</td>
                            <td>{item.deposit}</td>
                            <td>{item.beds}</td>
                            <td>{item.location}</td>
                            <td>{item.rent}</td>
                            <td>
                                <Link to={`/update/${item.id}`}>
                                    <button className="btn btn-edit">Edit</button>
                                </Link>
                                <button className="btn btn-delete" onClick={() => deleteContact(item.id)}>Delete</button>
                                <Link to={`/view/${item.id}`}>
                                <button className="btn btn-view">View</button>
                                </Link>
                            </td>
                        </tr>
                    );
                })};
            </tbody>
        </table>
    </div>
        
  );
};

export default Home;