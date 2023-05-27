import fs from "fs";
import AsciiTable from "ascii-table";
import { Client } from "revolt.js";

const table = new AsciiTable("Events");
table.setHeading(["Event", "File", "Status"]);

const loadEvents = (client: Client): void => {
	fs.readdirSync("src/events/").forEach(async (dir) => {
		const events = fs.readdirSync(`dist/events/${dir}/`);

		for (const file of events) {
			const eventModule = await import(`../events/${dir}/${file}`);

			client.on(dir.split(".")[0], (...args) =>
				eventModule.default(client, ...args)
			);

			table.addRow([dir, file, "✅"]);
		}
	});

	console.log("=============================");
	console.log("\n" + table.toString());
};

export default loadEvents;
