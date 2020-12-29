import ChromaImage from './chromaimage'
import { Palette, LegoColors } from './legodots'

export * from './legodots'

export default class DotImage {
  private _px: number
  private _py: number
  public chromaImg: ChromaImage | null = null
  private _optCounter = 0
  private _canvas: CanvasRenderingContext2D | null
  private _palette: Palette

  public flgProportional = false

  /**
   * Creates a new DotImage object
   * @param img The HTMLImage to use (arbitrary size)
   * @param canvas The canvas to draw on
   * @param canvasW The number of horizontal pixels
   * @param canvasH The number of vertical pixels
   */
  constructor (img: HTMLImageElement, px: number, py: number) {
    this._px = px
    this._py = py
    const canvas = document.createElement('canvas')
    canvas.width = this._px
    canvas.height = this._py
    this._canvas = canvas.getContext('2d')
    this._palette = new Palette(LegoColors)

    // first, draw the original (cropped) image into the canvas in reduced resolution
    // in order to get the image data
    this.updateImage(img)
  }

  /**
   * Cancels all ongoing work and uses a new image as a basis to convert
   * @param img A new HTMLImage to use as pixel basis (resolution doesn't matter)x
   */
  public updateImage (img: HTMLImageElement) {
    if (this._canvas != null) {
      if (img) {
        this._canvas.drawImage(img, 0, 0, this._px, this._py)
      }
      const rawImageData = this._canvas.getImageData(0, 0, this._px, this._py)
      this.chromaImg = new ChromaImage(rawImageData, this._palette)
      this._optCounter = 0
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      this.optimise()
      this._palette.debuglog()
    }
  }

  private optimise () {
    this._optCounter++
    if (!this.chromaImg) return
    const [feasible, changedSomething] = this.chromaImg.optimise(this.flgProportional)
    if (feasible || (this._optCounter > 1000)) {
      console.log(`After ${this._optCounter} iterations, the result is ${feasible ? 'feasible' : 'impossible'}.`)
    } else {
      /*
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      requestAnimationFrame(_time => {
        this.optimise()
      })
      */
    }
  }
}
