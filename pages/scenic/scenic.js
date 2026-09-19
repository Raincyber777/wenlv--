const DEFAULT_LIST = [
  { id: 'jfg', name: '建福宫', zone: '前山', dist: '0m', audio: '12:30', audioTitle: '建福宫·道教宫观导览', audioUrl: '', status: 'open', open: true, emoji: '🏯', grad: 'linear-gradient(135deg,#fbbf24,#ef4444)', lat: 30.9068, lng: 103.4785, address: '青城山前山山门 · 建福宫', recommend: 5, toilet: true, toiletDesc: '山门公厕 · 无障碍卫生间', food: true, foodDesc: '道家素斋 / 盖碗茶', intro: '建福宫坐落于青城山前山山麓，始建于唐开元年间，是青城山保存最完整的道教宫观之一，宫内古柏参天，香火鼎盛。' },
  { id: 'tsd', name: '天师洞', zone: '前山', dist: '480m', audio: '08:45', audioTitle: '天师洞·张道陵传道', audioUrl: '', status: 'open', open: true, emoji: '🌲', grad: 'linear-gradient(135deg,#34d399,#0d9488)', lat: 30.9102, lng: 103.4821, address: '青城山前山半山 · 天师洞', recommend: 4.5, toilet: true, toiletDesc: '洞口东侧公厕', food: false, foodDesc: '', intro: '天师洞相传为张道陵结茅传道之所，洞内古木幽深，三岛石、洗心池等古迹俱全，为青城山道教发源地。' },
  { id: 'zsd', name: '祖师殿', zone: '前山', dist: '860m', audio: '06:20', audioTitle: '祖师殿·问道青城', audioUrl: '', status: 'open', open: true, emoji: '⛩️', grad: 'linear-gradient(135deg,#818cf8,#2563eb)', lat: 30.9145, lng: 103.4863, address: '青城山前山 · 祖师殿', recommend: 4, toilet: false, toiletDesc: '', food: false, foodDesc: '', intro: '祖师殿供奉历代祖师，殿宇依山而建，晨钟暮鼓，是游客登山途中休憩问道的重要节点。' },
  { id: 'cyd', name: '朝阳洞', zone: '前山', dist: '1.2km', audio: '05:10', audioTitle: '朝阳洞·观日出', audioUrl: '', status: 'open', open: true, emoji: '⛰️', grad: 'linear-gradient(135deg,#f472b6,#f43f5e)', lat: 30.9188, lng: 103.4901, address: '青城山前山 · 朝阳洞', recommend: 4, toilet: true, toiletDesc: '洞下50m临时公厕', food: true, foodDesc: '山间小卖部 / 热饮', intro: '朝阳洞位于半山峭壁之上，是观日出、看云海的绝佳位置，洞口视野开阔，可俯瞰成都平原。' },
  { id: 'sqg', name: '上清宫', zone: '前山', dist: '1.8km', audio: '09:30', audioTitle: '上清宫·宫观之巅', audioUrl: '', status: 'open', open: true, emoji: '🏯', grad: 'linear-gradient(135deg,#06b6d4,#0e7490)', lat: 30.9235, lng: 103.4952, address: '青城山前山高台 · 上清宫', recommend: 5, toilet: true, toiletDesc: '宫后游客服务区公厕', food: true, foodDesc: '上清斋 / 素面', intro: '上清宫地处青城第一峰前，海拔约1180米，宫内存有清代楠木雕刻等珍贵文物，香会期热闹非凡。' },
  { id: 'ljg', name: '老君阁', zone: '前山', dist: '2.1km', audio: '07:00', audioTitle: '老君阁·登顶览胜', audioUrl: '', status: 'open', open: true, emoji: '🌄', grad: 'linear-gradient(135deg,#a78bfa,#7c3aed)', lat: 30.9281, lng: 103.4998, address: '青城第一峰绝顶 · 老君阁', recommend: 5, toilet: false, toiletDesc: '', food: false, foodDesc: '', intro: '老君阁位于青城第一峰绝顶，高33米，登阁可东望成都平原、西览贡嘎雪山，是青城山标志性建筑。' },
  { id: 'fqg', name: '飞泉沟', zone: '后山', dist: '300m', audio: '04:20', audioTitle: '飞泉沟·戏水听泉', audioUrl: '', status: 'open', open: true, emoji: '💧', grad: 'linear-gradient(135deg,#22d3ee,#0891b2)', lat: 30.9352, lng: 103.5125, address: '青城山后山 · 飞泉沟', recommend: 3.5, toilet: true, toiletDesc: '沟口生态公厕', food: true, foodDesc: '农家乐 / 溪鱼', intro: '飞泉沟以清泉飞瀑著称，夏季宜戏水纳凉，两岸原始植被茂密，是后山亲水游线的起点。' },
  { id: 'wlg', name: '五龙沟', zone: '后山', dist: '680m', audio: '03:50', audioTitle: '五龙沟·幽谷探秘', audioUrl: '', status: 'maintain', open: false, emoji: '🐉', grad: 'linear-gradient(135deg,#94a3b8,#64748b)', lat: 30.9401, lng: 103.5218, address: '青城山后山 · 五龙沟', recommend: 3, toilet: false, toiletDesc: '', food: false, foodDesc: '', intro: '五龙沟古称蛮河沟，传说五龙藏于此。因栈道维护升级，目前部分路段封闭，敬请期待重新开放。' }
]

function loadList() {
  try {
    const cached = wx.getStorageSync('scenicList')
    if (cached && cached.length) return cached
  } catch (e) {}
  try { wx.setStorageSync('scenicList', DEFAULT_LIST) } catch (e) {}
  return DEFAULT_LIST
}

Page({
  data: {
    filters: ['全部', '前山', '后山'],
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
    const zone = filters[activeFilter]
    const key = (searchKey || '').trim().toLowerCase()
    const filteredList = list.filter(s => {
      const zoneOk = zone === '全部' || s.zone === zone
      const keyOk = !key ||
        (s.name || '').toLowerCase().indexOf(key) > -1 ||
        (s.address || '').toLowerCase().indexOf(key) > -1
      return zoneOk && keyOk
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
    wx.navigateTo({ url: '/pages/scenic-edit/scenic-edit' })
  },

  onEdit(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({ url: '/pages/scenic-edit/scenic-edit?id=' + id })
  }
})
