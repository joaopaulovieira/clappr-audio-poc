const playerElement = document.getElementById('player-wrapper')

const player = new ClapprAudioPlayer.Player({
  source: 'https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_5MG.mp3',
  playback: { controls: true },
})

player.attachTo(playerElement)
