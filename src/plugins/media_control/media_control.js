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
      'click .media-control__seekbar-container': 'seek',
      'mousedown .media-control__seekbar-scrubber': 'startSeekDrag',
      'mousemove .media-control__seekbar-container': 'mousemoveOnSeekBar',
      'mouseleave .media-control__seekbar-container': 'mouseleaveOnSeekBar',
    }
  }

  constructor(core) {
    super(core)

    this.stopDragHandler = event => this.stopDrag(event)
    this.updateDragHandler = event => this.updateDrag(event)

    document.addEventListener('mouseup', this.stopDragHandler)
    document.addEventListener('mousemove', this.updateDragHandler)
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
    this.listenTo(this.container, Events.CONTAINER_PROGRESS, this.updateProgressBar)
  }

  onActiveContainerChanged() {
    this.bindEvents()
    this.setInitialState()
    this.bindContainerEvents()
    this.trigger(Events.MEDIACONTROL_CONTAINERCHANGED)
  }

  setInitialState() {
    this.changeTogglePlay()

    let previousSeekPercentage = 0
    if (this.displayedSeekBarPercentage)
      previousSeekPercentage = this.displayedSeekBarPercentage

    this.displayedSeekBarPercentage = null
    this.setSeekPercentage(previousSeekPercentage)
  }

  play() {
    this.container && this.container.play()
  }

  pause() {
    this.container && this.container.pause()
  }

  onTimeUpdate(timeProgress) {
    if (this.draggingSeekBar) return

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

    this.renderSeekBar()
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

    document.removeEventListener('mouseup', this.stopDragHandler)
    document.removeEventListener('mousemove', this.updateDragHandler)
    super.destroy()
  }

  cacheElements() {
    this.$seekBarContainer = this.el.querySelector('.media-control__seekbar-container')
    this.$seekBarHover = this.el.querySelector('.media-control__seekbar-hover')
    this.$seekBarLoaded = this.el.querySelector('.media-control__seekbar-fill-1')
    this.$seekBarPosition = this.el.querySelector('.media-control__seekbar-fill-2')
    this.$seekBarScrubber = this.el.querySelector('.media-control__seekbar-scrubber')

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
    window.setTimeout(() => this.setInitialState(), 100)
    this.core.$el.append(this.el)
  }

  mousemoveOnSeekBar(event) {
    const offsetX = event.pageX - this.$seekBarContainer.getBoundingClientRect().left - (this.$seekBarHover.style.width / 2)
    this.$seekBarHover.style.cssText = `left: ${offsetX}`
    this.trigger(Events.MEDIACONTROL_MOUSEMOVE_SEEKBAR, event)
  }

  mouseleaveOnSeekBar(event) {
    this.trigger(Events.MEDIACONTROL_MOUSELEAVE_SEEKBAR, event)
  }

  startSeekDrag(event) {
    this.draggingSeekBar = true
    this.$seekBarLoaded.classList.add('media-control--no-transition')
    this.$seekBarPosition.classList.add('media-control--no-transition')
    this.$seekBarScrubber.classList.add('media-control--no-transition')
    event && event.preventDefault()
  }

  stopDrag(event) {
    this.draggingSeekBar && this.seek(event)
    this.$seekBarLoaded.classList.remove('media-control--no-transition')
    this.$seekBarPosition.classList.remove('media-control--no-transition')
    this.$seekBarScrubber.classList.remove('media-control--no-transition')
    this.draggingSeekBar = false
    this.draggingVolumeBar = false
  }

  updateDrag(event) {
    if (!this.draggingSeekBar) return

    event.preventDefault()
    const offsetX = event.pageX - this.$seekBarContainer.getBoundingClientRect().left
    let pos = offsetX / this.$seekBarContainer.getBoundingClientRect().width * 100
    pos = Math.min(100, Math.max(pos, 0))
    this.setSeekPercentage(pos)
  }

  updateProgressBar(progress) {
    const loadedStart = progress.start / progress.total * 100
    const loadedEnd = progress.current / progress.total * 100
    this.$seekBarLoaded.style.cssText = `left: ${loadedStart}%; width: ${loadedEnd - loadedStart}%;`
  }

  renderSeekBar() {
    // this will be triggered as soon as these become available
    if (this.currentPositionValue === null || this.currentDurationValue === null) return

    // default to 100%
    this.currentSeekBarPercentage = 100

    if (this.container)
      this.currentSeekBarPercentage = (this.currentPositionValue / this.currentDurationValue) * 100

    this.setSeekPercentage(this.currentSeekBarPercentage)

    const newPosition = Utils.formatTime(this.currentPositionValue)
    const newDuration = Utils.formatTime(this.currentDurationValue)
    if (newPosition !== this.displayedPosition) {
      this.$position.innerText = newPosition
      this.displayedPosition = newPosition
    }
    if (newDuration !== this.displayedDuration) {
      this.$duration.innerText = newDuration
      this.displayedDuration = newDuration
    }
  }

  seek(event) {
    const offsetX = event.pageX - this.$seekBarContainer.getBoundingClientRect().left
    let pos = offsetX / this.$seekBarContainer.getBoundingClientRect().width * 100
    pos = Math.min(100, Math.max(pos, 0))
    this.container && this.container.seekPercentage(pos)
    this.setSeekPercentage(pos)
    return false
  }

  setSeekPercentage(value) {
    const percentageValue = Math.max(Math.min(value, 100.0), 0)
    // not changed since last update
    if (this.displayedSeekBarPercentage === percentageValue) return

    this.displayedSeekBarPercentage = percentageValue
    this.$seekBarPosition.classList.remove('media-control--no-transition')
    this.$seekBarScrubber.classList.remove('media-control--no-transition')
    this.$seekBarPosition.style.cssText = `width: ${percentageValue}%`
    this.$seekBarScrubber.style.cssText = `left: ${percentageValue}%`
  }
}
