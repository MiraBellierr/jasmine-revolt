import axios from "axios";
import https from "https";
import Client, { Channel, Message } from "revolt.js";

const deleteElement = <T>(array: T[], element: T): T[] => {
	const index = array.indexOf(element);
	if (index !== -1) {
		array.splice(index, 1);
	}

	return array;
};

const splitMessage = (
	text: string,
	{
		maxLength = 2_000,
		char = "\n",
		prepend = "",
		append = "",
	}: {
		maxLength?: number;
		char?: string | RegExp | (string | RegExp)[];
		prepend?: string;
		append?: string;
	} = {}
): string[] => {
	if (text.length <= maxLength) {
		return [text];
	}

	let splitText: string[] = [text];

	if (Array.isArray(char)) {
		while (
			char.length > 0 &&
			splitText.some((elem) => elem.length > maxLength)
		) {
			const currentChar = char.shift();

			if (currentChar instanceof RegExp) {
				splitText = splitText.flatMap(
					(chunk) => chunk.match(currentChar) || []
				);
			} else {
				splitText = splitText.flatMap((chunk) =>
					chunk.split(currentChar as string)
				);
			}
		}
	} else {
		splitText = text.split(char as string);
	}

	if (splitText.some((elem) => elem.length > maxLength)) {
		throw new RangeError("SPLIT_MAX_LEN");
	}

	const messages: string[] = [];
	let msg = "";

	for (const chunk of splitText) {
		if (msg && (msg + char + chunk + append).length > maxLength) {
			messages.push(msg + append);
			msg = prepend;
		}

		msg += (msg && msg !== prepend ? char : "") + chunk;
	}

	return messages.concat(msg).filter((m): m is string => m !== null);
};

const formatDate = (date: Date): string => {
	const options: Intl.DateTimeFormatOptions = {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
		timeZone: "UTC",
	};

	return new Intl.DateTimeFormat("en-US", options).format(date);
};

const formatTime = (date: Date): string => {
	const options: Intl.DateTimeFormatOptions = {
		hour: "numeric",
		minute: "numeric",
		second: "numeric",
	};
	return new Intl.DateTimeFormat("en-US", options).format(date);
};

const nekoapi = async (endpoint: string): Promise<string> => {
	const res = await axios({
		method: "get",
		url: `https://www.nekos.life/api/v2/img/${endpoint}`,
	});

	if (!res.data.url) {
		const links = require("../database/json/roleplay.json");

		const random =
			links[endpoint][Math.floor(Math.random() * links[endpoint].length)];

		return random;
	}

	return res.data.url;
};

const checkIfLink = (url: string): boolean => {
	const pattern = /^(ftp|http|https):\/\/[^ "]+$/;
	return pattern.test(url);
};

const checkIfImage = (url: string): boolean => {
	const imageUrlPattern = /\.(jpeg|jpg|gif|png|bmp|svg)$/i;
	const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;

	return urlPattern.test(url) && imageUrlPattern.test(url);
};

const getProgBar = (current: number, max: number, length: number): string => {
	const curBer = Math.floor((current / max) * length);
	let str = "";

	for (let i = 0; i < length; i++) {
		str += i < curBer ? "■" : "□";
	}

	return str;
};

const asyncForEach = async <T>(
	array: T[],
	callback: (element: T, index: number, array: T[]) => Promise<void>
): Promise<void> => {
	for (let index = 0; index < array.length; index++) {
		await callback(array[index], index, array);
	}
};

const checkIfHexColor = (color: string): boolean => {
	const pattern = /^#([0-9A-Fa-f]{3}){1,2}$/i;
	return pattern.test(color);
};

const convertToFile = async (client: Client, url: string, filename: string) => {
	let urlRegex =
		/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/gi;
	const autumn = client.configuration?.features.autumn.url;

	if (url.match(urlRegex)) {
		const res = await fetch(url, { method: "GET" });
		const blob = await res.blob();

		const form = new FormData();
		form.append("file", blob, filename);

		const res2 = await fetch(`${autumn}/attachments`, {
			method: "POST",
			body: form,
		});

		const json = await res2.json();

		return json.id;
	} else {
		const form = new FormData();
		form.append("file", url, filename);

		const res = await fetch(`${autumn}/attachments`, {
			method: "POST",
			body: form,
		});

		const json = await res.json();

		return json.id;
	}
};

const waitForResponse = (
	client: Client,
	timeout: number,
	filter: (response: Message) => boolean
): Promise<string> => {
	return new Promise((resolve, reject) => {
		const messageListener = (response: Message) => {
			if (filter(response)) {
				resolve(response.content as string);
				cleanup();
			}
		};

		const timeoutId = setTimeout(() => {
			reject(new Error("Timeout exceeded"));
			cleanup();
		}, timeout);

		const cleanup = () => {
			clearTimeout(timeoutId);
			client.off("messageCreate", messageListener);
		};

		client.on("messageCreate", messageListener);
	});
};

const findChannel = (message: Message, input: string) => {
	const mentionRegex = /^<#(\w+)>$/;
	const mentionMatch = mentionRegex.exec(input);

	if (mentionMatch) {
		return message.server?.channels.find(
			(channel: Channel) => channel.id === mentionMatch[1]
		);
	}

	const channelById = message.server?.channelIds.has(input);
	if (channelById) {
		return message.server?.channels.find(
			(channel: Channel) => channel.id === input
		);
	}

	const channelByName = message.server?.channels.find(
		(channel: Channel) => channel.name === input
	);
	if (channelByName) return channelByName;

	return undefined;
};

export {
	splitMessage,
	formatDate,
	formatTime,
	nekoapi,
	checkIfImage,
	deleteElement,
	getProgBar,
	asyncForEach,
	convertToFile,
	waitForResponse,
	findChannel,
	checkIfLink,
	checkIfHexColor,
};
