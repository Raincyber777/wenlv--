Page({
  data: {
    filters: ['全部', '道教文创', '手作香道', '文创茶礼', '书签印章'],
    activeFilter: 0,
    list: [
      { name: '青城道茶礼盒', cat: '文创茶礼', price: 128, stock: 86, sales: 342, status: 'on', emoji: '🍵', grad: 'linear-gradient(135deg,#34d399,#0d9488)', tag: '热销' },
      { name: '道系书签套装', cat: '书签印章', price: 48, stock: 120, sales: 218, status: 'on', emoji: '📚', grad: 'linear-gradient(135deg,#818cf8,#2563eb)', tag: '' },
      { name: '青城银杏香薰', cat: '手作香道', price: 88, stock: 45, sales: 167, status: 'on', emoji: '🕯️', grad: 'linear-gradient(135deg,#fbbf24,#f59e0b)', tag: '新品' },
      { name: '道教符印手账', cat: '道教文创', price: 38, stock: 200, sales: 95, status: 'on', emoji: '📖', grad: 'linear-gradient(135deg,#f472b6,#f43f5e)', tag: '' },
      { name: '青城幽兰茶', cat: '文创茶礼', price: 68, stock: 0, sales: 120, status: 'off', emoji: '🌿', grad: 'linear-gradient(135deg,#94a3b8,#64748b)', tag: '缺货' },
      { name: '问道折扇', cat: '道教文创', price: 98, stock: 32, sales: 88, status: 'on', emoji: '🪭', grad: 'linear-gradient(135deg,#a78bfa,#7c3aed)', tag: '限定' }
    ],
    filteredList: []
  },

  onLoad() {
    this.setData({ filteredList: this.data.list })
  },

  onFilterTap(e) {
    const idx = e.currentTarget.dataset.index
    const filter = this.data.filters[idx]
    const filteredList = filter === '全部' ? this.data.list : this.data.list.filter(p => p.cat === filter)
    this.setData({ activeFilter: idx, filteredList })
  },

  onAdd() {
    wx.showToast({ title: '新增商品', icon: 'none' })
  },

  onEdit(e) {
    const name = e.currentTarget.dataset.name
    wx.showToast({ title: '编辑 ' + name, icon: 'none' })
  }
})
