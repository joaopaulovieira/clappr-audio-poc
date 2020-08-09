import { UICorePlugin, template, version } from '@clappr/core'

import './public/media_info.scss'
import mediaInfoHTML from './public/media_info.html'

export default class MediaInfoPlugin extends UICorePlugin {
  get name() { return 'media_info' }

  get supportedVersion() { return { min: version } }

  get template() { return template(mediaInfoHTML) }

  get attributes() {
    return {
      class: 'media-info',
      'data-media-info': '',
    }
  }

  render() {
    this.$el.html(this.template())
    this.core.$el.append(this.el)
  }
}