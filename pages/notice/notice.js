const DEFAULT_LIST = [
  { id: 'sd', title: '前山索道例行维护通知', type: '公告', time: '09-13 18:00', unread: true, grad: 'linear-gradient(135deg,#34d399,#14b8a6)', icon: '📢', content: '尊敬的游客：前山索道将于9月15日08:00-12:00进行例行安全检修，检修期间暂停运行，步行登山道正常开放，请合理规划游览路线。给您带来不便，敬请谅解。' },
  { id: 'zp', title: '中秋节门票优惠活动', type: '公告', time: '09-10 10:00', unread: true, grad: 'linear-gradient(135deg,#fbbf24,#f97316)', icon: '🎉', content: '中秋佳节将至，9月15日-9月17日期间，前山门票购票享8折优惠，1.2米以下儿童免票入园。活动最终解释权归景区所有。' },
  { id: 'yj', title: '景区雨具免费借用提醒', type: '系统通知', time: '09-08 07:30', unread: false, grad: 'linear-gradient(135deg,#60a5fa,#4f46e5)', icon: '💧', content: '近期山区多雨，游客可在各游客中心凭身份证免费借用雨衣雨伞，请在当日18:00前归还至任意游客中心。' },
  { id: 'ws', title: '后山五龙沟开放通知', type: '公告', time: '09-05 09:00', unread: false, grad: 'linear-gradient(135deg,#34d399,#14b8a6)', icon: '📢', content: '后山五龙沟栈道维护工程已全部完工，即日起恢复正常开放。栈道湿滑，请注意脚下安全，勿翻越护栏。' },
  { id: 'xl', title: '新路线上线推送', type: '系统通知', time: '09-03 14:00', unread: false, grad: 'linear-gradient(135deg,#a78bfa,#7c3aed)', icon: '🗺️', content: '「情侣浪漫线」路线已上线，涵盖月城湖泛舟、上清宫日落观景台等点位，欢迎在路线页面查看并收藏。' }
]

function loadList() {
  try {
    const cached = wx.getStorageSync('noticeList')
    if (cached && cached.length) return cached
  } catch (e) {}
  try { wx.setStorageSync('noticeList', DEFAULT_LIST) } catch (e) {}
  return DEFAULT_LIST
}

Page({
  data: {
    filters: ['全部', '公告', '系统通知'],
    activeFilter: 0,
    list: [],
    filteredList: []
  },

  onLoad() {
    const list = loadList()
    this.setData({ list, filteredList: list })
  },

  onShow() {
    const list = loadList()
    const filter = this.data.filters[this.data.activeFilter]
    const filteredList = filter === '全部' ? list : list.filter(n => n.type === filter)
    this.setData({ list, filteredList })
  },

  onFilterTap(e) {
    const idx = e.currentTarget.dataset.index
    const filter = this.data.filters[idx]
    const filteredList = filter === '全部' ? this.data.list : this.data.list.filter(n => n.type === filter)
    this.setData({ activeFilter: idx, filteredList })
  },

  onPublish() {
    wx.navigateTo({ url: '/pages/notice-edit/notice-edit' })
  },

  onEdit(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({ url: '/pages/notice-edit/notice-edit?id=' + id })
  }
})
