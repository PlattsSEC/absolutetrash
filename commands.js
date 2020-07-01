const fs = require('fs');
const path = require('path');
const currentDir = path.join('music');
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
  console.log(`Playing ${mp3Files[fileIndex]}...`)
  return fs.createReadStream(`${currentDir}/${mp3Files[fileIndex]}`);
}



const commands = {
  '/trashup': async (message) => {
    if (message.member.voiceChannel) {
      try{
        let channelConnection = await message.member.voiceChannel.join();
        message.reply('Time to trash it up');
        channelConnection.playStream(createRandomStream());
      } catch(e){
        console.log(e);
      }

    } else {
      message.reply('You need to join a voice channel first!');
    }
  },

  '/trashdown': async (message) => {
    if (message.member.voiceChannel){
         message.member.voiceChannel.leave();
      }
  }
}

module.exports = {
  commands: commands
}
