//! lấy danh sách sp trong giỏ từ local
function layGioHangTuLocalStorage() {
    var gioHang=[];
    var jsonGioHang = localStorage.getItem('productsInCart');
    if(jsonGioHang==null || jsonGioHang==""){
        return gioHang;
    }else{
        var gioHang = JSON.parse(jsonGioHang);
    }
    return gioHang;
}

//! tạo item trong giỏ hàng
function TaoDoiTuongGioHang(id, soLuong) {
    var itemGioHang = new Object();
    itemGioHang.id = id;
    itemGioHang.soLuong = soLuong;
    return itemGioHang;
}

//! lưu ds giỏ hàng vào local
function saveItemToLocalStore(productsInCart) {
    var jsonDanhSachItemGioHang = JSON.stringify(productsInCart);
    localStorage.setItem('productsInCart', jsonDanhSachItemGioHang)
}

//! xoá sp khỏi giỏ hàng theo Id
function xoaItemKhoiGioHang(id) {
    var productsInCart = layGioHangTuLocalStorage();
    productsInCart = xoaSanPhamTuDanhSach(productsInCart, id);
    saveItemToLocalStore(productsInCart);
    soLuongItemGioHang()
    hienThiDanhSachItemGioHang();
}

// ! kiểm tra 1 id có trong giỏ không
function checkIdCart(id) {
    var productsInCart = layGioHangTuLocalStorage();
    for (var i = 0; i < productsInCart.length; i++) {
        if(productsInCart[i].id==id){
            return true;
        }
    }
    return false;
}

//! lưu thay đổi về số lượng sp trong giỏ vào local
function thayDoiSoLuong(id, soLuong) {
    var danhSachItemGioHangUpdate = thayDoiSoLuongGioHang(id, soLuong);
    saveItemToLocalStore(danhSachItemGioHangUpdate);
    hienThiDanhSachItemGioHang();
}

//! thay đổi số lượng sp trong giỏ khi đã có
function thayDoiSoLuongGioHang(id, soLuong) {
    var productsInCart = layGioHangTuLocalStorage();
    for (var i = 0; i < productsInCart.length; i++) {
        if (productsInCart[i].id == id) {
            productsInCart[i].soLuong = soLuong;
        }
    }
    return productsInCart;
}

//! html danh sách sản phẩm trong giỏ hàng
function hienThiDanhSachItemGioHang() {
    var productsInCart = layGioHangTuLocalStorage();
    var html = chuyenDanhSachitemGioHangSangHtml(productsInCart);
    var nodeGioHang = document.getElementById('gio-hang');
    nodeGioHang.innerHTML = html;
    var nodeTTKH = document.getElementById('thong-tin-khach-hang');
    if (productsInCart == null || productsInCart.length == 0) {
        nodeTTKH.innerHTML = nodeTTKH.style.display = "none";
    } else {
        nodeTTKH.innerHTML = formThongTinKhachHang();
    }
}

//! giao diện giỏ hàng khi có sản phẩm
function chuyenDanhSachitemGioHangSangHtml(productsInCart) {
    var htmlTong = `
        <h1 class="tieu-de">Danh Sách sản phẩm</h1>

    <div class="item-gio-hang item-gio-hang-tieu-de">
        <div class="hinh-anh">
        </div>
        <p class="ten-san-pham color1">Sản Phẩm</p>
        <div class="gia color1">
            Đơn Giá
        </div>
        <p class="so-luong color1">Số Lượng</p>
        <p class="tong-tien color1">Tổng Tiền</p>
        <div class="hanh-dong color1">
            <p>Thao Tác</p>
        </div>
    </div>
    `;
    if (productsInCart.length == 0 || productsInCart == null) {
        htmlTong += htmlGioHangTrong();
    } else {
        for (var i = 0; i < productsInCart.length; i++) {
            htmlTong += chuyenDoiTuongItemGioHangSangHTML(productsInCart[i]);
        }

        htmlTong += `<br>
        <div class="item-gio-hang item-gio-hang-tieu-de">
        <div class="hinh-anh">
        </div>
        <p class="ten-san-pham color1"></p>
        <div class="gia color1"></div>
        <p class="so-luong color1">Tổng: </p>
        <p class="tong-tien color1">${tongTienGioHang(productsInCart).toLocaleString()} đ</p>
        <div class="hanh-dong color1">
            <p></p>
        </div>
        </div>`;
    }
    return htmlTong;
}

//! html Giỏ hàng trống
function htmlGioHangTrong() {
    var html = `
        <div class="gio-hang-trong"> 
        <h3>Giỏ hàng của bạn đang trống hãy quay lại trang Sách Tham Khảo và tìm cho mình quyền sách ưa thích nhé !</h3>
        <a href="danh-sach-item.html" ><i class="fas fa-fighter-jet"></i></a>
        </div>
    `;
    return html;
}

//! tổng tiền sản phẩm trong giỏ hàng
function tongTienGioHang(productsInCart) {
    var tongTien = 0;
    for (var i = 0; i < productsInCart.length; i++) {
        var sanPham = laySanPhamTheoId(productsInCart[i].id);
        var tien = productsInCart[i].soLuong * sanPham.tinhGiaBan();
        tongTien += tien;
    }
    return tongTien;
}

