import { Collection } from "@discordjs/collection";
import Client, { Message } from "revolt.js";

export interface Character {
	name: string;
	image: string;
}

export interface CharacterList {
	[key: string]: Character;
}

export interface Command {
	name: string;
	description: string;
	category: string;
	aliases?: string[];
	run: (client: Client, message: Message, args: string[]) => void;
}

export interface CountryData {
	name: {
		common: string;
		official: string;
		nativeName: {
			[key: string]: {
				common: string;
				official: string;
			};
		};
	};
	tld: string[];
	cca2: string;
	ccn3: string;
	cca3: string;
	cioc: string;
	independent: boolean;
	status: string;
	unMember: boolean;
	currencies: {
		[key: string]: {
			name: string;
			symbol: string;
		};
	};
	idd: {
		root: string;
		suffixes: string[];
	};
	capital: string[];
	altSpellings: string[];
	region: string;
	subregion: string;
	languages: {
		[key: string]: string;
	};
	translations: {
		[key: string]: {
			official: string;
			common: string;
		};
	};
	latlng: number[];
	landlocked: boolean;
	borders: string[];
	area: number;
	demonyms: {
		[key: string]: {
			f: string;
			m: string;
		};
	};
	flag: string;
	maps: {
		[key: string]: string;
	};
	population: number;
	gini: {
		[key: string]: number;
	};
	fifa: string;
	car: {
		signs: string[];
		side: string;
	};
	timezones: string[];
	continents: string[];
	flags: {
		png: string;
		svg: string;
		alt: string;
	};
	coatOfArms: {
		png: string;
		svg: string;
	};
	startOfWeek: string;
	capitalInfo: {
		latlng: number[];
	};
	postalCode: {
		format: string;
		regex: string;
	};
}
