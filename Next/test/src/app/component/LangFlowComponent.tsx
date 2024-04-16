"use client"
import { useState, useEffect } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';


const LangFlowComponent = () => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            // Define the base URL for the LangFlow server
            const langflowBaseURL = 'http://localhost:7860'; // Replace with your LangFlow server URL

            try {
                // Make a direct request to the LangFlow server's endpoint
                const response: AxiosResponse<any> = await axios.get(`${langflowBaseURL}/api/langflow`);
                setData(response.data);
                setLoading(false);
            } catch (error: unknown) {
                // Handle the error based on its type
                if (axios.isAxiosError(error)) {
                    // Handle Axios errors
                    setError(`Error fetching data: ${error.message}`);
                } else if (error instanceof Error) {
                    // Handle general JavaScript errors
                    setError(`An unexpected error occurred: ${error.message}`);
                } else {
                    // Handle other unexpected errors
                    setError('An unknown error occurred.');
                }
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Render loading, error, or data
    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    // Render the data (e.g., in a JSON format or other format of your choice)
    return (
        <div>
            <h2>LangFlow Data</h2>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
};

export default LangFlowComponent;
