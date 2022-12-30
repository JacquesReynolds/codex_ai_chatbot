import express from 'express';
import * as dontenv from 'dotenv';
import cors from 'cors';
import { Configuration, OpenAIApi } from 'openai';

dontenv.config();

// Start configuration
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});

// Create an instance of Open AI - pass in configuration of our API key
const openai = new OpenAIApi(configuration);

// Initialise express application
const app = express();

// Setup middlewares - to make cross origin requests
app.use(cors());

// Allow us to pass JSON from frontend to backend
app.use(express.json());

app.get('/', async (req, res) => {
    res.status(200).send({ message: "Suhh Duuuuuude" })
})

// In a post route we can recieve data from body of frontend request - which is noice
app.post('/', async (req, res) => {
    try {
        const prompt = req.body.prompt;

        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${prompt}`,
            temperature: 0,
            max_tokens: 3000,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0,
        });

        res.status(200).send({
            bot: response.data.choices[0].text
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({ error })
    }
})

app.listen(5000, () => console.log("Server is running on port http://localhost:5000"));