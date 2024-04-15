import axios, { AxiosError } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const { method, body, query } = req;

    try {
        // Check if the URL property is defined
        if (req.url) {
            // Make an axios request to the LangFlow server
            const langflowResponse = await axios({
                method: method as any, // Cast method as any to allow it in axios
                url: `http://localhost:7860${req.url.replace('/api/langflow', '')}`, // Adjust the URL path
                data: body,
                params: query,
            });

            // Return the response from the LangFlow server to the client
            res.status(langflowResponse.status).json(langflowResponse.data);
        } else {
            // Handle the case where req.url is undefined
            res.status(400).json({ error: 'Request URL is undefined' });
        }
    } catch (error) {
        // Handle errors
        if (error instanceof AxiosError) {
            // If error is an AxiosError, handle it accordingly
            const status = error.response ? error.response.status : 500;
            const message = error.response ? error.response.data : error.message;

            res.status(status).json({ error: message });
        } else {
            // If error is not an AxiosError, handle it as a generic error
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
}
