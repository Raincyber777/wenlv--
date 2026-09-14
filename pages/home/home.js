Page({
  data: {
    stats: [
      { label: '今日入园', value: '1,247', icon: 'user', iconBg: 'rgba(16,185,129,0.3)', iconColor: '#6ee7b7', trend: '+12.5%', trendUp: true, trendColor: '#6ee7b7' },
      { label: '今日营收', value: '¥86,320', icon: 'money', iconBg: 'rgba(245,158,11,0.3)', iconColor: '#fcd34d', trend: '+8.3%', trendUp: true, trendColor: '#6ee7b7' },
      { label: '文创订单', value: '328', icon: 'bag', iconBg: 'rgba(59,130,246,0.3)', iconColor: '#93c5fd', trend: '-2.1%', trendUp: false, trendColor: '#fca5a5' },
      { label: '救援呼叫', value: '3', sub: '1 处理中', subPulse: true, icon: 'sos', iconBg: 'rgba(239,68,68,0.3)', iconColor: '#fca5a5', note: '需关注', noteColor: '#fcd34d' }
    ],
    trendBars: [
      { day: '周六', height: '55', grad: 'from-emerald-200 to-emerald-100', isToday: false },
      { day: '周日', height: '72', grad: 'from-emerald-300 to-emerald-200', isToday: false },
      { day: '周一', height: '45', grad: 'from-emerald-200 to-emerald-100', isToday: false },
      { day: '周二', height: '40', grad: 'from-emerald-200 to-emerald-100', isToday: false },
      { day: '周三', height: '60', grad: 'from-emerald-300 to-emerald-200', isToday: false },
      { day: '周四', height: '85', grad: 'from-emerald-400 to-emerald-300', isToday: false },
      { day: '今日', height: '92', grad: 'from-emerald-500 to-emerald-400', isToday: true }
    ],
    feed: [
      { time: '14:32', color: 'from-emerald-400 to-emerald-500', text: '张道然 完成文创订单 青城道茶礼盒', icon: '🛒' },
      { time: '14:28', color: 'from-amber-400 to-amber-500', text: 'AI 小青回答了 12 个用户提问', icon: '🤖' },
      { time: '14:15', color: 'from-red-400 to-red-500', text: '收到救援呼叫! 位置: 前山步道 800m', icon: '🆘' },
      { time: '14:02', color: 'from-blue-400 to-blue-500', text: '新增 28 人入园，当前在园 1,247 人', icon: '👥' },
      { time: '13:50', color: 'from-emerald-400 to-teal-500', text: '李清风 领取了 10 元新人优惠券', icon: '🎫' },
      { time: '13:30', color: 'from-purple-400 to-purple-500', text: '路线「带娃轻松游」被 15 位用户选择', icon: '🗺️' }
    ]
  }
})
