"use client";

import { useState, useEffect } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';

const LangFlowComponent = () => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<AxiosError | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response: AxiosResponse<any> = await axios.get('/api/langflow');
                setData(response.data);
                setLoading(false);
            } catch (error: unknown) {
                if (axios.isAxiosError(error)) {
                    // Handle Axios errors
                    setError(error);
                } else {
                    // Handle other errors (unexpected types)
                    console.error('An unexpected error occurred:', error);
                }
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    // Render your LangFlow data here
    return (
        <div>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
};

export default LangFlowComponent;
