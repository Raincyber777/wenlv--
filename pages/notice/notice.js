Page({
  data: {
    filters: ['全部', '公告', '系统通知'],
    activeFilter: 0,
    list: [
      { title: '前山索道例行维护通知', type: '公告', time: '09-13 18:00', unread: true, grad: 'linear-gradient(135deg,#34d399,#14b8a6)', icon: '📢' },
      { title: '中秋节门票优惠活动', type: '公告', time: '09-10 10:00', unread: true, grad: 'linear-gradient(135deg,#fbbf24,#f97316)', icon: '🎉' },
      { title: '景区雨具免费借用提醒', type: '系统通知', time: '09-08 07:30', unread: false, grad: 'linear-gradient(135deg,#60a5fa,#4f46e5)', icon: '💧' },
      { title: '后山五龙沟开放通知', type: '公告', time: '09-05 09:00', unread: false, grad: 'linear-gradient(135deg,#34d399,#14b8a6)', icon: '📢' },
      { title: '新路线上线推送', type: '系统通知', time: '09-03 14:00', unread: false, grad: 'linear-gradient(135deg,#a78bfa,#7c3aed)', icon: '🗺️' }
    ],
    filteredList: []
  },

  onLoad() {
    this.setData({ filteredList: this.data.list })
  },

  onFilterTap(e) {
    const idx = e.currentTarget.dataset.index
    const filter = this.data.filters[idx]
    const filteredList = filter === '全部' ? this.data.list : this.data.list.filter(n => n.type === filter)
    this.setData({ activeFilter: idx, filteredList })
  },

  onPublish() {
    wx.showToast({ title: '发布公告', icon: 'none' })
  },

  onEdit(e) {
    const title = e.currentTarget.dataset.title
    wx.showToast({ title: '编辑 ' + title, icon: 'none' })
  }
})
