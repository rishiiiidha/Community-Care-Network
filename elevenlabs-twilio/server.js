require("dotenv/config");
const express = require("express");
const ExpressWs = require("express-ws");
const { Configuration, OpenAIApi } = require("openai");
const { ElevenLabsClient } = require("elevenlabs");
const { Readable } = require("stream");

const app = ExpressWs(express()).app;
const PORT = parseInt(process.env.PORT || "5050");

// API clients
const openai = new OpenAIApi(
	new Configuration({
		apiKey: process.env.OPENAI_API_KEY,
	})
);
const elevenlabs = new ElevenLabsClient();

const voiceId = "21m00Tcm4TlvDq8ikWAM";
const outputFormat = "ulaw_8000";

const systemPrompt = `
You are General Crisis AI, a compassionate and professional emergency response assistant. Your role is to provide immediate support and guidance during health-related emergencies.

When a user reports a health issue, such as someone fainting or another medical condition:
1. Stay calm, empathetic, and reassuring.
2. Gather critical information, including the nature of the problem and the location of the incident.
3. Confirm and repeat the location to ensure accuracy.
4. Inform the user that you have alerted all the relevant emergency services and are providing them with immediate instructions if needed.
5. Guide the user through basic first aid steps if applicable and safe to perform.
6. Prioritize clear and concise communication, ensuring the user feels supported until help arrives.

Always adapt your tone to be kind, patient, and understanding, while maintaining professionalism.
`;

const startingMessage =
	"Hello, this is General Crisis AI, here to provide emergency support and connect you with the resources you need. How can I assist you today?";

function startApp() {
	app.post("/call/incoming", (_, res) => {
		const twiml = new VoiceResponse();

		twiml.connect().stream({
			url: `wss://${process.env.SERVER_DOMAIN}/call/connection`,
		});

		res.writeHead(200, { "Content-Type": "text/xml" });
		res.end(twiml.toString());
	});

	app.ws("/call/connection", (ws) => {
		ws.on("message", async (data) => {
			const message = JSON.parse(data);

			if (message.event === "start" && message.start) {
				const response = await elevenlabs.textToSpeech.convert(voiceId, {
					model_id: "eleven_flash_v2_5",
					output_format: outputFormat,
					text: startingMessage,
				});

				const readableStream = Readable.from(response);
				const audioArrayBuffer = await streamToArrayBuffer(readableStream);

				ws.send(
					JSON.stringify({
						event: "media",
						media: {
							payload: Buffer.from(audioArrayBuffer).toString("base64"),
						},
					})
				);
			}

			if (message.event === "media" && message.media) {
				const userText = "Received audio converted to text (via a service)";

				const aiResponse = await getAIResponse(userText);

				const response = await elevenlabs.textToSpeech.convert(voiceId, {
					model_id: "eleven_flash_v2_5",
					output_format: outputFormat,
					text: aiResponse,
				});

				const readableStream = Readable.from(response);
				const audioArrayBuffer = await streamToArrayBuffer(readableStream);

				ws.send(
					JSON.stringify({
						event: "media",
						media: {
							payload: Buffer.from(audioArrayBuffer).toString("base64"),
						},
					})
				);
			}
		});

		ws.on("error", console.error);
	});

	app.listen(PORT, () => {
		console.log(`Local: http://localhost:${PORT}`);
		console.log(`Remote: https://${process.env.SERVER_DOMAIN}`);
	});
}

async function getAIResponse(userText) {
	const prompt = `${systemPrompt}\n\nUser: ${userText}\nAI:`;

	const completion = await openai.createCompletion({
		model: "text-davinci-003",
		prompt,
		max_tokens: 300,
		temperature: 0.7,
	});

	return completion.data.choices[0].text.trim();
}

function streamToArrayBuffer(readableStream) {
	return new Promise((resolve, reject) => {
		const chunks = [];

		readableStream.on("data", (chunk) => {
			chunks.push(chunk);
		});

		readableStream.on("end", () => {
			resolve(Buffer.concat(chunks).buffer);
		});

		readableStream.on("error", reject);
	});
}

startApp();
