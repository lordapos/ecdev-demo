import * as React from "react"
import AdminLayout from '../../components/Layout/AdminLayout'
import board from '../../images/board.jpg'

// markup
const IndexPage = () => {
  return (
    <AdminLayout>
      <img className='board-image' src={board} alt="board"/>
    </AdminLayout>
  )
}

export default IndexPage
