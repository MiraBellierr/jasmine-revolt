import axios from "axios";
import Client, { Message } from "revolt.js";
import { CountryData } from "../../utils/types";

export const name = "country";
export const description = "shows information about a country";
export const category = "[✨] utility";
export const example = `${process.env.PREFIX}country [country]`;

export async function run(client: Client, message: Message, args: string[]) {
	if (!args.length) return message.reply("Please specify a country.");

	const country = args.join(" ");

	const { data } = await axios.get(
		`https://restcountries.com/v3.1/name/${country}`
	);

	const countryData: CountryData = data[0];

	const countryName = countryData.name.official;
	const status = countryData.status;
	const currency = `${
		countryData.currencies[Object.keys(countryData.currencies)[0]].name
	} (${countryData.currencies[Object.keys(countryData.currencies)[0]].symbol})`;
	const capital = countryData.capital.join(", ");
	const region = countryData.subregion;
	const languages = Object.values(countryData.languages).join(", ");
	const flag = countryData.flags.png;

	message.reply({
		embeds: [
			{
				title: countryName,
				description: `**Name:** ${countryName}\n**Status:** ${status}\n**Currency:** ${currency}\n**Capital:** ${capital}\n**Region:** ${region}\n**Languages:** ${languages}`,
				colour: "#FF00FF",
				icon_url: flag,
			},
		],
	});
}
