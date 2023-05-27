import dotenv from "dotenv";
import { Client } from "revolt.js";
import { Collection } from "@discordjs/collection";
import { CharacterList, Command, Character } from "./utils/types";
import fs from "fs";

dotenv.config();

const client: Client = new Client();

client.commands = new Collection<string, Command>();
client.aliases = new Collection<string, Command>();
client.categories = fs.readdirSync("dist/commands/");
client.characters = new Collection<string, Character>();

import charactersData from "./database/json/characters.json";

const characters: CharacterList = charactersData;

Object.values(characters).forEach((character) => {
	client.characters.set(character.name, character);
});

["command", "event"].forEach((handler) => {
	import(`./handlers/${handler}`).then((file) => file.default(client));
});

client.loginBot(process.env.TOKEN as string);
