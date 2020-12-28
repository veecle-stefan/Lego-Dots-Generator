import { ChromaImage } from './chromaimage'
import CanvasPixels from './canvaspixels'

export * from './legodots'

export default class DotImage {
  private _rawImageData: ImageData | null = null
  private _canvas: CanvasRenderingContext2D
  private _canvasW: number
  private _canvasH: number
  private _px: number
  private _py: number
  private _chromaImg: ChromaImage | null = null

  /**
   * Creates a new DotImage object
   * @param img The HTMLImage to use (arbitrary size)
   * @param canvas The canvas to draw on
   * @param canvasW The number of horizontal pixels
   * @param canvasH The number of vertical pixels
   */
  constructor (img: HTMLImageElement, canvas: CanvasRenderingContext2D, canvasW: number, canvasH:number, px: number, py: number) {
    this._canvas = canvas
    this._canvasW = canvasW
    this._canvasH = canvasH
    this._px = px
    this._py = py
    // first, draw the original (cropped) image into the canvas in reduced resolution
    // in order to get the image data
    this.updateImage(img)
  }

  /**
   * Cancels all ongoing work and uses a new image as a basis to convert
   * @param img A new HTMLImage to use as pixel basis (resolution doesn't matter)
   */
  public updateImage (img: HTMLImageElement) {
    this._canvas.drawImage(img, 0, 0, this._px, this._py)
    this._rawImageData = this._canvas.getImageData(0, 0, this._px, this._py)
    this._chromaImg = new ChromaImage(this._rawImageData)
    CanvasPixels.drawLegoDots(this._chromaImg, this._canvas, this._canvasW, this._canvasH)
  }
}
