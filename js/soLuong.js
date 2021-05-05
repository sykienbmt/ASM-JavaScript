function soLuongItemGioHang(){
    var dsCarts = layGioHangTuLocalStorage();
    var node=document.getElementById('soLuongItem')
    if(dsCarts.length!=0){
        node.innerHTML=`
        <div class="soLuong">${dsCarts.length}</div>
        `;
    }else{
        node.innerHTML=``;
    }
    gioHangMini()
}
soLuongItemGioHang()

function gioHangMini(){
    var nodeHienThi=document.getElementById('gioHangMini')
    var productsInCart = layGioHangTuLocalStorage();
    html=``;
    for(var i=0;i<productsInCart.length;i++){
        sanPham = laySanPhamTheoId(productsInCart[i].id);
        html+=`
        <div class="item-gio">
            <img src="${sanPham.hinhAnh}" alt="">
            <h5 class="ten-item">${sanPham.ten}</h5>
            <h5 class="gia-item">${sanPham.tinhGiaBan().toLocaleString()} đ</h5>
        </div>
        <i class="fas fa-sort-up"></i>
        `;
    }
    if(productsInCart.length==null||productsInCart.length==0){
        html+=`
        <div class="item-gio">
            <p>Bạn chưa có sản phẩm nào trong giỏ hàng !</p>
        </div>
        <i class="fas fa-sort-up"></i>
        `;
    }
    nodeHienThi.innerHTML=html;
}
gioHangMini()

//!hiển thị thông tin Đơn hàng
function quanLyDonHang(){
    var listCustomer=customersFromLocal()
    document.getElementById('popup').style.display=`block`;
    document.getElementById('popup').innerHTML=`
    <div id="form-khach-hang">
        <i class="fas fa-times" onclick="onClickExit()"></i>
        <h2 id="title-quan-ly">Thông tin đơn hàng</h2>
        <div id="customer-item">
            <p class="tenKhachHang title9">Tên KH</p>
            <p class="sdtKhachHang title9">SĐT KH</p>
            <p class="emailKhachHang title9">Email KH</p>
            <p class="diaChiKhachHang title9">Địa chỉ KH</p>
            <p class="ngayGiaoKhachHang title9">Ngày giao KH</p>
            <p class="giaTriDonHang title9">Tổng</p>
            <div class="thongtinDonHang title9"></div>
            <div class="xoaDonHang title9">Xoá</div>
        </div>
    </div>
    `;
    if(listCustomer.length==0|| listCustomer==null){
        document.getElementById('form-khach-hang').innerHTML+=`<p class='don-hang-trong'>Rất tiếc bạn chưa có đơn hàng nào -.-!</p>`
    }
    for(var i=0;i<listCustomer.length;i++){
        document.getElementById('form-khach-hang').innerHTML+=`
        <div id="customer-item" class="item-css">
            <p class="tenKhachHang">${listCustomer[i].ten}</p>
            <p class="sdtKhachHang">${listCustomer[i].sdt}</p>
            <p class="emailKhachHang">${listCustomer[i].email}</p>
            <p class="diaChiKhachHang">${listCustomer[i].diaChi}</p>
            <p class="ngayGiaoKhachHang">${listCustomer[i].ngayGiaoHang}</p>
            <p class="giaTriDonHang">${listCustomer[i].tongTien.toLocaleString()} đ</p>
            <div class="thongtinDonHang">
                <button class="btn" onclick="donHang(${listCustomer[i].id},${i})">Chi Tiết</button>
            </div>
            <div class="xoaDonHang" onclick=xoaDonHang(${i})><i class="fas fa-trash"></i></div>
        </div>
        <div id="thong-tin-don-hang" class="thong-tin-don-hang">
        `;
    }
}

function donHang(id,viTri){
    var listCustomer=customersFromLocal()
    var html=``;
    var donHang;
    for(var i=0;i<listCustomer.length;i++){
        if(listCustomer[i].id==id){
            donHang=listCustomer[i].list;
        }
    }
    var listItem=JSON.parse(donHang);
    for(var i=0;i<listItem.length;i++){
        html+=htmlListDonhang(listItem[i])
    }
    var x=document.getElementsByClassName("thong-tin-don-hang");
    for(var i=0;i<x.length;i++){
        x[i].innerHTML=``;
        x[i].style.display='none';
    }
    x[viTri].style.display='block';
    x[viTri].innerHTML=html;
}

function htmlListDonhang(itemGio){
    var sanPham=laySanPhamTheoId(itemGio.id)
    var html=`
    <div id="item-don-hang-chi-tiet">
        <div class="img-customer">
            <img src="${sanPham.hinhAnh}" alt="">
        </div>
        <p class="ten-san-pham">${sanPham.ten}</p>
        <p class="so-luong-sach">${itemGio.soLuong}</p>
        </div>
    </div>
    `;
    return html;
}

function xoaDonHang(i){
    var listCustomer=customersFromLocal();
    listCustomer.splice(i,1);
    var jsonListCustomer=JSON.stringify(listCustomer);
    localStorage.setItem('Customers',jsonListCustomer)
    quanLyDonHang()
}