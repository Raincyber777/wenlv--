Page({
  data: {
    list: [
      { title: '特种兵爬山', sub: '3小时速通青城前山', tags: ['高强度', '前山'], dist: '6.5km', dur: '3h', count: 42, grad: 'linear-gradient(135deg,#fb923c,#ef4444)' },
      { title: '带娃轻松游', sub: '亲子戏水·慢享时光', tags: ['轻松', '后山'], dist: '2.8km', dur: '2h', count: 28, grad: 'linear-gradient(135deg,#34d399,#16a34a)' },
      { title: '情侣浪漫线', sub: '月城湖·上清宫日落', tags: ['浪漫', '前山'], dist: '4.2km', dur: '2.5h', count: 18, grad: 'linear-gradient(135deg,#f472b6,#f43f5e)' },
      { title: '道教文化巡礼', sub: '天师洞·建福宫问道', tags: ['人文', '前山'], dist: '5km', dur: '4h', count: 12, grad: 'linear-gradient(135deg,#818cf8,#2563eb)' }
    ]
  },

  onAdd() {
    wx.showToast({ title: '新增路线', icon: 'none' })
  },

  onEditRoute(e) {
    const title = e.currentTarget.dataset.title
    wx.showToast({ title: '编辑 ' + title, icon: 'none' })
  },

  onViewDetail(e) {
    const title = e.currentTarget.dataset.title
    wx.showToast({ title: '查看 ' + title, icon: 'none' })
  }
})
