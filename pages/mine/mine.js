Page({
  data: {
    stats: [
      { value: '8,432', label: '本月入园' },
      { value: '¥12.6w', label: '本月营收' },
      { value: '36', label: '已发公告' }
    ],
    menus: [
      { icon: '👤', label: '账号信息', grad: 'linear-gradient(135deg,#34d399,#14b8a6)' },
      { icon: '⚙️', label: '景区设置', grad: 'linear-gradient(135deg,#60a5fa,#4f46e5)' },
      { icon: '📊', label: '数据统计', grad: 'linear-gradient(135deg,#818cf8,#2563eb)' },
      { icon: '💬', label: '帮助与反馈', grad: 'linear-gradient(135deg,#fbbf24,#f97316)' },
      { icon: '🏔️', label: '关于青城山管理端', grad: 'linear-gradient(135deg,#34d399,#0d9488)' },
      { icon: '🚪', label: '退出登录', grad: 'linear-gradient(135deg,#f87171,#dc2626)' }
    ]
  },

  onMenuTap(e) {
    const label = e.currentTarget.dataset.label
    if (label === '退出登录') {
      wx.showModal({
        title: '退出登录',
        content: '确定要退出当前账号吗？',
        confirmColor: '#ef4444',
        success(res) {
          if (res.confirm) {
            wx.showToast({ title: '已退出', icon: 'success' })
          }
        }
      })
      return
    }
    wx.showToast({ title: label, icon: 'none' })
  }
})
