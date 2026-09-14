Page({
  data: {
    filters: ['全部', '前山', '后山'],
    activeFilter: 0,
    list: [
      { name: '建福宫', zone: '前山', dist: '0m', audio: '12:30', status: 'open', emoji: '🏯', grad: 'linear-gradient(135deg,#fbbf24,#ef4444)' },
      { name: '天师洞', zone: '前山', dist: '480m', audio: '08:45', status: 'open', emoji: '🌲', grad: 'linear-gradient(135deg,#34d399,#0d9488)' },
      { name: '祖师殿', zone: '前山', dist: '860m', audio: '06:20', status: 'open', emoji: '⛩️', grad: 'linear-gradient(135deg,#818cf8,#2563eb)' },
      { name: '朝阳洞', zone: '前山', dist: '1.2km', audio: '05:10', status: 'open', emoji: '⛰️', grad: 'linear-gradient(135deg,#f472b6,#f43f5e)' },
      { name: '上清宫', zone: '前山', dist: '1.8km', audio: '09:30', status: 'open', emoji: '🏯', grad: 'linear-gradient(135deg,#06b6d4,#0e7490)' },
      { name: '老君阁', zone: '前山', dist: '2.1km', audio: '07:00', status: 'open', emoji: '🌄', grad: 'linear-gradient(135deg,#a78bfa,#7c3aed)' },
      { name: '飞泉沟', zone: '后山', dist: '300m', audio: '04:20', status: 'open', emoji: '💧', grad: 'linear-gradient(135deg,#22d3ee,#0891b2)' },
      { name: '五龙沟', zone: '后山', dist: '680m', audio: '03:50', status: 'maintain', emoji: '🐉', grad: 'linear-gradient(135deg,#94a3b8,#64748b)' }
    ],
    filteredList: []
  },

  onLoad() {
    this.setData({ filteredList: this.data.list })
  },

  onFilterTap(e) {
    const idx = e.currentTarget.dataset.index
    const filter = this.data.filters[idx]
    const filteredList = filter === '全部' ? this.data.list : this.data.list.filter(s => s.zone === filter)
    this.setData({ activeFilter: idx, filteredList })
  },

  onAdd() {
    wx.showToast({ title: '新增景点', icon: 'none' })
  },

  onEdit(e) {
    const name = e.currentTarget.dataset.name
    wx.showToast({ title: '编辑 ' + name, icon: 'none' })
  }
})
