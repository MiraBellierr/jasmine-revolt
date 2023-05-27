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
