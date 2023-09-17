import { useState } from 'react';
import dotenv from 'dotenv';


function Feedback(props) {
    const [feedback, setFeedback] = useState("");
    const [temperature, setTemperature] = useState(0.7);
    const [maxTokens, setMaxTokens] = useState(1280);

    dotenv.config()

    const arm_angle =  90;
    const drop_speed = 80;
    const elbow_angle = 60;
    const curl_speed = 80;

    console.log(process.env.OPENAI_API_KEY);
    console.log("tests")

function generateMessage(arm_angle, drop_speed, elbow_angle, curl_speed) {
    const arm_angle_confidence = `${arm_angle}% confident that the forearm is not extended enough on descent`;
    const drop_speed_confidence = `${drop_speed}% confident that the forearm is dropping too quickly`;
    const elbow_angle_confidence = `${elbow_angle}% confident that the elbow is raised too high`;
    const curl_speed_confidence = `${curl_speed}% confident that the bicep curl is too fast`;

    return arm_angle_confidence + ". " + drop_speed_confidence + ". " + elbow_angle_confidence + ". " + curl_speed_confidence + "."
    }

  // Assuming params are received as props
    const userMessage = generateMessage(arm_angle, drop_speed, elbow_angle, curl_speed);

    async function getFeedback() {
        try {
            const response = await fetch('/api/openai', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                prompt: userMessage, 
                temperature: temperature,
                maxTokens: maxTokens
                })
            });
            const data = await response.json();
            console.log(data)
            setFeedback(data.data);
        } catch (error) {
            console.error("Error fetching feedback:", error);
        }
    }

    return (
        <div>
            {/* ... maybe display userMessage or parameters ... */}
            <button onClick={getFeedback}>Get Feedback</button>
            <p>{feedback}</p>
        </div>
    );
}

export default Feedback;
