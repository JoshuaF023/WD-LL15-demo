
// Get references to the buttons and the output area
// Get references to the buttons and the response area
const icebreakerBtn = document.getElementById('iceBtn');
const factBtn = document.getElementById('factBtn');
const jokeBtn = document.getElementById('jokeBtn');
const weatherBtn = document.getElementById('weatherBtn');
const responseDiv = document.getElementById('response');

// Import your OpenAI API key from secrets.js
// Make sure secrets.js exports a variable called apiKey
// Example: export const apiKey = 'your-api-key';
import { apiKey } from './secrets.js';

// This function sends a prompt to OpenAI and returns the response
async function getOpenAIResponse(userPrompt) {
  // The endpoint for OpenAI's chat API
  const url = 'https://api.openai.com/v1/chat/completions';

  // The system message controls the bot's personality
  const systemMessage = 'You are a friendly, fun, and positive conversation starter bot for group chats. Keep responses short, welcoming, and easy for anyone to join in.';

  // The body of the request
  const body = {
    model: 'gpt-4.1',
    messages: [
      { role: 'system', content: systemMessage },
      { role: 'user', content: userPrompt }
    ],
    max_tokens: 100
  };

  // Send the request using fetch and await the response
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify(body)
  });

  // Parse the JSON response
  const data = await response.json();

  // Return the assistant's reply
  return data.choices[0].message.content;
}

// Show the response in the response area
function showResponse(text) {
  responseDiv.textContent = text;
}

// Show a fun loading message while waiting for AI
function showLoading() {
  const loadingMessages = [
    'Thinking of something cool... 🤔',
    'Warming up my brain... 🧠✨',
    'Cooking up a response... 🍳',
    'Finding the perfect words... 🔍',
    'Getting creative... 🎨',
    'Let me break the ice... 🧊',
    'Hold tight, fun is coming... 🎉'
  ];
  // Pick a random loading message
  const msg = loadingMessages[Math.floor(Math.random() * loadingMessages.length)];
  responseDiv.textContent = msg;
}

// Add event listeners to each button


icebreakerBtn.addEventListener('click', async () => {
  // Ask for an icebreaker question
  showLoading();
  const prompt = 'Give me a fun icebreaker question to start a conversation.';
  try {
    const reply = await getOpenAIResponse(prompt);
    showResponse(reply);
  } catch (error) {
    showResponse('Oops! Something went wrong. Please try again in a moment. 🙈');
  }
});



factBtn.addEventListener('click', async () => {
  // Ask for a surprising fact
  showLoading();
  const prompt = 'Tell me a surprising fact that most people don\'t know.';
  try {
    const reply = await getOpenAIResponse(prompt);
    showResponse(reply);
  } catch (error) {
    showResponse('Oops! Something went wrong. Please try again in a moment. 🙈');
  }
});



jokeBtn.addEventListener('click', async () => {
  // Ask for a friendly joke
  showLoading();
  const prompt = 'Tell me a friendly, light-hearted joke.';
  try {
    const reply = await getOpenAIResponse(prompt);
    showResponse(reply);
  } catch (error) {
    showResponse('Oops! Something went wrong. Please try again in a moment. 🙈');
  }
});



weatherBtn.addEventListener('click', async () => {
  // Ask for a weather-related prompt
  showLoading();
  const prompt = 'Write a friendly prompt that encourages people to share what the weather is like where they are.';
  try {
    const reply = await getOpenAIResponse(prompt);
    showResponse(reply);
  } catch (error) {
    showResponse('Oops! Something went wrong. Please try again in a moment. 🙈');
  }
});
