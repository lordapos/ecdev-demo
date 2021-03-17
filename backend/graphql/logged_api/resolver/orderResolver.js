const validateToken = require('../../../utils/validateToken')
const Order = require('../../../models/Order')

module.exports = {
  async createOrder ({ token, shippingAddress, paymentMethod, shippingPrice, totalPrice, orderItems }) {
    try {
      const user = await validateToken(token)
      return await Order.create({
        userId: user.id,
        orderItems: JSON.stringify(orderItems),
        shippingAddress: JSON.stringify(shippingAddress),
        paymentMethod,
        paymentResult: 'Waiting for payment',
        shippingPrice,
        totalPrice
      })
    } catch (e) {
      throw new Error('Not authorized, token failed or No order items')
    }
  },

  async getOrder({ id, token }) {
    const user = await validateToken(token)
    if (!user) {
      throw new Error('Not authorized, token failed')
    }
    const order = await Order.findByPk(id)

    if (order.userId !== user.id) {
      throw new Error('You don\'t have access to this order')
    }

    return order
  },

  async updateOrderToPaid({data, id}) {
    const order = await Order.findByPk(id)

    if (order) {
      const date = new Date
      order.isPaid = true
      order.paidAt = date.getHours()+':'+ date.getMinutes() + ' ' + (date.getMonth()+1)+'/'+date.getDate()+'/'+date.getFullYear()
      const paymentResult = {
        id: data.id,
        status: data.status,
        update_time: data.update_time,
        email_address: data.email_address,
      }
      order.paymentResult = JSON.stringify(paymentResult)
      return await order.save()
    } else {
      throw new Error('Order not found')
    }
  },

  async getMyOrders({token}) {
    const user = await validateToken(token)

    if (!user) {
      throw new Error('Not authorized, token failed')
    }

    return await Order.findAll({
      where: {
        userId: user.id
      }
    })
  }
}