Component({
  properties: {
    current: {
      type: String,
      value: 'home'
    }
  },
  data: {
    tabs: [
      { key: 'home', label: '概览', path: '/pages/home/home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1h-2z' },
      { key: 'scenic', label: '景点', path: '/pages/scenic/scenic', icon: 'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z' },
      { key: 'product', label: '商品', path: '/pages/product/product', icon: 'M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0' },
      { key: 'notice', label: '消息', path: '/pages/notice/notice', badge: 2, icon: 'M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0' },
      { key: 'mine', label: '我的', path: '/pages/mine/mine', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' }
    ]
  },
  methods: {
    goPage(e) {
      const path = e.currentTarget.dataset.path
      wx.reLaunch({ url: path })
    }
  }
})
