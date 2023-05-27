import Client, { Message } from "revolt.js";
import { Command } from "../../utils/types";

export const name = "help";
export const description = "shows all commands";
export const category = "[✨] utility";
export const example = `${process.env.PREFIX}help [command]`;

export async function run(
	client: Client,
	message: Message,
	args: string[]
): Promise<void> {
	if (!args.length) {
		getAll(client, message);
	} else {
		getCMD(client, message, args[0]);
	}
}

function getAll(client: Client, message: Message) {
	const byCategories = new Array<string>();

	const commands = (category: string) =>
		client.commands
			.filter((cmd: Command) => cmd.category === category)
			.map((cmd: Command) => `\`${cmd.name}\``);

	client.categories.forEach((c: string) =>
		byCategories.push(`> **${c}**\n> ${commands(c).join(", ")}`)
	);

	return message.reply(`### Jasmine Help Menu\n\n ${byCategories.join("\n")}`);
}

function getCMD(client: Client, message: Message, input: string) {
	const cmd = client.commands.get(input.toLowerCase());

	const info = `No information found for command **${input.toLowerCase()}**`;

	if (!cmd) return message.reply(info);

	const fullText = new Array<string>();

	if (cmd.name) fullText.push(`> **Command Name**: \`${cmd.name}\``);
	if (cmd.description)
		fullText.push(`> **Description**: \`${cmd.description}\``);
	if (cmd.example) fullText.push(`> **Example**: \`${cmd.example}\``);

	return message.reply(`### Jasmine Help Menu\n\n ${fullText.join("\n")}`);
}
