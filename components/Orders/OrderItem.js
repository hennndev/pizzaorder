import React from 'react';
import moment from 'moment';

const OrderItem = ({order, setDetailOrder, deleteOrder, setIsMsgAdmin}) => {

    const colors = {
        new: 'text-gray-500',
        preparing: 'text-blue-400',
        onTheWay: 'text-blue-500',
        awaitingPayment: 'primary-text' ,
        done: 'text-green-500'
    }


    return (
        <div className='bg-[#202020] min-h-[200px] rounded p-5 text-white relative'>
            {order.admin_note && order.status !== 'done' && (
                <div className='bg-red-600 w-[15px] h-[15px] rounded-full absolute -top-1 -left-1 animate-pulse'></div>
            )}
            <div className="flex flex-col space-y-4">
                <h1>Order Id: <span className='bg-gray-600 p-[5px] rounded'>{order._id}</span></h1>
                
                <h1 className=''>Order pada: <span className='bg-gray-600 p-[5px] rounded'>{moment(order.orderPada).format('LLL')}</span></h1>  
                
                <h1>Total Pesanan: <span className='text-xl font-medium'>
                    {order.dataOrders.reduce((currVal,val) => currVal += val.count, 0)}</span></h1>
                
                <h1>Total Harga: {' '}
                    <span className='text-xl font-bold primary-text'>Rp {order.totalAll}K <br />
                    <span className="text-gray-500 text-sm">(Sudah termasuk biaya delivery)</span>
                    </span>
                </h1>
                <h1>Status: {' '}
                    <span className={`text-xl font-medium uppercase ${colors[order.status]}`}>
                        {order.status === 'onTheWay' ? 'on the way' : 
                        order.status === 'new' ? 'pending' : 
                        order.status === 'awaitingPayment' ? 'awaiting payment' : order.status}
                    </span>
                </h1>
                <div className="flex items-center space-x-3 text-sm">
                    <button className='w-max btn' onClick={() => setDetailOrder(order.dataOrders)}>Detail Pesanan</button>
                    {order.status === 'done' && (
                        <button className='btn w-max bg-red-500 hover:bg-red-600' onClick={deleteOrder}>Hapus Pesanan</button>
                    )}
                </div>
                {order.admin_note && order.status !== 'done' && (
                    <button className="btn w-max text-sm animate-bounce" onClick={() => setIsMsgAdmin(order.admin_note)}>Pesan Admin...</button>
                )}
            </div>    
        </div>
    )
};

export default OrderItem;
