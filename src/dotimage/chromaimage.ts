import { RGB, YCrCb } from './colors'
import { Palette } from './legodots'

class PaletteCandidates {
  public bestMatchIndex = -1
  public bestMatchDist = 9999
  public distances: Array<number>
  public palette: Palette

  constructor (origColor: YCrCb, palette: Palette) {
    this.palette = palette
    this.distances = new Array<number>(palette.colors.length).fill(0)
    // just assign each true pixel color the distance to each LEGO color
    for (let i = 0; i < palette.colors.length; i++) {
      this.distances[i] = origColor.colorDistance(palette.colors[i].color)
    }
    this.reevaluate()
  }

  public reevaluate () {
    // go through each color again and check if the best
    // match would look different with the given bias
    this.bestMatchDist = 9999
    for (let i = 0; i < this.distances.length; i++) {
      const dist = this.distances[i] - this.palette.colors[i].bias
      if (dist < this.bestMatchDist) {
        this.bestMatchIndex = i
        this.bestMatchDist = dist
      }
    }
    // increase reference count
    this.palette.colors[this.bestMatchIndex].count++
    this.palette.total++
  }
}

class ColorPixel {
  color: YCrCb
  candidates: PaletteCandidates

  constructor (color: YCrCb, palette: Palette) {
    this.color = color
    this.candidates = new PaletteCandidates(color, palette)
  }
}

/**
 * 2D grid of pixels
 */
type Pixels = ColorPixel[][]

export default class ChromaImage {
  public readonly width: number
  public readonly height: number
  public readonly numpixels: number
  public readonly pixels: Pixels
  public readonly palette: Palette

  /**
   * Converts a raw image that has already been reduced in resolution
   * to its chroma values to work on later
   * @param rawImg raw image data (with reduced resoution)
   */
  constructor (rawImg: ImageData, palette: Palette) {
    this.width = rawImg.width
    this.height = rawImg.height
    this.numpixels = this.width * this.height
    this.palette = palette
    this.pixels = this.GetYCrCbImage(rawImg)
  }

  /**
   * Converts each pixel of ImageData into our own typed
   * YCrCb chroma image
   * @param rawImg Canvas raw image (ImageData) with correct low resolution
   */
  private GetYCrCbImage (rawImg: ImageData): Pixels {
    const res: Pixels = new Array<Array<ColorPixel>>(this.width)
    this.palette.resetcounters()

    for (let x = 0; x < this.width; x++) {
      res[x] = new Array<ColorPixel>(this.height)

      for (let y = 0; y < this.height; y++) {
        const col = this.getPixel(rawImg, x, y).ToYCrCb()
        res[x][y] = new ColorPixel(col, this.palette)
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

  public optimise (propBkg: boolean): [boolean, boolean] {
    const res = this.updateBias(propBkg)
    this.reevaluate()

    return res
  }

  private reevaluate () {
    this.palette.resetcounters()
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        this.pixels[x][y].candidates.reevaluate()
      }
    }
  }

  /**
   * Calculates new bias based on current histogram
   * @param bias The current bias (to be adjusted in-place)
   * @param propBkg Whether to account of wrong histogram proportionally or absolute
   */
  private updateBias (propBkg: boolean): [boolean, boolean] {
    const feasible = this.palette.isFeasible()
    let changedSomething = false
    for (let i = 0; i < this.palette.colors.length; i++) {
      const p = this.palette.colors[i]
      const maxPerColor = p.max
      const pShould = maxPerColor / this.numpixels
      const pIs = p.count / this.numpixels
      let err = 0.0
      if (propBkg) {
        if (pIs < pShould * 0.7) {
          err = pShould * 0.7 - pIs
          changedSomething = true
        }
        if (pIs > pShould) {
          err = pShould - pIs
          changedSomething = true
        }
      } else {
        if (p.count >= maxPerColor) {
          err = (maxPerColor - p.count) / 100
          changedSomething = true
        } else if (p.count < maxPerColor / 2) { // fill at least 50% of each color
          err = (maxPerColor / 2 - p.count) / 100
          changedSomething = true
        }
      }
      p.bias += err / (1 + p.count) / 100

      if (p.bias < -3) p.bias = -3
      if (p.bias > 3) p.bias = 3
    }

    return [feasible, changedSomething]
  }
}
