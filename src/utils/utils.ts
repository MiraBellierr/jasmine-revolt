import axios from "axios";
import https from "https";

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

const checkIfImage = (url: string): Promise<boolean> => {
	return new Promise((resolve, reject) => {
		https
			.get(url, (res) => {
				const contentType = res.headers["content-type"] as string;
				resolve(contentType.startsWith("image/"));
			})
			.on("error", (err) => {
				reject(err);
			});
	});
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

export {
	splitMessage,
	formatDate,
	formatTime,
	nekoapi,
	checkIfImage,
	deleteElement,
	getProgBar,
	asyncForEach,
};
