export class RGB {
  R: number
  G: number
  B: number

  static m1 = [
    [0.299, 0.587, 0.114],
    [-0.168736, -0.331264, 0.5],
    [0.5, -0.418688, -0.081312]
  ]

  constructor (r: number, g: number, b: number) {
    this.R = r
    this.G = g
    this.B = b
  }

  public static fromHex (hex: string): RGB {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    let r = 0, g = 0, b = 0
    if (result) {
      r = parseInt(result[1], 16)
      g = parseInt(result[2], 16)
      b = parseInt(result[3], 16)
    }
    return new RGB(r, g, b)
  }

  /**
   * Converts RGB values (0..255) into normalised YCrCb values (0..1)
   * @param rgb RGB value (0..255)
   */
  public ToYCrCb () {
    const Y = RGB.m1[0][0] * this.R + RGB.m1[0][1] * this.G + RGB.m1[0][2] * this.B
    const Cr = RGB.m1[1][0] * this.R + RGB.m1[1][1] * this.G + RGB.m1[1][2] * this.B
    const Cb = RGB.m1[2][0] * this.R + RGB.m1[2][1] * this.G + RGB.m1[2][2] * this.B

    return new YCrCb(Y / 255, Cr / 255 + 0.5, Cb / 255 + 0.5)
  }
}

export class YCrCb {
  Y: number
  Cr: number
  Cb: number

  static m2 = [
    [0.97087, -0.05161, 1.402],
    [0.97087, -0.39575, -0.71414],
    [0.97087, 1.72039, 0]
  ]

  constructor (y: number, r: number, b: number) {
    this.Y = y
    this.Cr = r
    this.Cb = b
  }

  /**
   * Converts this YCrCb representation to RGB in (0..255)
   */
  public ToRGB () {
    const r = YCrCb.m2[0][0] * (this.Y * 255) + YCrCb.m2[0][1] * (this.Cr * 255 - 128) + YCrCb.m2[0][2] * (this.Cb * 255 - 128)
    const g = YCrCb.m2[1][0] * (this.Y * 255) + YCrCb.m2[1][1] * (this.Cr * 255 - 128) + YCrCb.m2[1][2] * (this.Cb * 255 - 128)
    const b = YCrCb.m2[2][0] * (this.Y * 255) + YCrCb.m2[2][1] * (this.Cr * 255 - 128) + YCrCb.m2[2][2] * (this.Cb * 255 - 128)

    return [r, g, b]
  }

  /**
   * Calculates the distance to another color in the YCrCb spectrum
   * @param chr2 Another color to compare to
   */
  public colorDistance (chr2: YCrCb): number {
    const distY = Math.abs(this.Y - chr2.Y)
    const distCr = Math.abs(this.Cr - chr2.Cr)
    const distCb = Math.abs(this.Cb - chr2.Cb)

    // value makes the greatest imact, then hue, than saturation
    return distY * distY + distCr * distCr + distCb * distCb
  }
}
