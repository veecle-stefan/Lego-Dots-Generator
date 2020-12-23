import { defineCustomElements } from '@ionic/pwa-elements/loader'

export default () => {
  defineCustomElements(window).catch(err => console.log(err))
}
