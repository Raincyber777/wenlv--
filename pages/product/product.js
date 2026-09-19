const DEFAULT_LIST = [
  { id: 'dc', name: '青城道茶礼盒', cat: '文创茶礼', price: 128, stock: 86, sales: 342, status: 'on', emoji: '🍵', grad: 'linear-gradient(135deg,#34d399,#0d9488)', tag: '热销', desc: '精选青城山高山云雾茶，配道家文化礼盒包装，自用送礼两相宜。' },
  { id: 'sq', name: '道系书签套装', cat: '书签印章', price: 48, stock: 120, sales: 218, status: 'on', emoji: '📚', grad: 'linear-gradient(135deg,#818cf8,#2563eb)', tag: '', desc: '以青城山宫观剪影为主题的金属书签套装，一套五枚，附赠道家印章一枚。' },
  { id: 'xy', name: '青城银杏香薰', cat: '手作香道', price: 88, stock: 45, sales: 167, status: 'on', emoji: '🕯️', grad: 'linear-gradient(135deg,#fbbf24,#f59e0b)', tag: '新品', desc: '取材青城古银杏，手工调和天然精油，静心安神，一炉香满室清幽。' },
  { id: 'fy', name: '道教符印手账', cat: '道教文创', price: 38, stock: 200, sales: 95, status: 'on', emoji: '📖', grad: 'linear-gradient(135deg,#f472b6,#f43f5e)', tag: '', desc: '内页融入道家符箓与二十四节气插画，布面精装，可180°平摊书写。' },
  { id: 'yl', name: '青城幽兰茶', cat: '文创茶礼', price: 68, stock: 0, sales: 120, status: 'off', emoji: '🌿', grad: 'linear-gradient(135deg,#94a3b8,#64748b)', tag: '缺货', desc: '幽谷兰花窨制花茶，兰香入骨。目前补货中，敬请期待。' },
  { id: 'wd', name: '问道折扇', cat: '道教文创', price: 98, stock: 32, sales: 88, status: 'on', emoji: '🪭', grad: 'linear-gradient(135deg,#a78bfa,#7c3aed)', tag: '限定', desc: '玉竹扇骨宣纸扇面，正面「问道青城山」，背面手绘青城十二景，限量发售。' }
]

function loadList() {
  try {
    const cached = wx.getStorageSync('productList')
    if (cached && cached.length) return cached
  } catch (e) {}
  try { wx.setStorageSync('productList', DEFAULT_LIST) } catch (e) {}
  return DEFAULT_LIST
}

Page({
  data: {
    filters: ['全部', '道教文创', '手作香道', '文创茶礼', '书签印章'],
    activeFilter: 0,
    searchKey: '',
    list: [],
    filteredList: []
  },

  onLoad() {
    this.setData({ list: loadList() })
    this.applyFilter()
  },

  onShow() {
    this.setData({ list: loadList() })
    this.applyFilter()
  },

  applyFilter() {
    const { list, filters, activeFilter, searchKey } = this.data
    const cat = filters[activeFilter]
    const key = (searchKey || '').trim().toLowerCase()
    const filteredList = list.filter(p => {
      const catOk = cat === '全部' || p.cat === cat
      const keyOk = !key ||
        (p.name || '').toLowerCase().indexOf(key) > -1 ||
        (p.cat || '').toLowerCase().indexOf(key) > -1
      return catOk && keyOk
    })
    this.setData({ filteredList })
  },

  onSearchChange(e) {
    this.setData({ searchKey: e.detail.value })
    this.applyFilter()
  },

  onFilterTap(e) {
    this.setData({ activeFilter: Number(e.currentTarget.dataset.index) })
    this.applyFilter()
  },

  onAdd() {
    wx.navigateTo({ url: '/pages/product-edit/product-edit' })
  },

  onEdit(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({ url: '/pages/product-edit/product-edit?id=' + id })
  }
})
