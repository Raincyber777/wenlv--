Page({
  data: {
    stats: [
      { value: '1', label: '处理中', type: 'red' },
      { value: '28', label: '本月完成', type: 'emerald' },
      { value: '4.2', label: '平均响应min', type: 'amber' }
    ],
    pending: {
      id: 'SOS-20260914-003',
      user: '王明',
      loc: '前山步道 800m',
      time: '14:15'
    },
    history: [
      { id: 'SOS-0913-002', user: '李红', loc: '后山飞泉沟', time: '昨天 16:42' },
      { id: 'SOS-0913-001', user: '赵强', loc: '前山建福宫', time: '昨天 09:20' },
      { id: 'SOS-0912-004', user: '孙丽', loc: '后山五龙沟', time: '9月12日 11:05' }
    ]
  },

  onHandleSOS() {
    wx.showModal({
      title: '立即处理',
      content: '确认开始处理此救援请求？',
      confirmColor: '#ef4444',
      success(res) {
        if (res.confirm) {
          wx.showToast({ title: '已开始处理', icon: 'success' })
        }
      }
    })
  },

  onViewLocation() {
    wx.showToast({ title: '查看位置', icon: 'none' })
  }
})
