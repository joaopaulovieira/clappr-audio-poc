import { Player as ClapprPlayer, Loader } from '@clappr/core'

Loader.unregisterPlayback('html5_video')

export class Player extends ClapprPlayer {}
