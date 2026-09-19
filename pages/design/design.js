const DEFAULT_FORM = {
  primaryColor: '#00a870',
  aiEnabled: true,
  weatherEnabled: true,
  title: '青城山 · 慢游指南',
  subtitle: '山水入画，清幽自在',
  aiGreeting: '嗨！我是你的青城山专属向导，关于青城山的一切都可以问我～'
}

const DEFAULT_SERVICES = [
  { id: 1, name: '找厕所', icon: '🚻', grad: 'linear-gradient(135deg,#34d399,#14b8a6)', enabled: true },
  { id: 2, name: '一键救援', icon: '🆘', grad: 'linear-gradient(135deg,#fb7185,#ef4444)', enabled: true },
  { id: 3, name: '文创商店', icon: '🛍️', grad: 'linear-gradient(135deg,#fbbf24,#f97316)', enabled: true },
  { id: 4, name: '景区地图', icon: '🗺️', grad: 'linear-gradient(135deg,#60a5fa,#2563eb)', enabled: true }
]

Page({
  data: {
    colors: [
      { value: '#00a870', name: '青城绿' },
      { value: '#008c5c', name: '深林绿' },
      { value: '#0d9488', name: '青碧色' },
      { value: '#2563eb', name: '山水蓝' },
      { value: '#d97706', name: '暖阳橙' },
      { value: '#7c3aed', name: '山雾紫' }
    ],
    form: { ...DEFAULT_FORM },
    services: DEFAULT_SERVICES.map(item => ({ ...item }))
  },

  onLoad() {
    this.loadSettings()
  },

  loadSettings() {
    try {
      const saved = wx.getStorageSync('wenlvDesignSettings')
      if (saved) {
        this.setData({
          form: { ...DEFAULT_FORM, ...(saved.form || {}) },
          services: saved.services || DEFAULT_SERVICES.map(item => ({ ...item }))
        })
      }
    } catch (e) {}
  },

  onColorTap(e) {
    this.setData({ 'form.primaryColor': e.currentTarget.dataset.color })
  },

  onSwitchChange(e) {
    const field = e.currentTarget.dataset.field
    this.setData({ [`form.${field}`]: !!e.detail.value })
  },

  onInputChange(e) {
    const field = e.currentTarget.dataset.field
    this.setData({ [`form.${field}`]: e.detail.value })
  },

  onServiceChange(e) {
    const index = Number(e.currentTarget.dataset.index)
    this.setData({ [`services[${index}].enabled`]: !!e.detail.value })
  },

  onReset() {
    wx.showModal({
      title: '恢复默认设置',
      content: '将恢复用户端首页的默认主题和文案，是否继续？',
      confirmColor: '#00a870',
      success: (res) => {
        if (!res.confirm) return
        this.setData({ form: { ...DEFAULT_FORM }, services: DEFAULT_SERVICES.map(item => ({ ...item })) })
        wx.showToast({ title: '已恢复默认', icon: 'success' })
      }
    })
  },

  onSave() {
    try {
      wx.setStorageSync('wenlvDesignSettings', { form: this.data.form, services: this.data.services })
      wx.showToast({ title: '发布成功', icon: 'success' })
    } catch (e) {
      wx.showToast({ title: '保存失败，请重试', icon: 'none' })
    }
  }
})
