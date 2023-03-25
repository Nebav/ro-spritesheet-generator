/* eslint-disable */
import axios from 'axios'
import parseAPNG, { APNG } from 'apng-js'

import { ref, watch } from 'vue'

import { getActions } from '../../../shared/actions'
import { Weapons } from '../../../shared/weapons'

axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'
const baseUrl = 'http://localhost:11011/render?downloadimage'

function loadImage(src: any) {
  const img = document.getElementById('spritePreview') as HTMLImageElement
  img.src = src
}
function _arrayBufferToBase64(buffer: ArrayBuffer) {
  var binary = ''
  var bytes = new Uint8Array(buffer)
  var len = bytes.byteLength
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return `data:image/png;base64,${window.btoa(binary)}`
}

const headPalettes = [
  { color: '#E97E7A', value: 0 },
  { color: '#FDE3B2', value: 1 },
  { color: '#987E90', value: 2 },
  { color: '#C3907A', value: 3 },
  { color: '#8BB18C', value: 4 },
  { color: '#958CAB', value: 5 },
  { color: '#C0ACA4', value: 6 },
  { color: '#99726F', value: 7 },
  { color: '#D16A6C', value: 8 },
]

type SpriteInfos = {
  gender: number
  job: Array<string>
  head: number
  headPalette: number
  action: number
  weapon: number
  frame?: number
  garment: number
  enableShadow: boolean
}

const spriteInfos = ref(<SpriteInfos>{
  gender: 0,
  job: ['1'],
  head: 1,
  headPalette: 1,
  action: 0,
  weapon: 0,
  frame: 0,
  garment: 0,
  enableShadow: false,
})

const spritePreview = ref()

const sprites: any = {
  IDLE: [],
  WALK: [],
  SIT: [],
  PICKUP: [],
  COMBAT_IDLE: [],
  COMBAT_HIT: [],
  COMBAT_FALL: [],
  COMBAT_DEATH: [],
  CAST: [],
  COMBAT_ATTACK: [],
}

let actions: any

// TODO NOT WORKING AT ALL
async function generateSpriteSheet() {
  let spriteInfosCopy = { ...spriteInfos.value }

  actions = getActions(Weapons.find((weapon) => spriteInfosCopy.weapon === weapon.value)!.type)
  console.log('Will generate sprites for :: ', spriteInfosCopy)
  console.log('Compared to :: ', spriteInfos.value)
  await Promise.all(
    actions.map(async (action: any) => {
      if (action.animated) {
        delete spriteInfosCopy.frame
      } else {
        spriteInfosCopy.frame = 0
      }

      await Promise.all(
        action.actionsList.map(async (currentAction: any) => {
          spriteInfosCopy.action = currentAction
          sprites[action.name].push(await (await getImage(spriteInfosCopy)).data)
        })
      )
    })
  )
  await doSpriteSheets()
}

let spritesToDraw: any = []

async function doSpriteSheetForAction(action: string) {
  const canvas = document.createElement('canvas')
  document.getElementById('results-container')!.appendChild(canvas)
  const context = canvas.getContext('2d')
  const imgSize = parseAPNG(sprites[action][0]) as APNG
  await imgSize.createImages()
  canvas.width = imgSize.width * imgSize.frames.length
  canvas.height = imgSize.height * 8
  console.log('Generating spritesheet for action: ', action)
  await Promise.all(
    await Promise.all(
      sprites[action].map(async (currentImage: ArrayBuffer, index: number) => {
        const apng = parseAPNG(currentImage) as APNG
        await apng.createImages()
        const frames = apng.frames
        console.log('Generating Direction : ', index)
        frames.map((frame: any, i: number) => {
          const positionToDraw = { x: apng.width * i, y: apng.height * index }
          console.log('Position to draw image :: ', positionToDraw, 'to : ', canvas)
          context!.drawImage(frame.imageElement, positionToDraw.x, positionToDraw.y)
        })
      })
    )
  )
}

async function doSpriteSheets() {
  console.log('Generating spritesheets...')
  console.log(sprites)
  const spritesKeys = Object.keys(sprites)
  for (let i = 0; i < spritesKeys.length; i++) {
    const act = actions.find((ac: any) => ac.name === spritesKeys[i])
    if (act.animated) {
      await doSpriteSheetForAction(spritesKeys[i])
    }
  }
}

async function getImage(data: SpriteInfos) {
  return await axios.post(baseUrl, data, { responseType: 'arraybuffer' })
}

watch(
  () => spriteInfos,
  async () => {
    // do the request
    let imgResponse = getImage(spriteInfos.value)
    loadImage(_arrayBufferToBase64((await imgResponse).data))
  },
  { deep: true }
)

export function getSpriteInfos() {
  return { spriteInfos, spritePreview, headPalettes, generateSpriteSheet }
}
