<template>
  <div class="sidebar">
    <div class="spritecontrol-item">
      <Accordion :activeIndex="0">
        <AccordionTab header="Select a Job">
          <Listbox
            v-model="spriteInfos.job"
            :options="Jobs"
            option-label="name"
            option-value="value"
            filter
            class="w-full md:w-14rem"
            @change="changeJob"
            :virtualScrollerOptions="{ itemSize: 38 }"
            listStyle="height:500px"
          />
        </AccordionTab>
        <AccordionTab header="Select a Weapon (optional)">
          <Listbox
            v-model="spriteInfos.weapon"
            :options="Weapons"
            option-label="name"
            option-value="value"
            filter
            class="w-full md:w-14rem"
            @change="changeWeapon"
            :virtualScrollerOptions="{ itemSize: 38 }"
            listStyle="height:500px;"
            style="text-align: center"
          />
        </AccordionTab>
        <AccordionTab header="Select a Garment (optional)">
          <Listbox
            v-model="spriteInfos.garment"
            :options="Garments"
            option-label="name"
            option-value="value"
            filter
            class="w-full md:w-14rem"
            @change="changeGarment"
            :virtualScrollerOptions="{ itemSize: 38 }"
            listStyle="height:500px;"
            style="text-align: center"
          />
        </AccordionTab>
      </Accordion>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { Jobs } from '../../../shared/jobs'
import { Weapons } from '../../../shared/weapons'
import { Garments } from '../../../shared/garments'
import { getSpriteInfos } from '../state/spriteInfos'

const { spriteInfos } = getSpriteInfos()

const weapons = ref()

function changeJob(event: any) {
  spriteInfos.value.job = [event.value]
}

function changeWeapon(event: any) {
  spriteInfos.value.weapon = event.value
  if (event.value > 0) {
    spriteInfos.value.action = 32
    delete spriteInfos.value.frame
  } else {
    spriteInfos.value.action = 0
    spriteInfos.value.frame = 0
  }
}

function changeGarment(event: any) {
  spriteInfos.value.garment = event.value
}
</script>
<style scoped>
.sidebar {
  position: fixed;
  padding: 2rem;
  width: 25%;
  height: 100%;
  background-color: white;
  box-shadow: 4px 0px 15px -7px #000000;
}
.spritecontrol-item {
  margin-top: 1rem;
}

.head-selector {
  position: fixed;
}
</style>
<style>
.p-virtualscroller {
  text-align: left;
}
</style>
