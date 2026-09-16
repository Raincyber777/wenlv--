const CATS = ['道教文创', '手作香道', '文创茶礼', '书签印章']
const EMOJIS = ['🍵', '📚', '🕯️', '📖', '🌿', '🪭', '🧧', '🍶', '🪨', '🎋', '🫖', '🧘']
const GRADS = [
  { label: '翠绿', value: 'linear-gradient(135deg,#34d399,#0d9488)' },
  { label: '靛蓝', value: 'linear-gradient(135deg,#818cf8,#2563eb)' },
  { label: '鎏金', value: 'linear-gradient(135deg,#fbbf24,#f59e0b)' },
  { label: '粉红', value: 'linear-gradient(135deg,#f472b6,#f43f5e)' },
  { label: '紫韵', value: 'linear-gradient(135deg,#a78bfa,#7c3aed)' },
  { label: '墨灰', value: 'linear-gradient(135deg,#94a3b8,#64748b)' },
  { label: '青蓝', value: 'linear-gradient(135deg,#22d3ee,#0891b2)' },
  { label: '橙红', value: 'linear-gradient(135deg,#fb923c,#ef4444)' }
]
const TAGS = ['热销', '新品', '限定', '无']

function blankForm() {
  return {
    id: 'p' + Date.now(),
    name: '',
    cat: CATS[0],
    catIndex: 0,
    price: '',
    stock: '',
    sales: 0,
    emoji: '🍵',
    gradIndex: 0,
    grad: GRADS[0].value,
    tag: '无',
    on: true,
    desc: ''
  }
}

function toForm(item) {
  const catIndex = Math.max(0, CATS.indexOf(item.cat))
  let gradIndex = GRADS.findIndex(g => g.value === item.grad)
  if (gradIndex < 0) gradIndex = 0
  return {
    id: item.id || ('p' + Date.now()),
    name: item.name || '',
    cat: item.cat || CATS[0],
    catIndex,
    price: item.price !== undefined ? String(item.price) : '',
    stock: item.stock !== undefined ? String(item.stock) : '',
    sales: Number(item.sales) || 0,
    emoji: item.emoji || '🍵',
    gradIndex,
    grad: item.grad || GRADS[0].value,
    tag: item.tag || '无',
    on: item.status !== 'off',
    desc: item.desc || ''
  }
}

function getList() {
  try {
    const v = wx.getStorageSync('productList')
    if (v && v.length) return v
  } catch (e) {}
  return []
}

function saveList(list) {
  try { wx.setStorageSync('productList', list) } catch (e) {}
}

Page({
  data: {
    isEdit: false,
    editId: '',
    cats: CATS,
    emojis: EMOJIS,
    grads: GRADS,
    tags: TAGS,
    form: blankForm()
  },

  onLoad(options) {
    const id = options && options.id
    if (id) {
      const list = getList()
      const found = list.find(p => String(p.id) === String(id) || p.name === id)
      const byIndex = (!found && options.index !== undefined && list[Number(options.index)]) ? list[Number(options.index)] : null
      const target = found || byIndex
      if (target) {
        this.setData({ isEdit: true, editId: target.id || target.name, form: toForm(target) })
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

  onCatChange(e) {
    const idx = Number(e.detail.value)
    this.setData({ 'form.catIndex': idx, 'form.cat': this.data.cats[idx] })
  },

  onEmojiTap(e) {
    this.setData({ 'form.emoji': e.currentTarget.dataset.emoji })
  },

  onGradTap(e) {
    const idx = Number(e.currentTarget.dataset.index)
    this.setData({ 'form.gradIndex': idx, 'form.grad': this.data.grads[idx].value })
  },

  onTagTap(e) {
    this.setData({ 'form.tag': e.currentTarget.dataset.tag })
  },

  onSwitch(e) {
    this.setData({ 'form.on': !!e.detail.value })
  },

  onDescInput(e) {
    this.setData({ 'form.desc': e.detail.value })
  },

  onSave() {
    const f = this.data.form
    const name = (f.name || '').trim()
    const price = Number(f.price)
    const stock = Number(f.stock)
    if (!name) {
      wx.showToast({ title: '请填写商品名称', icon: 'none' })
      return
    }
    if (isNaN(price) || price < 0) {
      wx.showToast({ title: '请填写正确的售价', icon: 'none' })
      return
    }
    if (isNaN(stock) || stock < 0) {
      wx.showToast({ title: '请填写正确的库存', icon: 'none' })
      return
    }
    const list = getList()
    const record = {
      id: f.id,
      name,
      cat: f.cat,
      price: Math.round(price * 100) / 100,
      stock: Math.floor(stock),
      sales: Number(f.sales) || 0,
      emoji: f.emoji,
      grad: f.grad,
      tag: f.tag === '无' ? '' : f.tag,
      status: f.on ? 'on' : 'off',
      desc: f.desc || ''
    }
    if (this.data.isEdit) {
      const idx = list.findIndex(p => String(p.id) === String(this.data.editId) || p.name === this.data.editId)
      if (idx >= 0) list[idx] = { ...list[idx], ...record }
      else list.push(record)
    } else {
      list.unshift(record)
    }
    saveList(list)
    wx.showToast({ title: this.data.isEdit ? '保存成功' : '上架成功', icon: 'success' })
    setTimeout(() => wx.navigateBack({ delta: 1 }), 600)
  },

  onDelete() {
    if (!this.data.isEdit) return
    wx.showModal({
      title: '删除商品',
      content: `确定删除「${this.data.form.name}」吗？删除后游客端商城将不再展示。`,
      confirmColor: '#ef4444',
      success: (res) => {
        if (!res.confirm) return
        const list = getList().filter(p => String(p.id) !== String(this.data.editId) && p.name !== this.data.editId)
        saveList(list)
        wx.showToast({ title: '已删除', icon: 'success' })
        setTimeout(() => wx.navigateBack({ delta: 1 }), 600)
      }
    })
  }
})
