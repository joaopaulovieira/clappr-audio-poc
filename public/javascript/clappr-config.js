const playerElement = document.getElementById('player-wrapper')

const player = new ClapprAudioPlayer.Player({
  source: 'https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_5MG.mp3',
  width: 640,
  height: 230,
  poster: {
    source: 'https://estaticos.globoradio.globo.com/fotos/2020/08/4545a92d-bcd0-4284-b1a6-c3cd209ef33c.jpg.1400x1400_q90_box-341%2C0%2C1707%2C1363_crop_detail.jpg',
    title: 'GE Flamengo #74 com Rodrigo Caio - Expectativa alta após primeiro contato com Dome: "Estamos dispostos a aprender"',
    alt: 'GE Flamengo #74 com Rodrigo Caio - Expectativa alta após primeiro contato com Dome: "Estamos dispostos a aprender"',
  },
  mediaInfo: {
    header: 'GE Flamengo',
    title: 'GE Flamengo #74 com Rodrigo Caio - Expectativa alta após primeiro contato com Dome: "Estamos dispostos a aprender"',
    productName: 'Globo Esporte',
    productColor: 'rgb(168, 0, 0)',
    dateTime: '05/08/2020 18:43',
  },
})

player.attachTo(playerElement)
