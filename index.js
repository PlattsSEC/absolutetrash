const Discord = require('discord.js');
const client = new Discord.Client();
const { commands } = require('./commands.js');

client.login(process.env.BOT_TOKEN);
client.on('message', async function(message){
  if (!message.guild) return;
  try{
    if (Object.keys(commands).indexOf(message.content) >= 0){
        await commands[message.content](message);
    }
  } catch(e){
    console.log(e);
  }



});
