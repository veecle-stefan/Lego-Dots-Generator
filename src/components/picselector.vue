<template>
  <div class="container q-ma-md">
    <div class="row wrap">
      <div class="col-xs-12 col-sm-10">
        <div class="row wrap maxpicsize">
          <div class="col-12">
            <vue-cropper
              v-show="imageLoaded"
              ref="cropper"
              :aspect-ratio="$settings.boardWidth / $settings.boardHeight"
              drag-mode="move"
              :src="cropperSrc"
              @crop="userCropped"
            />
            <img v-show="!imageLoaded" id="placeholder" src="graphics/select-board.png" style="width: 100%;" />
          </div>
          <div class="col-12 userhint">
            {{ userHint }}
          </div>
        </div>
      </div>
      <div class="col-xs-12 col-sm-2">
        <div class="q-gutter-sm">
           <q-fab
            v-show="!imageLoaded"
            icon="add_a_photo"
            direction="down"
            vertical-actions-align="left"
            color="accent"
          >
            <q-fab-action @click="captureCamera()" color="primary" :label="$t('action.takephoto')" icon="add_a_photo" />
            <q-fab-action @click="capturePhotos()" color="primary" :label="$t('action.fromcameraroll')" icon="photo_library" />
          </q-fab>
          <q-btn v-show="imageLoaded" fab color="accent" icon="delete" @click="discardimg"/>
          <q-btn v-show="imageLoaded" fab color="primary" icon="zoom_in" @click="zoom(0.2)" />
          <q-btn v-show="imageLoaded" fab color="primary" icon="zoom_out" @click="zoom(-0.2)"/>
          <q-btn v-show="imageLoaded" fab color="primary" icon="rotate_left" @click="rotate(90)" />
          <q-btn v-show="imageLoaded" fab color="primary" icon="rotate_right" @click="rotate(-90)" />
        </div>
      </div>
      <div class="col-sm-12 col-md-6">
        <canvas id="outimg" :width="canvaswidth" :height="canvasheight" onclick="copyToClipboard(this)"></canvas>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
/// <reference types="@types/vue-cropperjs" />
import { Vue, Component, Ref } from 'vue-property-decorator'
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core'
import VueCropper, { VueCropperMethods } from 'vue-cropperjs'
import 'cropperjs/dist/cropper.css'
import { TranslateResult } from 'vue-i18n'
import DotImage from '../dotimage'
const { Camera } = Plugins

@Component({
  components: {
    VueCropper
  }
})
export default class PictureSelector extends Vue {
  @Ref() readonly cropper!: VueCropperMethods

  cropperSrc = ''
  imageLoaded = false
  canvas: CanvasRenderingContext2D | null = null
  canvaswidth = 500
  canvasheight = 500
  dotImg: DotImage | null = null
  userHint: TranslateResult = this.$t('hints.nopicyet')

  mounted () {
    const c = document.getElementById('outimg') as HTMLCanvasElement
    const placeholder = document.getElementById('placeholder') as HTMLImageElement
    this.canvas = c.getContext('2d')
    if (this.canvas != null) {
      this.dotImg = new DotImage(placeholder, this.canvas, this.canvaswidth, this.canvasheight, this.$settings.boardWidth, this.$settings.boardHeight)
    }
  }

  discardimg () {
    this.imageLoaded = false
    this.$t('hints.nopicyet')
  }

  rotate (deg: number) {
    this.cropper.rotate(deg)
  }

  zoom (percent: number) {
    this.cropper.relativeZoom(percent)
  }

  userCropped () {
    if (this.cropper) {
      const img = new Image()
      img.src = this.cropper.getCroppedCanvas().toDataURL()
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      img.onload = _ => {
        if (this.canvas && this.dotImg) {
          this.dotImg.updateImage(img)
        }
      }
    }
  }

  captureImage (src: CameraSource): void {
    Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      correctOrientation: true,
      saveToGallery: false,
      width: 512,
      preserveAspectRatio: true,
      source: src,
      resultType: CameraResultType.Base64
    }).then(image => {
      // image.webPath will contain a path that can be set as an image src.
      // You can access the original file using image.path, which can be
      // passed to the Filesystem API to read the raw data of the image,
      // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
      if (image.base64String) {
        this.cropperSrc = `data:image/jpeg;base64,${image.base64String}`
        this.cropper.replace(this.cropperSrc)
        this.imageLoaded = true
        this.userHint = this.$t('hints.crop')
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    }).catch(x => {
      this.$q.notify('Nothing selected.')
    })
  }

  captureCamera () {
    this.captureImage(CameraSource.Camera)
  }

  capturePhotos () {
    this.captureImage(CameraSource.Photos)
  }
}
</script>

<style lang="scss">
.boardpreview {
  width: 100%;
}

.maxpicsize {
  max-width: 500px;
}

.userhint {
  min-width: 100%;
  color: #ffffff;
  padding: 10px;
  margin: 5px;
  background-color: rgba(128,128,128,.5);
  border-radius: 10px;
}
</style>
