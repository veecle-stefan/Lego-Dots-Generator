import { RGB, YCrCb } from './colors'

export class LegoColor {
  color: YCrCb
  max: number
  hexcolor: string
  count = 0
  bias = 0.0

  constructor (col: string, max: number) {
    this.hexcolor = col
    this.max = max
    this.color = RGB.fromHex(col).ToYCrCb()
  }

  public resetCount () {
    this.count = 0
  }

  /**
   * Returns whether we have enough total
   * dots (count !<= max)
   */
  public isFeasible () : boolean {
    return this.count <= this.max
  }

  public Clone () : LegoColor {
    return new LegoColor(this.hexcolor, this.max)
  }
}

/**
 * All available 15 colors in the LEGO set
 */
export const LegoColors = [
  new LegoColor('#1d1d1d', 698),
  new LegoColor('#5a5a5a', 141),
  new LegoColor('#a2a2a2', 51),
  new LegoColor('#ffffff', 149),
  new LegoColor('#111d39', 121),
  new LegoColor('#65789f', 52),
  new LegoColor('#9fcdff', 57),
  new LegoColor('#ff9007', 74),
  new LegoColor('#ffbb07', 65),
  new LegoColor('#efdb9e', 283),
  new LegoColor('#a08565', 137),
  new LegoColor('#c07e4a', 29),
  new LegoColor('#854206', 85),
  new LegoColor('#4b2b17', 250),
  new LegoColor('#332416', 554)
]

export class Palette {
  readonly colors: LegoColor[]
  total = 0

  constructor (existing: LegoColor[]) {
    // copy each existing color object
    this.colors = []
    for (let i = 0; i < existing.length; i++) {
      this.colors.push(existing[i].Clone())
    }
  }

  public resetcounters () {
    this.total = 0
    for (let p = 0; p < this.colors.length; p++) {
      this.colors[p].resetCount()
    }
  }

  public isFeasible () : boolean {
    // every single one must be feasible in order for
    // all to be feasible.
    for (let p = 0; p < this.colors.length; p++) {
      if (!this.colors[p].isFeasible()) {
        return false // cannot be fulfilled
      }
    }
    return true
  }

  public debuglog () {
    let allNums = ''
    for (let i = 0; i < this.colors.length; i++) {
      allNums += this.colors[i].bias.toFixed(2) + ', '
    }

    console.log(allNums)
  }
}
