const TYPES = ['公告', '系统通知']
const ICONS = ['📢', '🎉', '💧', '🗺️', '⚠️', '🔔', '🎫', '🚌', '🌧️', '📣']
const GRADS = [
  { label: '翠绿', value: 'linear-gradient(135deg,#34d399,#14b8a6)' },
  { label: '鎏金', value: 'linear-gradient(135deg,#fbbf24,#f97316)' },
  { label: '靛蓝', value: 'linear-gradient(135deg,#60a5fa,#4f46e5)' },
  { label: '紫韵', value: 'linear-gradient(135deg,#a78bfa,#7c3aed)' },
  { label: '粉红', value: 'linear-gradient(135deg,#f472b6,#f43f5e)' },
  { label: '墨灰', value: 'linear-gradient(135deg,#94a3b8,#64748b)' }
]

function pad(n) {
  return (n < 10 ? '0' : '') + n
}

function nowLabel() {
  const d = new Date()
  return pad(d.getMonth() + 1) + '-' + pad(d.getDate()) + ' ' + pad(d.getHours()) + ':' + pad(d.getMinutes())
}

function blankForm() {
  return {
    id: 'n' + Date.now(),
    title: '',
    type: TYPES[0],
    typeIndex: 0,
    icon: '📢',
    gradIndex: 0,
    grad: GRADS[0].value,
    time: nowLabel(),
    unread: true,
    push: false,
    content: ''
  }
}

function toForm(item) {
  const typeIndex = Math.max(0, TYPES.indexOf(item.type))
  let gradIndex = GRADS.findIndex(g => g.value === item.grad)
  if (gradIndex < 0) gradIndex = 0
  return {
    id: item.id || ('n' + Date.now()),
    title: item.title || '',
    type: item.type || TYPES[0],
    typeIndex,
    icon: item.icon || '📢',
    gradIndex,
    grad: item.grad || GRADS[0].value,
    time: item.time || nowLabel(),
    unread: !!item.unread,
    push: false,
    content: item.content || ''
  }
}

function getList() {
  try {
    const v = wx.getStorageSync('noticeList')
    if (v && v.length) return v
  } catch (e) {}
  return []
}

function saveList(list) {
  try { wx.setStorageSync('noticeList', list) } catch (e) {}
}

Page({
  data: {
    isEdit: false,
    editId: '',
    types: TYPES,
    icons: ICONS,
    grads: GRADS,
    form: blankForm()
  },

  onLoad(options) {
    const id = options && options.id
    if (id) {
      const list = getList()
      const found = list.find(n => String(n.id) === String(id) || n.title === id)
      const byIndex = (!found && options.index !== undefined && list[Number(options.index)]) ? list[Number(options.index)] : null
      const target = found || byIndex
      if (target) {
        this.setData({ isEdit: true, editId: target.id || target.title, form: toForm(target) })
        return
      }
    }
    this.setData({ isEdit: false, form: blankForm() })
  },

  goBack() {
    wx.navigateBack({ delta: 1 })
  },

  onFieldInput(e) {
    const field = e.currentTarget.dataset.field
    this.setData({ [`form.${field}`]: e.detail.value })
  },

  onTypeChange(e) {
    const idx = Number(e.detail.value)
    this.setData({ 'form.typeIndex': idx, 'form.type': this.data.types[idx] })
  },

  onIconTap(e) {
    this.setData({ 'form.icon': e.currentTarget.dataset.icon })
  },

  onGradTap(e) {
    const idx = Number(e.currentTarget.dataset.index)
    this.setData({ 'form.gradIndex': idx, 'form.grad': this.data.grads[idx].value })
  },

  onSwitch(e) {
    const field = e.currentTarget.dataset.field
    this.setData({ [`form.${field}`]: !!e.detail.value })
  },

  onSave() {
    const f = this.data.form
    const title = (f.title || '').trim()
    if (!title) {
      wx.showToast({ title: '请填写消息标题', icon: 'none' })
      return
    }
    const list = getList()
    const record = {
      id: f.id,
      title,
      type: f.type,
      time: f.time || nowLabel(),
      unread: !!f.unread,
      icon: f.icon,
      grad: f.grad,
      content: f.content || ''
    }
    if (this.data.isEdit) {
      const idx = list.findIndex(n => String(n.id) === String(this.data.editId) || n.title === this.data.editId)
      if (idx >= 0) list[idx] = { ...list[idx], ...record }
      else list.push(record)
    } else {
      list.unshift(record)
    }
    saveList(list)
    wx.showToast({ title: f.push ? '已发布并推送' : (this.data.isEdit ? '保存成功' : '发布成功'), icon: 'success' })
    setTimeout(() => wx.navigateBack({ delta: 1 }), 600)
  },

  onDelete() {
    if (!this.data.isEdit) return
    wx.showModal({
      title: '删除消息',
      content: `确定删除「${this.data.form.title}」吗？游客端将同步撤回该消息。`,
      confirmColor: '#ef4444',
      success: (res) => {
        if (!res.confirm) return
        const list = getList().filter(n => String(n.id) !== String(this.data.editId) && n.title !== this.data.editId)
        saveList(list)
        wx.showToast({ title: '已删除', icon: 'success' })
        setTimeout(() => wx.navigateBack({ delta: 1 }), 600)
      }
    })
  }
})
