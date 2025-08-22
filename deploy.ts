import 'dotenv/config'
import './types.ts'
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { REST, Routes } from 'discord.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const token = process.env.tokenId;
const clientId = process.env.clientId;
const guildId = process.env.guildId;

const commands = [];

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		try {
			const command = await import(`file://${filePath}`);
			const commandModule = command.default || command;
			// Set a new item in the Collection with the key as the command name and the value as the exported module
			if ('data' in commandModule && 'execute' in commandModule) {
				commands.push(commandModule.data.toJSON());
			} else {
				console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
			}
		} catch (error) {

		}
	}
}

const rest = new REST().setToken(token);

(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		const data = await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);
		console.log(data);
		console.log(typeof data);
		console.log(`Succesfully reloaded ${commands.length} application (/) commands.`);
	} catch (error) {
		console.log(error);
	}
})();
