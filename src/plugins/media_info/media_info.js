import { UICorePlugin, template, version } from '@clappr/core'

import './public/media_info.scss'
import mediaInfoHTML from './public/media_info.html'

export default class MediaInfoPlugin extends UICorePlugin {
  get name() { return 'media_info' }

  get supportedVersion() { return { min: version } }

  get template() { return template(mediaInfoHTML) }

  get mediaInfoHTMLData() { return { header: this.header, title: this.title, product: this.productName, dateString: this.dateTime } }

  get defaultDate() {
    if (!this._defaultDate) {
      const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' }
      const dateTimeFormat = new Intl.DateTimeFormat('pt-BR', options)
      this._defaultDate = `${dateTimeFormat.format(new Date())}`
    }
    return this._defaultDate
  }

  get attributes() {
    return {
      class: 'media-info',
      'data-media-info': '',
    }
  }

  constructor(core) {
    super(core)
    this.header = this.options.mediaInfo && this.options.mediaInfo.header || 'default header'
    this.title = this.options.mediaInfo && this.options.mediaInfo.title || 'default title'
    this.productName = this.options.mediaInfo && this.options.mediaInfo.productName || 'default product name'
    this.productColor = this.options.mediaInfo && this.options.mediaInfo.productColor || '#000'
    this.dateTime = this.options.mediaInfo && this.options.mediaInfo.dateTime || this.defaultDate

    this.render()
  }

  render() {
    this.$el.html(this.template(this.mediaInfoHTMLData))
    this.el.querySelector('.media-info__header').style.color = this.productColor
    this.core.$el.append(this.el)
  }
}
