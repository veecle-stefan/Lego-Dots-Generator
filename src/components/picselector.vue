<template>
  <div class="container q-ma-md">
    <div class="fit row wrap justify-start items-start content-start">
      <div class="col-sm-10">
        <div class="fit column wrap justify-start items-start content-start">
          <div v-show="imageLoaded">
          <vue-cropper
            ref="cropper"
            :aspect-ratio="1 / 1"
            drag-mode="move"
            :src="cropperSrc"
            @crop="userCropped"
          />
        </div>
        <img v-show="!imageLoaded" src="graphics/select-board.png" style="width: 100%;" />
          <div class="col-12 userhint">
            {{ userHint }}
          </div>
        </div>
      </div>
      <div class="col-sm-2">
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
      <div class="col-sm-10">
        <canvas width="48" height="48" id="scaleddown"/>
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
  smallCanvas: CanvasRenderingContext2D | null = null
  userHint: TranslateResult = this.$t('hints.nopicyet')

  mounted () {
    const c: HTMLCanvasElement = document.getElementById('scaleddown') as HTMLCanvasElement
    this.smallCanvas = c.getContext('2d')
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
    const img = new Image()
    img.src = this.cropper.getCroppedCanvas().toDataURL()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    img.onload = _ => {
      if (this.smallCanvas) {
        this.smallCanvas.drawImage(img, 0, 0, 48, 48)
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

.userhint {
  min-width: 100%;
  color: #ffffff;
  padding: 10px;
  margin: 5px;
  background-color: rgba(128,128,128,.5);
  border-radius: 10px;
}
</style>
