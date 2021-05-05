function hienThiGiaoDien(number) {
    var danhSachSanPham = TaoDoiTuong().fromJsonS(localStorage.getItem('danhSachSanPham'));
    var nodeProducts = document.getElementById('hien-thi-sach');
    if (number == 1) {
        sapXepGiaGiam(danhSachSanPham);
    } else if (number == 2) {
        sapXepGiaTang(danhSachSanPham);
    } else if (number == 3) {
        sapXepTenAZ(danhSachSanPham);
    } else if (number == 4) {
        sapXepTenZA(danhSachSanPham);
    } else if (number == 5) {
        var timKiemSanPham = document.getElementById(`tim-kiem-san-pham`).value;
        danhSachSanPham = timTheoTen(danhSachSanPham, timKiemSanPham);
    } else if (number == 6) {
        var searchFrom = parseInt(document.getElementById('search-from').value);
        document.getElementById('search-from').value = "";
        var searchTo = parseInt((document.getElementById('search-to')).value);
        document.getElementById('search-to').value = "";
        danhSachSanPham = timTheoKhoangGia(danhSachSanPham, searchFrom, searchTo);
    }
    var html = convertListToHtml(danhSachSanPham);
    nodeProducts.innerHTML = html;
}


function onClickDuaVaoGioHang(id) {
    var productsInCart = layGioHangTuLocalStorage();
    var isExist = false;
    for (var i = 0; i < productsInCart.length; i++) {
        var item = productsInCart[i];
        if (item.id == id) {
            productsInCart[i].soLuong++;
            isExist = true;
        }
    }
    if (isExist == false) {
        var itemGioHang = TaoDoiTuongGioHang(id, 1);
        productsInCart.push(itemGioHang);
    }
    saveItemToLocalStore(productsInCart);
    soLuongItemGioHang()
    thongBaoThanhCong()
}