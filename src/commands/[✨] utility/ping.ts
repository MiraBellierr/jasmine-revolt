import { Client, Message } from "revolt.js";

export const name = "ping";
export const description = "pong";
export const category = "[✨] utility";

export async function run(client: Client, message: Message): Promise<void> {
	message.reply("pong");
}
