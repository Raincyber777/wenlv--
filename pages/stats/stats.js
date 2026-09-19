Page({
  data: {
    stats: [
      { icon: 'user', value: '8,432', label: '本月入园', grad: 'linear-gradient(135deg,#34d399,#14b8a6)' },
      { icon: 'wallet', value: '¥12.6w', label: '本月营收', grad: 'linear-gradient(135deg,#fbbf24,#f97316)' },
      { icon: 'notification', value: '36', label: '已发公告', grad: 'linear-gradient(135deg,#818cf8,#2563eb)' }
    ]
  },

  goBack() {
    wx.navigateBack({
      fail() {
        wx.reLaunch({ url: '/pages/mine/mine' })
      }
    })
  }
})
