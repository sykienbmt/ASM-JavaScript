//!onclick tạo sản phẩm
function onClickTaoSP(id) {
    var hinhAnh = document.getElementById('hinhAnh').value;
    var ten = document.getElementById('ten').value;
    var nodeGiaGoc = document.getElementById('giaGoc');
    var giaGoc = parseInt(nodeGiaGoc.value);
    var nodePhanTramGiamGia = document.getElementById('giamGia');
    var phanTramGiamGia = parseInt(nodePhanTramGiamGia.value);

    if (kiemTraForm(hinhAnh, ten, giaGoc, phanTramGiamGia)) {
        danhSachSanPham = productsFromLocal();
        var sanPham = TaoDoiTuong(hinhAnh, ten, giaGoc, phanTramGiamGia, null);
        if(id==null||  id==""){
            danhSachSanPham.push(sanPham);
            thongBaoAdmin('Thêm Thành công')
            onClickExit()
        }else{
            sanPham.id=id;
            var viTri=truyXuatViTriTheoId(id);
            danhSachSanPham[viTri]=sanPham;
            thongBaoAdmin('Update thành công')
            onClickExit()
        }
        productsToLocal(danhSachSanPham);
        hienThiAdmin();
    }
}

//! tạo sản phẩm 
function TaoDoiTuong(hinhAnh, ten, giaGoc, giamGia, id) {
    var sanPham = new Object();
    sanPham.hinhAnh = hinhAnh;
    sanPham.ten = ten;
    sanPham.giaGoc = giaGoc;
    sanPham.giamGia = giamGia;

    if (id == null) {
        sanPham.id = taoId();
    } else {
        sanPham.id = id;
    }

    sanPham.tinhGiaBan = function () {
        let giaCa = this.giaGoc * (1 - (this.giamGia / 100));
        return giaCa;
    }

    sanPham.fromJsonS = function (jsonDanhSachSanPham) {
        var danhSachSanPhamDayDu = new Array();
        var danhSachSanPham = JSON.parse(jsonDanhSachSanPham);
        if (danhSachSanPham == null) {
            var danhSachSanPham = [];
        }
        for (var i = 0; i < danhSachSanPham.length; i++) {
            var sanPham = danhSachSanPham[i];
            var sanPhamDayDu = TaoDoiTuong(sanPham.hinhAnh, sanPham.ten, sanPham.giaGoc, sanPham.giamGia, sanPham.id);
            danhSachSanPhamDayDu[i] = sanPhamDayDu;
        }
        return danhSachSanPhamDayDu;
    }
    return sanPham;
}

//! chuyển dssp sang html
function convertListToHtml(danhSachSanPham) {
    var danhSachHtmlSanPham = '';
    for (var i = 0; i < danhSachSanPham.length; i++) {
        var htmlSanPham = chuyenDoiTuongThanhHtml(danhSachSanPham[i]);
        danhSachHtmlSanPham += htmlSanPham;
    }
    return danhSachHtmlSanPham;
}

//! chuyển sản phẩm -> Html
function chuyenDoiTuongThanhHtml(sanPham) {
    sanPham = TaoDoiTuong(sanPham.hinhAnh, sanPham.ten, sanPham.giaGoc, sanPham.giamGia, sanPham.id);
    var html = '';
    html += '<div class="books-container">'
    html += '<div class="books-items">'
    html += `<div class="Giam-Gia-background">-${sanPham.giamGia}%</div>`
    html += '<div class="hinhAnh">'
    html += '<img src="' + sanPham.hinhAnh + '" alt="">'
    html += '</div>'
    html += '<h1 class="ten">' + sanPham.ten + '</h1>'
    html += '<div class="gia">'
    html += '<span class="gia-goc">' + sanPham.giaGoc.toLocaleString() + '</span>'
    html += '<span class="gia-ban"> ' + sanPham.tinhGiaBan().toLocaleString() + ' đ</span>'
    html += '</div>'
    html += '<button id="themVaoGio" onclick="onClickDuaVaoGioHang( ' + sanPham.id + ' )">Thêm vào giỏ hàng</button>'
    html += '</div>'
    html += '</div>'
    return html;
}

