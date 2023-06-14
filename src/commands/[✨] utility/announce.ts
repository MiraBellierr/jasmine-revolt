import Client, { Message, Channel } from "revolt.js";
import {
	checkIfHexColor,
	checkIfImage,
	checkIfLink,
	convertToFile,
	findChannel,
	waitForResponse,
} from "../../utils/utils";
import { Embed } from "../../utils/types";

export const name = "announce";
export const description = "Sends an announcement to the channel";
export const category = "[✨] utility";
export const example = `${process.env.PREFIX}announce <channel>`;

export async function run(client: Client, message: Message, args: string[]) {
	if (!args.length) {
		return message.reply("Please specify a channel.");
	}

	const embed: Embed = {
		colour: null,
		description: null,
		icon_url: null,
		media: null,
		title: null,
		url: null,
	};

	const filter = (response: Message) => response.authorId === message.authorId;

	const sendEmbed = (ch: Channel) => ch.sendMessage({ embeds: [embed] });

	const channel = findChannel(message, args[0]);

	message.channel?.sendMessage(
		"What is the title of your announcement? `skip` to skip."
	);

	const title = await waitForResponse(client, 20000, filter);

	if (title !== "skip") embed.title = title;

	sendEmbed(message.channel!);

	message.channel?.sendMessage(
		"What is the icon url of your announcement? `skip` to skip."
	);

	const icon_url = await waitForResponse(client, 20000, filter);

	if (icon_url !== "skip") {
		if (!checkIfImage(icon_url))
			return message.channel?.sendMessage(
				"Command has been canceled. Only accept image link."
			);

		embed.icon_url = icon_url;
	}

	sendEmbed(message.channel!);

	message.channel?.sendMessage(
		"What is the url of your announcement? `skip` to skip."
	);

	const url = await waitForResponse(client, 20000, filter);

	if (url !== "skip") {
		if (!checkIfLink(url))
			return message.channel?.sendMessage(
				"Command has been canceled. Only accept link."
			);

		embed.url = url;
	}

	sendEmbed(message.channel!);

	message.channel?.sendMessage(
		"What is the description of your announcement? `skip` to skip."
	);

	const description = await waitForResponse(client, 20000, filter);

	if (description !== "skip") embed.description = description;

	sendEmbed(message.channel!);

	message.channel?.sendMessage(
		"What is the media of your announcement? `skip` to skip."
	);

	const media = await waitForResponse(client, 20000, filter);

	if (media !== "skip") {
		if (!checkIfLink(media))
			return message.channel?.sendMessage(
				"Command has been canceled. Only accept link."
			);

		embed.media = await convertToFile(client, media, "media");
	}

	sendEmbed(message.channel!);

	message.channel?.sendMessage(
		"What is the color of your announcement? `skip` to skip."
	);

	const color = await waitForResponse(client, 20000, filter);

	if (color !== "skip") {
		if (!checkIfHexColor(color))
			return message.channel?.sendMessage(
				"Command has been canceled. Only accept link."
			);

		embed.colour = color;
	}

	message.channel?.sendMessage("Is this okay? `confirm` to confirm");

	embed.media = await convertToFile(client, media, "media");

	sendEmbed(message.channel!);

	const confirmFilter = (response: Message) =>
		response.authorId === message.authorId && response.content === "confirm";

	const confirm = await waitForResponse(client, 20000, confirmFilter);

	if (confirm) {
		embed.media = await convertToFile(client, media, "media");
		sendEmbed(channel!);
	}
}
