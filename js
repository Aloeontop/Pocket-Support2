const express = require('express');
const { OpenAI } = require('openai');
const app = express();
const port = 3000;

app.use(express.json());

const openai = new OpenAI({
    apiKey: 'YOUR_OPENAI_API_KEY'  // Replace with your actual OpenAI API key
});

// API to get AI response
app.post('/api/getAIResponse', async (req, res) => {
    const userInput = req.body.prompt;

    try {
        const response = await openai.chat.completions.create({
            messages: [{ role: 'user', content: userInput }],
            model: 'gpt-4'  // Use GPT-4 or another model
        });

        res.json({ reply: response.choices[0].message.content });
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong with the AI request.' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
