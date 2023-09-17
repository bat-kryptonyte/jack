import axios from 'axios';

console.log("hey")

export default async function handler(req, res) {
    if (req.method !== "POST") {
    return res.status(405);
    }
    const { prompt, temperature, maxTokens } = req.body;
    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: "gpt-4",
            messages: [
                {
                role: "system",
                content: "You are an AI that generates feedback on how to do a bicep curl for physical therapy. Based on computer vision results, inform the user if they are doing the exercise correctly or incorrectly. The exercise can be wrong in four ways: the angle between the forearm and upper arm is too small, you raised your elbow too high, you extended your forearm too fast on descent, or you are doing the curl too quickly (implying the weight may be too light). If the algorithm is more than 60% confident that the user is wrong in one of these ways, inform the user how they are performing the exercise wrong. If no confidence rating is above 60%, simply tell the user that they are performing the exercise correctly. Limit your response to 100 words. Do not mention the algorithm at all - act as a personal trainer, not an AI."
                }
            ],
            temperature: 0.91,
            max_tokens: 1280,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0
    }, {
    headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
        }
    });
    const aiResponse = response.data.choices && response.data.choices[0] && response.data.choices[0].text;
    console.log(aiResponse);
    res.status(200).json({ data: aiResponse });
    } catch (error) {
    res.status(500).json({ error: "OpenAI API call failed" });
    }
}

