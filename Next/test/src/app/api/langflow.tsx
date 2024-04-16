import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { AxiosError } from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    try {
        const { method, body, query } = req;

        // Define the base URL for the LangFlow server
        const langflowBaseURL = 'http://127.0.0.1:7860'; // Replace with your LangFlow server URL

        // Forward the request to the LangFlow server
        const langflowResponse = await axios({
            method,
            url: `${langflowBaseURL}${req.url}`, // Forward the entire request URL
            data: body,
            params: query,
        });

        // Return the response from the LangFlow server to the client
        res.status(langflowResponse.status).json(langflowResponse.data);
    } catch (error: unknown) {
        // Handle errors
        if (axios.isAxiosError(error)) {
            // Handle Axios errors
            const status = error.response ? error.response.status : 500;
            const message = error.response ? error.response.data : error.message;
            res.status(status).json({ error: message });
        } else if (error instanceof Error) {
            // Handle general JavaScript errors
            console.error('An unexpected error occurred:', error.message);
            res.status(500).json({ error: error.message });
        } else {
            // Handle other unexpected errors
            console.error('An unknown error occurred:', error);
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
}