// ! lấy sp đầy đủ theo Id 
function laySanPhamTheoId(id) {
    var sanPham = new Object();
    var danhSachSanPham = productsFromLocal();
    for (var i = 0; i < danhSachSanPham.length; i++) {
        var item = danhSachSanPham[i];
        if (item.id == id) {
            sanPham = item;
        }
    }
    sanPham = TaoDoiTuong(sanPham.hinhAnh, sanPham.ten, sanPham.giaGoc, sanPham.giamGia, sanPham.id);
    return sanPham;
}

// ! Lấy dssp từ local
function productsFromLocal() {
    var danhSachSanPham = JSON.parse(localStorage.getItem('danhSachSanPham'));
    return danhSachSanPham;
}

// ! Đưa dssp lên local
function productsToLocal(danhSachSanPham) {
    localStorage.setItem('danhSachSanPham', JSON.stringify(danhSachSanPham));
}

// ! Tìm theo sản phẩm theo id
function truyXuatSanPhamTheoId(id) {
    var danhSachSanPham = productsFromLocal();
    for (var i = 0; i < danhSachSanPham.length; i++) {
        var item = danhSachSanPham[i];
        if (item.id == id) {
            return item;
        }
    }
}

// ! Tìm vị trí sp theo sản phẩm theo id
function truyXuatViTriTheoId(id) {
    var danhSachSanPham = productsFromLocal();
    for (var i = 0; i < danhSachSanPham.length; i++) {
        var item = danhSachSanPham[i];
        if (item.id == id) {
            return i;
        }
    }
}

// ! hiển thị Danh sách kho 
function hienThiAdmin(number) {
    var danhSachSanPham = TaoDoiTuong().fromJsonS(localStorage.getItem('danhSachSanPham'));
    var nodeProducts = document.getElementById('hienThiDanhSachKho');
    if(number==null || number==""){
        danhSachSanPham;
    }else if(number==1){
        sapXepGiaTang(danhSachSanPham);
    }else if(number==2){
        sapXepGiaGiam(danhSachSanPham);
    }else if(number==3){
        var nodeSearch=document.getElementById('search-value');
        danhSachSanPham=timTheoTen(danhSachSanPham, nodeSearch.value)
    }
    var html=htmlFullItemsKho(danhSachSanPham);
    nodeProducts.innerHTML = html;
}


//! lấy danh sách HTML item kho 
function htmlFullItemsKho(danhSachSanPham) {
    var danhSachHtmlSanPham = '';
    for (var i = 0; i < danhSachSanPham.length; i++) {
        var htmlSanPham = htmlItemKho(danhSachSanPham[i]);
        danhSachHtmlSanPham += htmlSanPham;
    }
    return danhSachHtmlSanPham;
}

//! html item trong kho
function htmlItemKho(sanPham) {
    sanPham = TaoDoiTuong(sanPham.hinhAnh, sanPham.ten, sanPham.giaGoc, sanPham.giamGia, sanPham.id);
    var html = '';
    html += '<div class="books-container">'
    html += '<div class="books-items">'
    html += '<div class="update-books-items" >'
    html += '<i class="fas fa-edit" onclick="onClickPopup( ' + sanPham.id + ' )"></i>'
    html += '</div>'
    html += '<div class="hinhAnh">'
    html += '<img src="' + sanPham.hinhAnh + '" alt="">'
    html += '</div>'
    html += '<h1 class="ten">' + sanPham.ten + '</h1>'
    html += '<div class="gia">'
    html += '<span class="gia-goc">' + sanPham.giaGoc.toLocaleString() + '</span>'
    html += '<span class="gia-ban"> ' + sanPham.tinhGiaBan().toLocaleString() + ' đ</span>'
    html += '</div>'
    html += '<button id="themVaoGio" onclick="onClickRemove( ' + sanPham.id + ' )">Xoá khỏi Kho</button>'
    html += '</div>'
    html += '</div>'
    return html;
}


//! xoá sp 
function onClickRemove(id) {
    var danhSachSanPham = TaoDoiTuong().fromJsonS(localStorage.getItem('danhSachSanPham'));
    danhSachSanPham = xoaSanPhamTuDanhSach(danhSachSanPham, id);
    productsToLocal(danhSachSanPham);
    thongBaoAdmin('Xoá thành công')
    hienThiAdmin();
    if(checkIdCart(id) ==true){
        productsInCart = xoaSanPhamTuDanhSach(layGioHangTuLocalStorage(), id);
        saveItemToLocalStore(productsInCart);
        soLuongItemGioHang();
    }

}

