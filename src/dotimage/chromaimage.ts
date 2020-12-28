import { RGB, YCrCb } from './colors'
import LegoDots from './legodots'

class PaletteCandidates {
  public bestMatchIndex = -1
  public bestMatchDist = 9999
  public distances = [] as Array<number>

  constructor (origColor: YCrCb) {
    for (let i = 0; i < LegoDots.length; i++) {
      const dist = origColor.colorDistance(LegoDots[i].color)
      this.distances.push(dist)
      if (dist < this.bestMatchDist) {
        this.bestMatchIndex = i
        this.bestMatchDist = dist
      }
    }
  }
}

type YCrCbImage = Array<Array<YCrCb>>
type PalImage = Array<Array<PaletteCandidates>>

export class ChromaImage {
  public readonly width: number
  public readonly height: number
  private _YCrCbValues: YCrCbImage
  public readonly palImage: PalImage

  /**
   * Converts a raw image that has already been reduced in resolution
   * to its chroma values to work on later
   * @param rawImg raw image data (with reduced resoution)
   */
  constructor (rawImg: ImageData) {
    this.width = rawImg.width
    this.height = rawImg.height
    this._YCrCbValues = this.GetYCrCbImage(rawImg)
    this.palImage = this.AssignPaletteCandidates(this._YCrCbValues)
  }

  private AssignPaletteCandidates (cImg: YCrCbImage): PalImage {
    const res: PalImage = new Array<Array<PaletteCandidates>>(this.width)

    for (let x = 0; x < this.width; x++) {
      res[x] = new Array<PaletteCandidates>(this.height)

      for (let y = 0; y < this.height; y++) {
        res[x][y] = new PaletteCandidates(cImg[x][y])
      }
    }
    return res
  }

  /**
   * Converts each pixel of ImageData into our own typed
   * YCrCb chroma image
   * @param rawImg Canvas raw image (ImageData) with correct low resolution
   */
  private GetYCrCbImage (rawImg: ImageData): YCrCbImage {
    const res: YCrCbImage = new Array<Array<YCrCb>>(this.width)

    for (let x = 0; x < this.width; x++) {
      res[x] = new Array<YCrCb>(this.height)

      for (let y = 0; y < this.height; y++) {
        const rgb = this.getPixel(rawImg, x, y)
        res[x][y] = rgb.ToYCrCb()
      }
    }

    return res
  }

  /**
   * Returns the RGB pixel value at a given position
   * @param rawImg The raw image to get pixel from
   * @param x vertical position
   * @param y horizontal position
   */
  private getPixel (rawImg: ImageData, x: number, y: number): RGB {
    const index = (rawImg.width * y + x) * 4
    return new RGB(rawImg.data[index], rawImg.data[index + 1], rawImg.data[index + 2])
  }
}
