const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const path = require('path');
//const stream = fs.createReadStream(`./${process.argv[2]}`);

client.login(process.env.BOT_TOKEN);
var currentVoiceCon;
const currentDir = path.join(process.env.HOME,'Desktop','code','discord-bot');
const mp3Files = [];
fs.readdir(currentDir, (err, files) => {
  files.forEach((file) => {
    if (file.slice(-3)==='mp3'){
        mp3Files.push(file);
    }
  });

});

function createRandomStream(){
  console.log(mp3Files);
  var fileIndex = Math.floor(Math.random()*mp3Files.length);
  return fs.createReadStream(`${currentDir}/${mp3Files[fileIndex]}`);
}


client.on('message', message => {
  // Voice only works in guilds, if the message does not come from a guild,
  // we ignore it
  if (!message.guild) return;

  if (message.content === '/trashup') {
    // Only try to join the sender's voice channel if they are in one themselves
    if (message.member.voiceChannel) {
      message.member.voiceChannel.join()
        .then(connection => { // Connection is an instance of VoiceConnection
          currentVoiceCon = connection;
          message.reply('Time to trash it up');
          connection.playStream(createRandomStream());
        })
        .catch(console.log);
    } else {
      message.reply('You need to join a voice channel first!');
    }
  }

 if (message.content === '/trashdown'){
   if (message.member.voiceChannel){
        message.member.voiceChannel.leave();      
     }

  }

 if (message.content === '/trashuffle'){
   if (currentVoiceCon){
        //currentVoiceCon.stopStream();
        currentVoiceCon.playStream(createRandomStream());      
     }

  }



});
