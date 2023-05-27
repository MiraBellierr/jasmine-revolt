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
	aliases?: string[];
	run: (client: Client, message: Message, args: string[]) => void;
}

export interface Env {
	TOKEN: string;
	PREFIX: string;
}

export interface HandlerCollection {
	commands: Collection<string, Command>;
	aliases: Collection<string, Command>;
	categories: string[];
	characters: Collection<string, Character>;
}
