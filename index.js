const Discord = require('discord.js');
const client = new Discord.Client();
const { commands } = require('./commands.js');

client.login(process.env.BOT_TOKEN);
client.on('message', async function(message){
  if (!message.guild) return;
  try{
    var [command, url]  = message.content.split(' ');
    console.log(command);
    console.log(url);
    if (Object.keys(commands).indexOf(command) >= 0){
        await commands[command](url, message);
    }
  } catch(e){
    console.log(e);
  }



});
