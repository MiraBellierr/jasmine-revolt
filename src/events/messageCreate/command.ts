import { Client, Message } from "revolt.js";

module.exports = async (client: Client, message: Message) => {
	if (!message.server) {
		return;
	}
	if (message.channel!.type !== "TextChannel") {
		return;
	}

	const prefix = process.env.PREFIX as string;

	if (message.mentionIds?.includes(client.user?.id as string)) {
		message.reply(
			`My prefix for this server is \`${prefix}\`. Type \`${prefix}help\` for more info about me.`
		);
	}

	if (!message.content!.startsWith(prefix) || message.author!.bot) {
		return;
	}

	const args = message.content!.slice(prefix.length).trim().split(/ +/g);
	const cmd = args.shift()?.toLowerCase();

	if (!cmd) {
		return;
	}

	let command = client.commands.get(cmd);
	if (!command) {
		command = client.commands.get(client.aliases.get(cmd));
	}
	if (!command) {
		return;
	}

	try {
		await command.run(client, message, args);
	} catch (err) {
		console.log(err);
		message.reply("There was an error trying to execute this command.");
	}
};
