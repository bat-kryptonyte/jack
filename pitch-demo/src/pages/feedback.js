import { useState } from 'react';
import dotenv from 'dotenv';
import OpenAI from "openai";

dotenv.config()

function Feedback(props) {
    const [feedback] = useState("");
    const arm_angle =  90;
    const drop_speed = 30;
    const elbow_angle = 20;
    const curl_speed = 10;


function generateMessage(arm_angle, drop_speed, elbow_angle, curl_speed) {
    const arm_angle_confidence = `${arm_angle}% confident that the forearm is not extended enough on descent`;
    const drop_speed_confidence = `${drop_speed}% confident that the forearm is dropping too quickly`;
    const elbow_angle_confidence = `${elbow_angle}% confident that the elbow is raised too high`;
    const curl_speed_confidence = `${curl_speed}% confident that the bicep curl is too fast`;

    return arm_angle_confidence + ". " + drop_speed_confidence + ". " + elbow_angle_confidence + ". " + curl_speed_confidence + "."
    }

    const userMessage = generateMessage(arm_angle, drop_speed, elbow_angle, curl_speed);

    const openai = new OpenAI({
        apiKey: "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",
        dangerouslyAllowBrowser: true
    });
    
    async function getFeedback() {
        try {
            const response = await openai.chat.completions.create({
                model: "gpt-4",
                messages: [
                    {
                    "role": "system",
                    "content": "You are an AI that generates feedback on how to do a bicep curl for physical therapy. Based on computer vision results, inform the user if they are doing the exercise correctly or incorrectly. The exercise can be wrong in four ways: the angle between the forearm and upper arm is too small, you raised your elbow too high, you extended your forearm too fast on descent, or you are doing the curl too quickly (implying the weight may be too light). If the algorithm is more than 60% confident that the user is wrong in one of these ways, inform the user how they are performing the exercise wrong. If no confidence rating is above 60%, simply tell the user that they are performing the exercise correctly. Limit your response to 100 words. Do not mention the algorithm at all - act as a personal trainer, not an AI."
                    },
                    {
                    "role": "user",
                    "content": userMessage
                    }
                ],
                temperature: 0.91,
                max_tokens: 1280,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0,
            });
            console.log(response.choices[0].message.content)
            //setFeedback(data.data);
        } catch (error) {
            console.error("Error fetching feedback:", error);
        }
    }
    return (
        <div>
            <button onClick={getFeedback}>Get Feedback</button>
            <p>{feedback}</p>
        </div>
    );
}

export default Feedback;