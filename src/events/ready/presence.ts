import { Client } from "revolt.js";

const launchBot = async (client: Client): Promise<void> => {
	client.user?.edit({
		status: {
			presence: "Idle",
			text: `🌟 Spreading cuteness in ${client.servers.size()} servers 💖`,
		},
	});

	console.log("=============================");
	console.log("Launching the bot [Connecting to discord servers...]");
	console.log("=============================");

	console.log(`${client.user?.username} is now launched!`);
};

export default launchBot;
