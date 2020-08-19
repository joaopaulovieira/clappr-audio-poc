import { Events, UICorePlugin, Utils, template, version } from '@clappr/core'

import playIcon from './public/icons/play_icon.svg'
import pauseIcon from './public/icons/pause_icon.svg'
import rewindIcon from './public/icons/rewind_icon.svg'
import fastForwardIcon from './public/icons/fast_forward_icon.svg'

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
      'click .rewind-button': 'rewind',
      'click .fast-forward-button': 'fastForward',
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
    this.listenTo(this.container, Events.CONTAINER_TIMEUPDATE, this.onTimeUpdate)
  }

  onActiveContainerChanged() {
    this.bindEvents()
    this.setInitialState()
    this.bindContainerEvents()
    this.trigger(Events.MEDIACONTROL_CONTAINERCHANGED)
  }

  setInitialState() {
    this.changeTogglePlay()
  }

  play() {
    this.container && this.container.play()
  }

  pause() {
    this.container && this.container.pause()
  }

  onTimeUpdate(timeProgress) {
    this.currentPositionValue = timeProgress.current < 0 ? timeProgress.total : timeProgress.current

    if (this.currentDurationValue !== timeProgress.total) {
      this.currentDurationValue = timeProgress.total
      this.updateDuration()
    }

    this.updatePosition()
  }

  updatePosition() {
    const formattedCurrentPosition = Utils.formatTime(this.currentPositionValue)
    this.$position.innerText = formattedCurrentPosition
  }

  updateDuration() {
    const formattedTime = Utils.formatTime(this.currentDurationValue)
    this.$duration.innerText = formattedTime
  }

  rewind() {
    this.core.activePlayback && this.core.activePlayback.seek(this.core.activePlayback.getCurrentTime() - 10)
  }

  fastForward() {
    this.core.activePlayback && this.core.activePlayback.seek(this.core.activePlayback.getCurrentTime() + 10)
  }

  changeTogglePlay() {
    this.$playPauseToggle.innerHTML = ''
    if (this.container && this.container.isPlaying()) {
      this.$playPauseToggle.appendChild(pauseIcon)
      this.$playPauseToggle.setAttribute('data-pause-button', '')
      this.$playPauseToggle.removeAttribute('data-play-button')
      this.trigger(Events.MEDIACONTROL_PLAYING)
    } else {
      this.$playPauseToggle.appendChild(playIcon)
      this.$playPauseToggle.setAttribute('data-play-button', '')
      this.$playPauseToggle.removeAttribute('data-pause-button')
      this.trigger(Events.MEDIACONTROL_NOTPLAYING)
    }
  }

  togglePlayPause() {
    this.container.isPlaying() ? this.container.pause() : this.container.play()
  }

  destroy() {
    this.isRendered = false
    super.destroy()
  }

  cacheElements() {
    this.$buttonsContainer = this.el.querySelector('.media-control__buttons-container')
    this.$timersContainer = this.el.querySelector('.media-control__timers-container')

    this.$position = this.$timersContainer.querySelector('.position')
    this.$duration = this.$timersContainer.querySelector('.duration')

    this.$position.innerText = '00:00'
    this.$duration.innerText = '00:00'

    this.$playPauseToggle = this.$buttonsContainer.querySelector('.play-pause-button')
    this.$rewindButton = this.$buttonsContainer.querySelector('.rewind-button')
    this.$fasForwardButton = this.$buttonsContainer.querySelector('.fast-forward-button')

    this.$rewindButton.appendChild(rewindIcon)
    this.$fasForwardButton.appendChild(fastForwardIcon)

    this.isRendered = true
  }

  render() {
    if (this.isRendered) return

    this.$el.html(this.template())
    this.cacheElements()
    this.setInitialState()
    this.core.$el.append(this.el)
  }
}
