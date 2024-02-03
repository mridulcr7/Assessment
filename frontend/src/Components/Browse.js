import React, { useState } from 'react';
import Header from "./Header";
import { useAuthContext } from '../hooks/useAuthContext';



const Browse = () => {
    const { user } = useAuthContext();
    const [newName, setNewName] = useState();
    const [display, setdisplay] = useState(user.name);
    const handleNameChange = (e) => {
        setNewName(e.target.value);
    };

    const handleEditInformation = async () => {

        const apiUrl = 'http://localhost:4000/changename';
        console.log(newName);
        const response = await fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: user.email, name: newName }),
        })
        
        const json = await response.json();
        console.log(json);
        setdisplay(newName);
        setNewName("");
    };
    return (
        <div className="flex flex-col min-h-screen">
            <Header className="fixed top-0 w-full z-50" />
            <div className="p-8 mt-20"> {/* Adjust the top margin based on your header's height */}
                <h1 className="text-2xl font-bold">Welcome {display} </h1>

                <h2 className="text-2xl font-bold">Edit Your Information</h2>
                <label htmlFor="newName" className="block mt-4">New Name:</label>
                <input
                    type="text"
                    id="newName"
                    value={newName}
                    onChange={handleNameChange}
                    className="border border-gray-300 p-2 mt-1"
                />
                <button
                    onClick={handleEditInformation}
                    className="bg-blue-500 text-white px-4 py-2 mt-4"
                >
                    Save Changes
                </button>
            </div>
        </div>
    );
};

export default Browse;
