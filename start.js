"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
var fs = require('node:fs');
var path = require('node:path');
var _a = require('discord.js'), Client = _a.Client, Collection = _a.Collection, Events = _a.Events, GatewayIntentBits = _a.GatewayIntentBits;
var token = process.env.TOKEN;
// Create a new client instance
var client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();
// Log in to Discord with your client's token
client.login(token);
