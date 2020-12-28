import { ChromaImage } from './chromaimage'
import LegoColors from './legodots'

export default class CanvasPixels {
  public static drawLegoDots (ci: ChromaImage, c: CanvasRenderingContext2D, w: number, h: number) {
    c.fillStyle = '#000000'
    c.fillRect(0, 0, w, h)

    const xScale = w / (ci.width + 2) // account for frame right and left
    const yScale = h / (ci.height + 2) // account for frame top and bottom
    const xShift = xScale + xScale / 2
    const yShift = yScale + yScale / 2

    for (let x = 0; x < ci.width; x++) {
      for (let y = 0; y < ci.height; y++) {
        const chosenPaletteIdx = ci.palImage[x][y].bestMatchIndex
        c.fillStyle = LegoColors[chosenPaletteIdx].hexcolor

        // draw a filled circle
        c.beginPath()
        c.arc(x * xScale + xShift, y * yScale + yShift, xScale / 2 - 0.5, 2 * Math.PI, 0)
        c.fill()
      }
    }
  }
}
