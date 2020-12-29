<template>
  <div>
    <canvas :width="width" :height="height" ref="canvas" class="boardpreview"/>
  </div>
</template>

<script lang="ts">
import CanvasPixels from 'src/dotimage/canvaspixels'
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { Palette as LegoPalette } from '../dotimage/legodots'

@Component
export default class Palette extends Vue {
  @Prop({ required: false, default: 100 }) readonly width!: number
  @Prop({ required: false, default: 300 }) readonly height!: number
  @Prop({ required: true }) readonly palette!: LegoPalette

  ctx : CanvasRenderingContext2D | null = null

  @Watch('palette')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onChildChanged (newVal: LegoPalette, oldVal: LegoPalette) {
    if (newVal) {
      if (!this.ctx) {
        const canvas = this.$refs.canvas as HTMLCanvasElement
        this.ctx = canvas.getContext('2d')
      }
      if (this.ctx) {
        CanvasPixels.drawPalette(newVal, this.ctx, this.width, this.height)
      } else {
        console.log('Could not create context for Palette\'s Canvas')
      }
    }
  }
}
</script>

<style lang="scss">
.boardpreview {
  border: 4px solid #333333;
}
</style>
