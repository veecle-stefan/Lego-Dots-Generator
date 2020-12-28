import { RGB, YCrCb } from './colors'

class LegoColor {
  color: YCrCb
  count: number
  hexcolor: string

  constructor (col: string, count: number) {
    this.hexcolor = col
    this.count = count
    this.color = RGB.fromHex(col).ToYCrCb()
  }
}

const LegoColors = [
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

export default LegoColors
