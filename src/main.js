import { Player as ClapprPlayer, Loader, Styler } from '@clappr/core'
import { DEFAULT_OPTIONS } from './default_options'

import Poster from './plugins/poster/poster.js'
import MediaInfoPlugin from './plugins/media_info/media_info.js'
import MediaControlPlugin from './plugins/media_control/media_control.js'

Loader.unregisterPlayback('html5_video')

Loader.registerPlugin(Poster)
Loader.registerPlugin(MediaInfoPlugin)
Loader.registerPlugin(MediaControlPlugin)

export class Player extends ClapprPlayer {
  constructor(externalOptions = {}) {
    const playerOptions = { ...DEFAULT_OPTIONS, ...externalOptions }
    super(playerOptions)
  }

  attachTo(element) {
    this.options.customStyle && this._renderCustomStyle(element, this.options.customStyle)
    super.attachTo(element)
  }

  _renderCustomStyle(parent, customStyle) {
    const style = Styler.getStyleFor(customStyle)
    $(parent).append(style)
  }
}
