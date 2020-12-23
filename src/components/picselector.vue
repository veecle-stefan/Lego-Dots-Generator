<template>
  <div class="container q-ma-md">
    <div class="fit row wrap justify-start items-start content-start">
      <div class="col-sm-10">
        <div class="fit column wrap justify-start items-start content-start">
          <img class="boardpreview" :src="imageSrc" />
          <div class="col-12">
            {{ $t('cta.nopicyet')}}
          </div>
        </div>
      </div>
      <div class="col-sm-2">
        <div class="q-gutter-md">
           <q-fab
           :class="clsnoimg"
            icon="add_a_photo"
            direction="down"
            vertical-actions-align="left"
            color="accent"
          >
            <q-fab-action @click="captureCamera()" color="primary" :label="$t('action.takephoto')" icon="add_a_photo" />
            <q-fab-action @click="capturePhotos()" color="primary" :label="$t('action.fromcameraroll')" icon="photo_library" />
          </q-fab>
          <q-btn :class="clswithimg" fab color="accent" icon="delete" @click="discardimg"/>
          <q-btn :class="clswithimg" fab color="primary" icon="crop" />
          <q-btn :class="clswithimg" fab color="primary" icon="loop" />
          <q-btn :class="clswithimg" fab color="primary" icon="invert_colors" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core'
const { Camera } = Plugins

export default defineComponent({
  name: 'PictureSelector',
  data () {
    const _defaultImg = 'graphics/select-board.png'
    return {
      imageLoaded: false,
      defaultImg: _defaultImg,
      imageSrc: _defaultImg
    }
  },
  computed: {
    clswithimg () {
      return this.imageLoaded ? '' : 'hidden'
    },
    clsnoimg () {
      return this.imageLoaded ? 'hidden' : ''
    }
  },
  methods: {
    discardimg () {
      this.imageLoaded = false
      this.imageSrc = this.defaultImg
    },
    captureCamera () {
      this.captureImage(CameraSource.Camera)
    },
    capturePhotos () {
      this.captureImage(CameraSource.Photos)
    },
    captureImage (src: CameraSource) {
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
          this.imageSrc = `data:image/jpeg;base64,${image.base64String}`
          this.imageLoaded = true
        }
      }).catch(reason => {
        this.$q.notify(`Nothing selected`)
      })
    }
  }
})
</script>

<style lang="scss">
.boardpreview {
  width: 100%;
}
</style>
