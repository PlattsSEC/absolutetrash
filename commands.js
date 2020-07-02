const fs = require('fs');
const path = require('path');
const currentDir = path.join('music');
const mp3Files = [];
const { exec } = require("child_process");


fs.readdir(currentDir, (err, files) => {
  files.forEach((file) => {
    if (file.slice(-3)==='mp3'){
        mp3Files.push(file);
    }
  });

});


var URLs = [];
fs.readFile('urls.txt', 'utf8', function (err,data) {
  if(data){
    URLs = data.split("\n");
  }

});

console.log(URLs);


function createStream(fileName){
//  console.log(mp3Files);
//  var fileIndex = Math.floor(Math.random()*mp3Files.length);
//  console.log(`Playing ${mp3Files[fileIndex]}...`)
  console.log(`Playing ${fileName}...`)
  return fs.createReadStream(`music/${fileName}`);
}


async function downloadMP3(url, channelConnection){

const fileName = url.split("v=")[1];
await exec(`youtube-dl -x --audio-format mp3 -o music/${fileName}.mp3 ${url}`, (error, stdout, stderr) => {
	if (error) {
		console.log(`error: ${error.message}`);
		return;
	}
	if (stderr) {
		console.log(`stderr: ${stderr}`);
		return;
	}
        	channelConnection.playStream(createStream(`${fileName}.mp3`));
	});
}



const commands = {
  '/trashup': async (url, message) => {
    if (message.member.voiceChannel) {
      let channelConnection = await message.member.voiceChannel.join();
      var fn = null;
      try{
	if(URLs.indexOf(url) < 0){
	  fn = await downloadMP3(url, channelConnection);
	  URLs.push(url);
	}else{
	 name = url.split("v=")[1];
	 fn = `${name}.mp3`
	}
        message.reply('Time to trash it up');
        channelConnection.playStream(createStream(fn));
      } catch(e){
        console.log(e);
      }

    } else {
      message.reply('You need to join a voice channel first!');
    }
  },

  '/trashdown': async (url, message) => {
    if (message.member.voiceChannel){
         message.member.voiceChannel.leave();
      }
  }
}

module.exports = {
  commands: commands
}
