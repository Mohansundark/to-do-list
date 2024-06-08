import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
    const WORKSPACE_URL = "https://6000-idx-to-do-list-1717818842915.cluster-nx3nmmkbnfe54q3dd4pfbgilpc.cloudworkstations.dev/get";

    const [data, setData] = useState(null); // State to store the fetched data

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(WORKSPACE_URL);
                setData(response.data); // Store the fetched data in state
            } catch (error) {
                console.error('Error:', error);
            }
        }

        fetchData();
    }, []);

    return (
        <div>
            <h1>Home</h1>
            {data && (
                <div>
                    <h2>Fetched Data:</h2>
                    <pre>{JSON.stringify(data, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default Home;
