import axios from "axios";
import Client, { Message } from "revolt.js";
import { CountryData } from "../../utils/types";
import { convertToFile } from "../../utils/utils";

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

	const commonName = countryData.name.common;
	const officialName = countryData.name.official;
	const status = countryData.status;
	const currency = `${
		countryData.currencies[Object.keys(countryData.currencies)[0]].name
	} (${countryData.currencies[Object.keys(countryData.currencies)[0]].symbol})`;
	const capital = countryData.capital.join(", ");
	const region = countryData.subregion;
	const languages = Object.values(countryData.languages).join(", ");
	const flag = countryData.flags.png;
	const coatOfArms = countryData.coatOfArms;

	message.reply({
		embeds: [
			{
				title: commonName,
				description: `**Name:** ${officialName}\n**Status:** ${status}\n**Currency:** ${currency}\n**Capital:** ${capital}\n**Region:** ${region}\n**Languages:** ${languages}`,
				colour: "#FF00FF",
				icon_url: flag,
				media: coatOfArms
					? await convertToFile(client, coatOfArms.png, "coatOfArms")
					: undefined,
			},
		],
	});
}
