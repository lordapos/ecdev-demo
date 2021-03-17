const Order = require('../../../models/Order')

module.exports = {
  async getOrder ({ id }) {
    const order = await Order.findByPk(id)
    if (!order) {
      throw new Error('Order not found')
    }
    return order
  },

  async getOrders () {
    try {
      return await Order.findAll({
        order: [
          ['createdAt', 'DESC'],
        ],
      })
    } catch (e) {
      throw new Error(e)
    }
  },

  async deliverOrder ({ id }) {
    try {
      const date = new Date
      const order = await Order.findByPk(id)
      order.isDelivered = true
      order.deliveredAt = date.getHours() + ':' + date.getMinutes() + ' ' + (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear()
      return await order.save()
    } catch (e) {
      throw new Error(e)
    }
  },
}