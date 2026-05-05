import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { FaCartShopping } from "react-icons/fa6"

export default function PurchaseHistory() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate()
  const [orders, setOrders] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true)
      await new Promise(resolve => setTimeout(resolve, 500))
      setOrders([])
      setLoading(false)
    }
    fetchOrders()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="spinner"></div>
      </div>
    )
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <FaCartShopping className="text-6xl text-richblack-600 dark:text-richblack-400" />
        <p className="text-2xl text-richblack-900 dark:text-richblack-5 font-semibold text-center">
          No Purchase History Yet
        </p>
        <p className="text-richblack-600 dark:text-richblack-400 text-center">
          Once you purchase a course, it will appear here.
        </p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 rounded-lg bg-blue-600 hover:bg-blue-700 px-6 py-3 font-medium text-white transition-colors"
        >
          Browse Courses
        </button>
      </div>
    )
  }

  return (
    <div>
      <h1 className="mb-6 text-3xl font-medium text-richblack-5 font-boogaloo">
        Purchase History
      </h1>
      <div className="rounded-xl bg-richblack-800 p-6">
        <table className="w-full">
          <thead>
            <tr className="border-b border-richblack-700">
              <th className="py-3 text-left text-sm font-semibold text-richblack-5">Course</th>
              <th className="py-3 text-left text-sm font-semibold text-richblack-5">Date</th>
              <th className="py-3 text-left text-sm font-semibold text-richblack-5">Amount</th>
              <th className="py-3 text-left text-sm font-semibold text-richblack-5">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-b border-richblack-700">
                <td className="py-4 text-richblack-5">{order.courseName}</td>
                <td className="py-4 text-richblack-400">{new Date(order.date).toLocaleDateString()}</td>
                <td className="py-4 text-richblack-400">₹{order.amount}</td>
                <td className="py-4">
                  <span className="rounded-full bg-green-600 px-3 py-1 text-xs font-medium text-white">
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
