import fs from "fs";
import AsciiTable from "ascii-table";
import { Client } from "revolt.js";
import { Command } from "../utils/types";

const table = new AsciiTable("Commands");
table.setHeading(["Command", "Status"]);

const loadCommands = (client: Client): void => {
	fs.readdirSync("src/commands/").forEach(async (dir) => {
		const files = fs.readdirSync(`dist/commands/${dir}/`);

		for (const file of files) {
			const command: Command = await import(`../commands/${dir}/${file}`);

			if (command.name) {
				client.commands.set(command.name, command);
				table.addRow([file, "✅"]);
			} else {
				table.addRow([file, "❎ -> no command.name found"]);
				continue;
			}

			if (command.aliases && Array.isArray(command.aliases)) {
				command.aliases.forEach((alias) =>
					client.aliases.set(alias, command.name)
				);
			}
		}
	});

	console.log("=============================");
	console.log("\n" + table.toString());
};

export default loadCommands;
