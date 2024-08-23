# Lego Dots Pixel Art Generator

Transform every picture into Pixel art, using the [LEGO coloured round bricks](https://www.amazon.de/dp/B0813RX3R8) ("dots")
![Example](/doc/example-transform.png)

## How it works
- Takes any size input image and allows cropping it to the 1:1 quadratic ratio
- Uses the original number of bricks and their color to find an optimal assignment to represent the picture with the given number of bricks and colours
- Original colour pallette is
```Typescript
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
```

## Install the dependencies
```bash
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```

### Lint the files
```bash
npm run lint
```

### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).
