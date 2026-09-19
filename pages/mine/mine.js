Page({
  data: {
    showLogout: false,
    menus: [
      { icon: '👤', label: '账号信息', grad: 'linear-gradient(135deg,#34d399,#14b8a6)' },
      { icon: '🎨', label: '个性化设计', grad: 'linear-gradient(135deg,#00d598,#008c5c)' },
      { icon: '⚙️', label: '景区设置', grad: 'linear-gradient(135deg,#60a5fa,#4f46e5)' },
      { icon: '📊', label: '数据统计', grad: 'linear-gradient(135deg,#818cf8,#2563eb)' },
      { icon: '💬', label: '帮助与反馈', grad: 'linear-gradient(135deg,#fbbf24,#f97316)' },
      { icon: '🏔️', label: '关于青城山管理端', grad: 'linear-gradient(135deg,#34d399,#0d9488)' },
      { icon: '🚪', label: '退出登录', grad: 'linear-gradient(135deg,#f87171,#dc2626)' }
    ]
  },

  onMenuTap(e) {
    const label = e.currentTarget.dataset.label
    if (label === '个性化设计') {
      wx.navigateTo({ url: '/pages/design/design' })
      return
    }
    if (label === '退出登录') {
      this.setData({ showLogout: true })
      return
    }
    if (label === '数据统计') {
      wx.navigateTo({ url: '/pages/stats/stats' })
      return
    }
    wx.showToast({ title: label, icon: 'none' })
  },

  onLogoutConfirm() {
    this.setData({ showLogout: false })
    wx.showToast({ title: '已退出', icon: 'success' })
  },

  onLogoutCancel() {
    this.setData({ showLogout: false })
  }
})
