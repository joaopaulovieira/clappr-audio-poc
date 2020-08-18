import { Events, UICorePlugin, template, version } from '@clappr/core'

import './public/media_control.scss'
import mediaControlHTML from './public/media_control.html'

export default class MediaControlPlugin extends UICorePlugin {
  get name() { return 'media_control' }

  get supportedVersion() { return { min: version } }

  get template() { return template(mediaControlHTML) }

  get container() { return this.core && this.core.activeContainer }

  get playback() { return this.core && this.core.activePlayback }

  get attributes() {
    return {
      class: 'media-control',
      'data-media-control': '',
    }
  }

  get events() {
    return {
      'click .play-pause-button[data-play-button]': 'play',
      'click .play-pause-button[data-pause-button]': 'pause',
    }
  }

  bindEvents() {
    this.stopListening()
    this.listenTo(this.core, Events.CORE_ACTIVE_CONTAINER_CHANGED, this.onActiveContainerChanged)
    this.bindContainerEvents()
  }

  bindContainerEvents() {
    if (!this.container) return
    this.listenTo(this.container, Events.CONTAINER_PLAY, this.changeTogglePlay)
    this.listenTo(this.container, Events.CONTAINER_PAUSE, this.changeTogglePlay)
  }

  onActiveContainerChanged() {
    this.bindEvents()
    this.changeTogglePlay()
    this.bindContainerEvents()
    this.trigger(Events.MEDIACONTROL_CONTAINERCHANGED)
  }

  play() {
    this.container && this.container.play()
  }

  pause() {
    this.container && this.container.pause()
  }

  changeTogglePlay() {
    this.$playPauseToggle.innerHTML = ''
    if (this.container && this.container.isPlaying()) {
      this.$playPauseToggle.style.backgroundColor = 'blue'
      this.$playPauseToggle.innerHTML = 'pause'
      this.$playPauseToggle.setAttribute('data-pause-button', '')
      this.$playPauseToggle.removeAttribute('data-play-button')
      this.trigger(Events.MEDIACONTROL_PLAYING)
    } else {
      this.$playPauseToggle.style.backgroundColor = 'green'
      this.$playPauseToggle.innerHTML = 'play'
      this.$playPauseToggle.setAttribute('data-play-button', '')
      this.$playPauseToggle.removeAttribute('data-pause-button')
      this.trigger(Events.MEDIACONTROL_NOTPLAYING)
    }
  }

  togglePlayPause() {
    this.container.isPlaying() ? this.container.pause() : this.container.play()
    return false
  }

  render() {
    this.$el.html(this.template())
    this.$buttonsContainer = this.el.querySelector('.media-control__buttons-container')
    this.$playPauseToggle = this.$buttonsContainer.querySelector('.play-pause-button')
    this.changeTogglePlay()
    this.core.$el.append(this.el)
  }
}
