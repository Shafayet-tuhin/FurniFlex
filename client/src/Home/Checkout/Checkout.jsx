import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../Context/AuthProvider'

const Checkout = () => {
  const [data, setData] = useState([])
  const { user } = useContext(AuthContext)

  useEffect(() => {
    if (user?.email) {
      fetch(`https://furniflex-blush.vercel.app/payment?email=${user.email}`)
        .then(res => res.json())
        .then(data => {
          setData(data)
        })
    }
  }, [user?.email])

  return (
    <div className="overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Payment History</h2>
      <table className="table w-full">
        <thead>
          <tr>
            <th>ID</th>
            <th>Product Image</th>
            <th>Product Name</th>
            <th>Purchase Date</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {data.map((purchase , index) => (
            <tr key={purchase._id}>
              <td className='text-xl font-abc'>{index + 1 }</td>
              <td>
                <div className="flex flex-col items-center gap-3">
                  {purchase.images.map((image, index) => (
                    <div key={index} className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={image}
                          alt={`Product ${index + 1}`} 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </td>
              <td>
                {purchase.products.map((product, index) => (
                  <div key={index}>
                    {product}
                    {index < purchase.products.length - 1 && <br />} 
                  </div>
                ))}
              </td>
              <td>
                {new Date(purchase.Date).toLocaleDateString()} 
              </td>
              <td>${purchase.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Checkout
