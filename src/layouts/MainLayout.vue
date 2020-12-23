<template>
  <q-layout view="lHh lpR lFf">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left" />

       <q-toolbar-title>
          {{ $t($route.meta.name) }}
        </q-toolbar-title>
        <q-avatar>
        <img src="icons/favicon-96x96.png">
      </q-avatar>
      </q-toolbar>
    </q-header>
    <q-drawer
    v-model="left"
    side="left"
    elevated
    :mini="miniState"
    @mouseover="miniState = false"
    @mouseout="miniState = true"
    :width="200"
    :breakpoint="500"
    bordered
    content-class="bg-grey-3"
      >
        <q-scroll-area class="fit">
          <q-list padding v-for="m in menuItems" :key="m.link">
            <q-item
            clickable
            v-ripple
            active-class="my-menu-link"
            exact
            :to="m.link"
            >
              <q-item-section avatar>
                <q-icon :name="m.icon" />
              </q-item-section>

              <q-item-section>{{ $t(m.title) }}</q-item-section>
            </q-item>
            <q-separator v-if="m.seperator === true" />
          </q-list>
        </q-scroll-area>
      </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'MainLayout',
  data () {
    return {
      left: false,
      miniState: true,
      menuItems: [
        { title: 'menu.loadpicture', icon: 'add_a_photo', link: '/' },
        { title: 'menu.gallery', icon: 'photo_library', link: 'gallery', seperator: true },
        { title: 'menu.settings', icon: 'settings', link: 'settings' },
        { title: 'menu.about', icon: 'drag_indicator', link: 'about' }
      ]
    }
  }
})
</script>

<style lang="scss">
.titleimg {
  height: 150px;
}

.my-menu-link {
  color: #ffffff;
  background: $primary
}

</style>
