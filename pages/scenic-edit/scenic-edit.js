const ZONES = ['前山', '后山']
const EMOJIS = ['🏯', '🌲', '⛩️', '⛰️', '🌄', '💧', '🐉', '🛕', '🌸', '🍵', '🏞️', '⛲']
const GRADS = [
  { label: '橙红', value: 'linear-gradient(135deg,#fbbf24,#ef4444)' },
  { label: '翠绿', value: 'linear-gradient(135deg,#34d399,#0d9488)' },
  { label: '靛蓝', value: 'linear-gradient(135deg,#818cf8,#2563eb)' },
  { label: '粉红', value: 'linear-gradient(135deg,#f472b6,#f43f5e)' },
  { label: '青蓝', value: 'linear-gradient(135deg,#06b6d4,#0e7490)' },
  { label: '紫韵', value: 'linear-gradient(135deg,#a78bfa,#7c3aed)' },
  { label: '湖蓝', value: 'linear-gradient(135deg,#22d3ee,#0891b2)' },
  { label: '墨灰', value: 'linear-gradient(135deg,#94a3b8,#64748b)' }
]

let audioCtx = null

function blankForm() {
  return {
    id: 's' + Date.now(),
    name: '',
    zone: '前山',
    zoneIndex: 0,
    emoji: '🏯',
    gradIndex: 1,
    grad: GRADS[1].value,
    lat: 30.9102,
    lng: 103.4821,
    address: '',
    dist: '',
    recommend: 4,
    toilet: true,
    toiletDesc: '',
    food: false,
    foodDesc: '',
    audioTitle: '',
    audio: '00:00',
    audioUrl: '',
    open: true,
    intro: ''
  }
}

function toForm(item) {
  const zoneIndex = Math.max(0, ZONES.indexOf(item.zone || '前山'))
  let gradIndex = GRADS.findIndex(g => g.value === item.grad)
  if (gradIndex < 0) gradIndex = 1
  return {
    id: item.id || ('s' + Date.now()),
    name: item.name || '',
    zone: item.zone || '前山',
    zoneIndex,
    emoji: item.emoji || '🏯',
    gradIndex,
    grad: item.grad || GRADS[1].value,
    lat: Number(item.lat) || 30.9102,
    lng: Number(item.lng) || 103.4821,
    address: item.address || '',
    dist: item.dist || '',
    recommend: Number(item.recommend ?? 4),
    toilet: !!item.toilet,
    toiletDesc: item.toiletDesc || '',
    food: !!item.food,
    foodDesc: item.foodDesc || '',
    audioTitle: item.audioTitle || ((item.name || '') + '·语音导览'),
    audio: item.audio || '00:00',
    audioUrl: item.audioUrl || '',
    open: item.open !== undefined ? !!item.open : item.status !== 'maintain',
    intro: item.intro || ''
  }
}

function getList() {
  try {
    const v = wx.getStorageSync('scenicList')
    if (v && v.length) return v
  } catch (e) {}
  return []
}

function saveList(list) {
  try { wx.setStorageSync('scenicList', list) } catch (e) {}
}

