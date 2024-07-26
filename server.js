// npm i dotenv express cors openai 
// dotenv to access .env; rest for server/API calls to openAI

import * as dotenv from 'dotenv';
dotenv.config();

import OpenAI from 'openai';
const openai = new OpenAI({
    apiKey: process.env.OPENAI,
})
/*
OLD OpenAI v3 
import {Configuration, OpenAIApi} from 'openai';

const configuration = new Configuration({
    apiKey: process.env.OPENAI,
})

const openai = new OpenAIApi(configuration);
*/ 


// express makes building websites while testing 
// on node easier. Also allows for middleware injection
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
// specify json only & add checks on CORS content-type
app.use(express.json());

// tell app to make a post request on the /dream resource 
// when a post is made, async callback 
// grab the prompt from the request, wait for OpenAI to finish
// get the URL
app.post('/dream', async (req, res) => {

    const userPrompt = req.body.prompt;

    try {
        const aiResponse = await openai.images.generate({
            model: 'dall-e-3',
            prompt: userPrompt,
            n: 1,
            size: '1024x1024',
            quality: "standard",
        });
        const image = aiResponse.data[0].url;
        // respond with image as json!
        res.send({image});
    } catch (error) {
        console.error(error)
        res.status(500).send(error?.response.data.error.message || 'Something went wrong');
    }
})

// listen to the app at a selected port
app.listen(8080, () => console.log('make art on http://localhost:8080/dream'))