import { UIContainerPlugin, version } from '@clappr/core'

import './public/poster.scss'

export default class PosterPlugin extends UIContainerPlugin {
  get name() { return 'poster' }

  get supportedVersion() { return { min: version } }

  get attributes() {
    return {
      class: 'poster',
      'data-poster': '',
    }
  }

  constructor(container) {
    super(container)
    this.render()
  }

  render() {
    const posterImage = document.createElement('img')
    posterImage.src = 'https://estaticos.globoradio.globo.com/fotos/2020/08/4545a92d-bcd0-4284-b1a6-c3cd209ef33c.jpg.1400x1400_q90_box-341%2C0%2C1707%2C1363_crop_detail.jpg'
    posterImage.title = 'GE Flamengo #74 com Rodrigo Caio - Expectativa alta após primeiro contato com Dome: &quot;Estamos dispostos a aprender&quot;' //eslint-disable-line
    posterImage.alt = 'GE Flamengo #74 com Rodrigo Caio - Expectativa alta após primeiro contato com Dome: &quot;Estamos dispostos a aprender&quot;' //eslint-disable-line

    this.el.append(posterImage)
    this.container.$el.append(this.el)
  }
}
