// server.js
const express = require('express');
const cors = require('cors');
const fs = require('fs'); // Thư viện có sẵn của Node.js để đọc/ghi file

const app = express();
const port = 3000;

// Cấu hình để backend nhận được dữ liệu từ web
app.use(cors());
app.use(express.json());

// API nhận dữ liệu từ Form
app.post('/api/contact', (req, res) => {
    const newCustomer = req.body; // Dữ liệu từ form gửi lên
    newCustomer.date = new Date().toLocaleString('vi-VN'); // Thêm ngày giờ VN

    let customers = [];
    
    // Kiểm tra xem file database đã có chưa, có thì đọc dữ liệu cũ
    if (fs.existsSync('customers.json')) {
        const data = fs.readFileSync('customers.json');
        customers = JSON.parse(data);
    }

    // Thêm khách hàng mới vào danh sách
    customers.push(newCustomer);

    // Lưu lại vào file customers.json
    fs.writeFileSync('customers.json', JSON.stringify(customers, null, 2));

    // Trả lời lại cho Frontend biết là đã thành công
    res.json({ message: 'Cảm ơn bạn! Thông tin đã được lưu thành công.' });
});

app.listen(port, () => {
    console.log(`🚀 Server Backend đang chạy tại http://localhost:${port}`);
});