//! html item trong giỏ hàng
function chuyenDoiTuongItemGioHangSangHTML(itemGioHang) {
    var sanPham = laySanPhamTheoId(itemGioHang.id);
    var tongTien = itemGioHang.soLuong * sanPham.tinhGiaBan();
    var html = '<div class="item-gio-hang">\n' +
        '            <div class="hinh-anh">\n' +
        '                <img src="' + sanPham.hinhAnh + '" alt="">\n' +
        '            </div>\n' +
        '            <p class="ten-san-pham">' + sanPham.ten + '</p>\n' +
        '            <div class="gia">\n' +
        '                <span class="gia-goc">' + sanPham.giaGoc.toLocaleString() + 'đ</span>\n' +
        '                <span class="gia-ban">' + sanPham.tinhGiaBan().toLocaleString() + ' đ</span>\n' +
        '            </div>\n' +
        '            <input type="number" min="1" value="' + itemGioHang.soLuong + '" onchange="thayDoiSoLuong(' + sanPham.id + ',this.value)" class="so-luong">\n' +
        '            <p class="tong-tien">' + tongTien.toLocaleString() + ' đ</p>\n' +
        '            <div class="hanh-dong">\n' +
        '                <i class="far fa-trash-alt fa-2x " onClick="xoaItemKhoiGioHang(' + sanPham.id + ')"></i>\n' +
        '            </div>\n' +
        '        </div>\n';
    return html;
}

//! html Form thu nhập thông tin khách hàng
function formThongTinKhachHang() {
    var html = `<h2 class="buy-title">Thông Tin Khách Hàng</h2>
    <label for="hoTen">Họ tên</label>
    <input type="text" name="" id="hoTen">

    <label for="soDienThoai">Số điện thoại</label>
    <input type="number" name="" id="soDienThoai">

    <label for="email">Email</label>
    <input type="text" name="" id="email">

    <label for="diaChi">Địa chỉ</label>
    <input type="text" name="" id="diaChi">

    <label for="ngayGiaoHang">Ngày tháng giao hàng</label>
    <input type="datetime-local" name="" id="ngayGiaoHang">

    <button id="dat-hang" onclick="onClickCreateCustomer()">Đặt hàng</button>`;
    return html;
}

//! onclick tạo thông tin người mua hàng
function onClickCreateCustomer() {
    document.getElementById('popup').style.display = "block";
    var dsCarts = layGioHangTuLocalStorage();
    var listBooks=JSON.stringify(dsCarts)
    var hoTen = document.getElementById('hoTen').value;
    var phone = document.getElementById('soDienThoai').value;
    var email = document.getElementById('email').value;
    var diaChi = document.getElementById('diaChi').value;
    var ngayGiaoHang = document.getElementById('ngayGiaoHang').value
    if (kiemTraFormOrder(hoTen, phone, email, diaChi, ngayGiaoHang)) {
        var node = document.getElementById('popup')
        var ngay= new Date();
        var customer = createCustomer(hoTen, phone, email, diaChi, ngayGiaoHang, tongTienGioHang(dsCarts),ngay, listBooks);
        customers = customersFromLocal();
        customers.push(customer);
        customersToLocal(customers);
        node.innerHTML = popupCustomerInformation(customer);
        localStorage.removeItem('productsInCart');
        hienThiDanhSachItemGioHang();
        soLuongItemGioHang();
        gioHangMini();
    } else {
        document.getElementById('popup').style.display = "none";
    }
}

//! popup mua hàng thành công
function popupCustomerInformation(customer) {
    var productsInCart = layGioHangTuLocalStorage();
    var html = `
    <div id="chinhSuaThongTin">
            <i class="fas fa-sign-out-alt" onclick="onClickExit()"></i>
            <h1>Chúc mừng đã đặt hàng thành công!</h1>
            <div class="thongTinDone">
                <div class="gif">
                    <img src="https://media4.giphy.com/media/rmi45iyhIPuRG/giphy.gif?cid=ecf05e478ocbqc36aqtqukdhaobtpmfly8v0utqch5bws4ti&rid=giphy.gif" alt="">
                </div>
                <div class="thongTinDone2">
                    <span>Họ tên: ${customer.ten}</span>
                    <span>Số Điện thoại: ${customer.sdt}</span>
                    <span>Email: ${customer.email}</span>
                    <span>Địa chỉ: ${customer.diaChi}</span>
                    <span>Thời gian: ${customer.ngayGiaoHang}</span>
                    <span>Tổng tiền thanh toán: ${tongTienGioHang(productsInCart).toLocaleString()} đ</span>
                </div>
            </div>
            <button id="hoanThanh" onclick="onClickExit()">Hoàn Thành</button>
        </div>
    `;
    return html;
}

//! tạo đối tượng người mua hàng
function createCustomer(hoTen, sdt, email, diaChi, ngayGiaoHang, tongTien,ngayTao,list) {
    var customer = new Object();
    customer.ten = hoTen;
    customer.sdt = sdt;
    customer.email = email;
    customer.diaChi = diaChi;
    customer.ngayGiaoHang = ngayGiaoHang;
    customer.tongTien = tongTien;
    customer.ngayTao=ngayTao
    customer.id=taoId();
    customer.list=list;
    return customer;
}

//! Đưa danh sách người mua hàng lên local
function customersToLocal(listCustomer) {
    localStorage.setItem('Customers', JSON.stringify(listCustomer));
}

//! lấy xuống danh sách người mua hàng 
function customersFromLocal() {
    var Customers = JSON.parse(localStorage.getItem('Customers'));
    if (Customers == null || Customers.length == 0) {
        Customers = [];
    }
    return Customers;
}



