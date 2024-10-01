import Bill from '../models/billSchema';
import BillDetail from '../models/billDetailSchema';
import mongoose from 'mongoose';

const createBill = async (billData) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        // Thiết lập trạng thái mặc định cho hóa đơn
        billData.status = 'Processing'; // Đổi từ 'Đang xử lý' thành 'Processing'

        // Tạo hóa đơn
        const bill = new Bill(billData);
        const createdBill = await bill.save({ session });

        // Tạo chi tiết hóa đơn
        const billDetails = billData.billDetails.map(detail => ({
            ...detail,
            billId: createdBill._id
        }));
        await BillDetail.insertMany(billDetails, { session });

        await session.commitTransaction();
        session.endSession();

        return { 
            EM: 'Bill created successfully',
            EC: 0,
            DT: createdBill._id 
        };
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.log(error);
        return ({ 
            EM: 'Internal server error',
            EC: -1, 
            DT: null 
        });
    }
};

const getBills = async (page, limit) => {
    try {
        const skip = (page - 1) * limit;

        const bills = await Bill.find().skip(skip).limit(limit);

        // Lấy tổng số lượng hóa đơn
        const totalBills = await Bill.countDocuments();

        // Tính tổng số trang
        const totalPages = Math.ceil(totalBills / limit);

        return { 
            EM: 'get bills paginate successfully!',
            EC: 0,
            DT: {
                bills,
                totalBills,
                totalPages
            }
        };
    } catch (error) {
        console.error('Error getting bills:', error);
        throw new Error('Internal server error');
    }
};



export default {
    createBill, getBills
};
