<template>
  <div class="container q-ma-md">
    <div class="fit row wrap justify-start items-start content-start">
      <div class="col-sm-10">
        <div class="fit column wrap justify-start items-start content-start">
          <div v-show="imageLoaded">
          <vue-cropper
            ref="cropper"
            :aspect-ratio="16 / 9"
            :src="cropperSrc"
            preview=".preview"
          />
        </div>
        <img v-show="!imageLoaded" src="graphics/select-board.png" style="width: 100%;" />
          <div class="col-12">
            {{ $t('cta.nopicyet')}}
          </div>
        </div>
      </div>
      <div class="col-sm-2">
        <div class="q-gutter-md">
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
          <q-btn v-show="imageLoaded" fab color="primary" icon="crop" />
          <q-btn v-show="imageLoaded" fab color="primary" icon="loop" />
          <q-btn v-show="imageLoaded" fab color="primary" icon="invert_colors" />
        </div>
      </div>
    </div>
    <div class="preview" />
  </div>
</template>

<script lang="ts">
/// <reference types="@types/vue-cropperjs" />
import { Vue, Component, Ref } from 'vue-property-decorator'
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core'
import VueCropper, { VueCropperMethods } from 'vue-cropperjs'
import 'cropperjs/dist/cropper.css'
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
  discardimg () {
    this.imageLoaded = false
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
</style>
