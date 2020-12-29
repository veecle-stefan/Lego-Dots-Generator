import ChromaImage from './chromaimage'
import { Palette } from './legodots'

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
        const chosenPaletteIdx = ci.pixels[x][y].candidates.bestMatchIndex
        c.fillStyle = ci.palette.colors[chosenPaletteIdx].hexcolor

        // draw a filled circle
        c.beginPath()
        c.arc(x * xScale + xShift, y * yScale + yShift, xScale / 2 - 0.5, 2 * Math.PI, 0)
        c.fill()
      }
    }
  }

  public static drawPalette (p: Palette, cp: CanvasRenderingContext2D, w: number, h: number) {
    const scale = h / p.colors.length
    cp.font = '15px Arial'
    cp.textBaseline = 'middle'

    // clear
    cp.fillStyle = '#dddddd'
    cp.fillRect(0, 0, w, h)

    for (let i = 0; i < p.colors.length; i++) {
      const y = scale / 2 + scale * i
      if (p.colors[i].count > p.colors[i].max) {
        // draw red background to indicate infeasability
        const err = Math.min(100, p.colors[i].count - p.colors[i].max) / 100.0
        cp.fillStyle = `rgba(255, 0, 0, ${err})`
        cp.fillRect(0, y - scale / 2, w, scale)
      }
      cp.fillStyle = p.colors[i].hexcolor
      cp.beginPath()

      cp.arc(scale / 2, y, scale / 2, 2 * Math.PI, 0)
      cp.fill()
      cp.fillText(String(p.colors[i].count), scale + 5, y)
      cp.fillText(`/${p.colors[i].max}`, w / 2, y)
    }
  }
}
