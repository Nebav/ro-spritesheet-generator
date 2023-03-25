<template>
  <div class="preview-container">
    <SelectButton
      @change="changeGender"
      v-model="spriteInfos.gender"
      :options="genders"
      option-label="label"
      option-value="value"
      style="line-height: 1px"
    />
    <div class="hairstyle-selector">
      <div class="head-btn">
        <Button icon="pi pi-arrow-circle-left" severity="help" text rounded @click="changeHeadBackward()" />
      </div>
      Select a hairstyle
      <div class="head-btn">
        <Button icon="pi pi-arrow-circle-right" severity="help" text rounded @click="changeHeadForward()" />
      </div>
    </div>
    <div class="haircolor-selector">
      <div
        class="color-square"
        v-for="palette in headPalettes"
        :key="palette.value"
        :style="`background: ${palette.color};`"
        @click="spriteInfos.headPalette = palette.value"
      ></div>
    </div>
    <div class="preview">
      <div class="direction-btn">
        <Button icon="pi pi-directions" severity="success" text rounded @click="changeDirectionForward()" />
      </div>
      <img id="spritePreview" />
      <div class="direction-btn">
        <Button icon="pi pi-directions-alt" severity="success" text rounded @click="changeDirectionBackward()" />
      </div>
    </div>
    <div style="margin-top: 50px">
      <Button severity="success" label="Generate Spritesheet" @click="generateSprite()" />
    </div>
    <div id="results-container" style="margin-top: 50px"></div>
  </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import { getSpriteInfos } from '../state/spriteInfos'

const { spriteInfos, headPalettes, generateSpriteSheet } = getSpriteInfos()

const genders = [
  { label: 'Female', value: 0 },
  { label: 'Male', value: 1 },
]

const minHead = 1
const maxHead = 42

const directionMin = 0
const directionMax = 7

function generateSprite() {
  generateSpriteSheet()
}

function changeHeadForward() {
  spriteInfos.value.head =
    spriteInfos.value.head === maxHead ? (spriteInfos.value.head = minHead) : spriteInfos.value.head + 1
}
function changeHeadBackward() {
  spriteInfos.value.head =
    spriteInfos.value.head === minHead ? (spriteInfos.value.head = maxHead) : spriteInfos.value.head - 1
}

function changeDirectionForward() {
  if (spriteInfos.value.action > 31) {
    spriteInfos.value.action =
      spriteInfos.value.action === 32 + directionMax - 1
        ? (spriteInfos.value.action = 32)
        : spriteInfos.value.action + 2
  } else {
    spriteInfos.value.action =
      spriteInfos.value.action === directionMax
        ? (spriteInfos.value.action = directionMin)
        : spriteInfos.value.action + 1
  }
}

function changeDirectionBackward() {
  if (spriteInfos.value.action > 31) {
    spriteInfos.value.action =
      spriteInfos.value.action === 32 ? (spriteInfos.value.action += directionMax - 1) : spriteInfos.value.action - 2
  } else {
    spriteInfos.value.action =
      spriteInfos.value.action === directionMin
        ? (spriteInfos.value.action = directionMax)
        : spriteInfos.value.action - 1
  }
}

function changeGender(event: any) {
  spriteInfos.value.gender = event.value
}

onMounted(() => {
  spriteInfos.value = {
    gender: 0,
    job: ['1'],
    head: 1,
    headPalette: 0,
    action: 0,
    weapon: 0,
    frame: 0,
    garment: 0,
    enableShadow: false,
  }
})
</script>
<style scoped>
.hairstyle-selector {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  margin-top: 10px;
}

.haircolor-selector {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.color-square {
  width: 20px;
  height: 20px;
  margin: 5px;
  border: solid 1px black;
  border-radius: 5px;
  cursor: pointer;
}

.head-btn {
  margin: 10px;
}

.direction-btn {
  margin: 50px;
}

.preview {
  height: 100px;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.preview img {
  transform: scale(1.5);
}

.preview-container {
  width: 100%;
  height: 55%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.results-container {
  margin-top: 50px;
  overflow: scroll;
  position: fixed;
  left: 25%;
  top: 43%;
}
</style>
