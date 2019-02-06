const Discord = require('discord.js');
const fs = require('promise-fs');
const async = require('async');
const config = require('./config.json')

const client = new Discord.Client();
require('dotenv').config()

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

async function get_playlists(){
    return await fs.readdir('./playlists/');
}

function delete_message(msg) {
    msg.delete(config.delete_timeout);
}

//https://gist.github.com/eslachance/3349734a98d30011bb202f47342601d3
client.on('message', async msg => {
    if (msg.content.match(/.*c.*h.*r.*i.*s.*/i) !== null) {
        const chris = client.emojis.find(emoji => emoji.name === 'Chris');
        msg.react(chris.id);
    }

    if (msg.content.indexOf(config.prefix) !== 0) return;

    const args = msg.content.slice(config.prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    // TODO: return latency
    // TODO: wrap commands with delete and delete_message
    if (cmd === 'ping') {
        msg.delete(config.delete_timeout);
        msg.reply('pong').then(delete_message);
    }

    if (cmd === 'playlists') {
        msg.delete(config.delete_timeout);
        playlists = await get_playlists();
        msg.channel.send(playlists).then(delete_message);
    }
});

client.login(process.env.botToken);
