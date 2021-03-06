import { UIContainerPlugin, version } from '@clappr/core'

import './public/poster.scss'
import placeholderImage from './public/placeholder.jpg'

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
    this.source = this.options.poster && this.options.poster.source
    this.title = this.options.poster && this.options.poster.title || ''
    this.alt = this.options.poster && this.options.poster.alt || this.title || ''
    this.render()
  }

  setImage() {
    let posterImage = placeholderImage

    if (this.source) {
      posterImage = document.createElement('img')
      posterImage.src = this.source
    }

    posterImage.title = this.title
    posterImage.alt = this.alt

    this.el.append(posterImage)
  }

  render() {
    this.setImage()
    this.container.$el.append(this.el)
  }
}