// ! xoá 1 id từ danh sách
function xoaSanPhamTuDanhSach(arr, id) {
    var update = [];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].id == id) {
        } else {
            update.push(arr[i])
        }
    }
    return update;
}

// ! cập nhật sản phẩm
function onClickPopup(id) {
    document.getElementById('popup').style.display = "block";
    var sanPham = truyXuatSanPhamTheoId(id);
    var nodeHienThiChinhSua = document.getElementById('popup')
    nodeHienThiChinhSua.innerHTML = ``;
    if (id == null || id == "") {
        nodeHienThiChinhSua.innerHTML = `
        <div id="chinhSuaThongTin">
            <i class="fas fa-sign-out-alt" onclick="onClickExit()"></i>
            <h1 class="updateTitle">Thêm sản phẩm: </h1>
            <div class="UpdateForm">
                <label for="">Nhập hình ảnh</label>
                <input type="text" id="hinhAnh">
                <label for="">Nhập Tên</label>
                <input type="text" id="ten">
                <label for="">Nhập Giá</label>
                <input type="number" id="giaGoc">
                <label for="">Nhập Phần trăm giảm giá (0-100%)</label>
                <input type="number" id="giamGia">
                <button id="Update" onclick="onClickTaoSP()">Thêm vào kho</button>
            </div>
        </div>
        `;
    }else if(id=='dangNhap'){
        giaoDienDangNhap()
    }else{
        nodeHienThiChinhSua.innerHTML = `
        <div id="chinhSuaThongTin">
            <i class="fas fa-sign-out-alt" onclick="onClickExit()"></i>
            <h1 class="updateTitle">Chỉnh sửa: </h1>
            <p>${sanPham.ten}</p>
            <div class="UpdateForm">
                <label for="">Nhập hình ảnh</label>
                <input type="text" id="hinhAnh" value="${sanPham.hinhAnh}">

                <label for="">Nhập Tên</label>
                <input type="text" id="ten" value="${sanPham.ten}">

                <label for="">Nhập Giá</label>
                <input type="number" id="giaGoc" value="${sanPham.giaGoc}">

                <label for="">Nhập Phần trăm giảm giá (0-100%)</label>
                <input type="number" id="giamGia" value="${sanPham.giamGia}">

                <button id="Update" onclick="onClickTaoSP(${sanPham.id})">Cập nhật</button>
            </div>
        </div>
        `;
    }
}

// ! Tìm kiếm- Sắp xếp

function sapXepGiaTang(danhSachSanPham) {
    danhSachSanPham.sort(function (a, b) {
        return a.tinhGiaBan() - b.tinhGiaBan();
    })
}

function sapXepGiaGiam(danhSachSanPham) {
    danhSachSanPham.sort(function (a, b) {
        return -a.tinhGiaBan() + b.tinhGiaBan();
    })

}

function sapXepTenAZ(danhSachSanPham) {
    for (var i = 0; i < danhSachSanPham.length - 1; i++) {
        for (var j = i + 1; j < danhSachSanPham.length; j++) {
            if (danhSachSanPham[i].ten > danhSachSanPham[j].ten) {
                tam = danhSachSanPham[i];
                danhSachSanPham[i] = danhSachSanPham[j];
                danhSachSanPham[j] = tam;
            }
        }
    }
    return danhSachSanPham;
}

function sapXepTenZA(danhSachSanPham) {
    for (var i = 0; i < danhSachSanPham.length - 1; i++) {
        for (var j = i + 1; j < danhSachSanPham.length; j++) {
            if (danhSachSanPham[i].ten < danhSachSanPham[j].ten) {
                tam = danhSachSanPham[i];
                danhSachSanPham[i] = danhSachSanPham[j];
                danhSachSanPham[j] = tam;
            }
        }
    }
    return danhSachSanPham;
}

function timTheoTen(danhSachSanPham, ten) {
    var mang = [];
    for (var i = 0; i < danhSachSanPham.length; i++) {
        if (danhSachSanPham[i].ten.includes(ten)) {
            mang.push(danhSachSanPham[i])
        }
    }
    return mang;
}

function timTheoKhoangGia(danhSachSanPham, from, to) {
    var mang = [];
    for (var i = 0; i < danhSachSanPham.length; i++) {
        if (danhSachSanPham[i].tinhGiaBan() >= from && danhSachSanPham[i].tinhGiaBan() <= to) {
            mang.push(danhSachSanPham[i]);
        }
    }
    return mang;
}
