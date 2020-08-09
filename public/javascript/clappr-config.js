const playerElement = document.getElementById('player-wrapper')

const player = new ClapprAudioPlayer.Player({
  source: 'https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_5MG.mp3',
  width: 640,
  height: 230,
})

player.attachTo(playerElement)