Page({
  data: {
    showDelete: false,
    isEdit: false,
    editId: '',
    zones: ZONES,
    emojis: EMOJIS,
    grads: GRADS,
    form: blankForm(),
    markers: [],
    scale: 14,
    playing: false,
    audioTip: '',
    stars: [1, 2, 3, 4, 5]
  },

  onLoad(options) {
    const id = options && options.id
    if (id) {
      const list = getList()
      const found = list.find(s => String(s.id) === String(id) || s.name === id)
      // 兼容旧版本用 index 跳转
      const byIndex = (!found && options.index !== undefined && list[Number(options.index)]) ? list[Number(options.index)] : null
      const target = found || byIndex
      if (target) {
        const form = toForm(target)
        this.setData({ isEdit: true, editId: target.id || target.name, form }, () => this.refreshMarkers())
        return
      }
    }
    // 新增
    const form = blankForm()
    this.setData({ isEdit: false, form }, () => this.refreshMarkers())
  },

  onUnload() {
    this.stopAudio()
  },
  onHide() {
    this.stopAudio()
  },

  refreshMarkers() {
    const f = this.data.form
    this.setData({
      markers: [{
        id: 1,
        latitude: f.lat,
        longitude: f.lng,
        width: 32,
        height: 32,
        callout: {
          content: f.name || '景点位置',
          color: '#064e3b',
          fontSize: 12,
          bgColor: '#ffffff',
          borderRadius: 8,
          padding: 6,
          display: 'ALWAYS'
        }
      }]
    })
  },

  goBack() {
    this.stopAudio()
    wx.navigateBack({ delta: 1 })
  },

  // ---------- 通用输入 ----------
  onFieldInput(e) {
    const field = e.currentTarget.dataset.field
    this.setData({ [`form.${field}`]: e.detail.value })
    if (field === 'name') this.refreshMarkers()
  },

  onZoneChange(e) {
    const idx = Number(e.detail.value)
    this.setData({
      'form.zoneIndex': idx,
      'form.zone': this.data.zones[idx]
    })
  },

  onEmojiTap(e) {
    this.setData({ 'form.emoji': e.currentTarget.dataset.emoji })
  },

  onGradTap(e) {
    const idx = Number(e.currentTarget.dataset.index)
    this.setData({
      'form.gradIndex': idx,
      'form.grad': this.data.grads[idx].value
    })
  },

  onSwitch(e) {
    const field = e.currentTarget.dataset.field
    this.setData({ [`form.${field}`]: !!e.detail.value })
  },

  // ---------- 推荐指数 ----------
  onStarTap(e) {
    const v = Number(e.currentTarget.dataset.value)
    this.setData({ 'form.recommend': v })
  },
  onRecommendSlider(e) {
    this.setData({ 'form.recommend': Number(e.detail.value) })
  },

  // ---------- 地图 ----------
  onChooseLocation() {
    wx.chooseLocation({
      latitude: this.data.form.lat,
      longitude: this.data.form.lng,
      success: (res) => {
        this.setData({
          'form.lat': res.latitude,
          'form.lng': res.longitude,
          'form.address': res.address || res.name || this.data.form.address
        }, () => this.refreshMarkers())
      },
      fail: () => {
        wx.showToast({ title: '已取消选点', icon: 'none' })
      }
    })
  },

  onOpenLocation() {
    const f = this.data.form
    wx.openLocation({
      latitude: Number(f.lat),
      longitude: Number(f.lng),
      name: f.name || '景点位置',
      address: f.address || '青城山景区',
      scale: 15
    })
  },

  onLatLngInput(e) {
    const field = e.currentTarget.dataset.field
    const v = Number(e.detail.value)
    if (isNaN(v)) return
    this.setData({ [`form.${field}`]: v }, () => this.refreshMarkers())
  },

  // ---------- 介绍音频 ----------
  onChooseAudio() {
    wx.chooseMedia({
      count: 1,
      mediaType: ['audio'],
      success: (res) => {
        const file = res.tempFiles && res.tempFiles[0]
        if (!file) return
        this.stopAudio()
        this.setData({
          'form.audioUrl': file.tempFilePath,
          audioTip: '已选择本地音频，可点击试听'
        })
        wx.showToast({ title: '音频已选择', icon: 'success' })
      },
      fail: () => {}
    })
  },

  togglePlay() {
    const f = this.data.form
    if (this.data.playing) {
      this.stopAudio()
      return
    }
    if (!f.audioUrl) {
      wx.showToast({ title: '请先填写音频链接或选择音频', icon: 'none' })
      return
    }
    try {
      if (!audioCtx) audioCtx = wx.createInnerAudioContext()
      audioCtx.stop()
      audioCtx.src = f.audioUrl
      audioCtx.play()
      audioCtx.onPlay(() => this.setData({ playing: true }))
      audioCtx.onEnded(() => this.setData({ playing: false }))
      audioCtx.onStop(() => this.setData({ playing: false }))
      audioCtx.onError(() => {
        this.setData({ playing: false })
        wx.showToast({ title: '音频无法播放，请检查链接', icon: 'none' })
      })
      this.setData({ playing: true })
    } catch (err) {
      wx.showToast({ title: '播放失败', icon: 'none' })
    }
  },

  stopAudio() {
    try {
      if (audioCtx) audioCtx.stop()
    } catch (e) {}
    if (this.data.playing) this.setData({ playing: false })
  },

  onClearAudio() {
    this.stopAudio()
    this.setData({ 'form.audioUrl': '', audioTip: '' })
  },

  // ---------- 保存 / 删除 ----------
  onSave() {
    const f = this.data.form
    if (!f.name.trim()) {
      wx.showToast({ title: '请填写景点名称', icon: 'none' })
      return
    }
    if (!f.address.trim()) {
      wx.showToast({ title: '请填写景点地址', icon: 'none' })
      return
    }
    const list = getList()
    const record = {
      id: f.id,
      name: f.name.trim(),
      zone: f.zone,
      dist: f.dist || '0m',
      audio: f.audio || '00:00',
      audioTitle: f.audioTitle || (f.name + '·语音导览'),
      audioUrl: f.audioUrl,
      status: f.open ? 'open' : 'maintain',
      open: !!f.open,
      emoji: f.emoji,
      grad: f.grad,
      lat: Number(f.lat),
      lng: Number(f.lng),
      address: f.address,
      recommend: Number(f.recommend),
      toilet: !!f.toilet,
      toiletDesc: f.toiletDesc,
      food: !!f.food,
      foodDesc: f.foodDesc,
      intro: f.intro
    }
    if (this.data.isEdit) {
      const idx = list.findIndex(s => String(s.id) === String(this.data.editId) || s.name === this.data.editId)
      if (idx >= 0) list[idx] = { ...list[idx], ...record }
      else list.push(record)
    } else {
      list.unshift(record)
    }
    saveList(list)
    wx.showToast({ title: this.data.isEdit ? '保存成功' : '新增成功', icon: 'success' })
    setTimeout(() => wx.navigateBack({ delta: 1 }), 600)
  },

  onDelete() {
    if (!this.data.isEdit) return
    this.setData({ showDelete: true })
  },

  onConfirmDelete() {
    this.setData({ showDelete: false })
    const list = getList().filter(s => String(s.id) !== String(this.data.editId) && s.name !== this.data.editId)
    saveList(list)
    wx.showToast({ title: '已删除', icon: 'success' })
    setTimeout(() => wx.navigateBack({ delta: 1 }), 600)
  },

  onCancelDelete() {
    this.setData({ showDelete: false })
  }
})
