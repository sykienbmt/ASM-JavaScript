function kiemTraForm(hinhAnh, ten, giaGoc, giamGia) {
    if (kiemTraNull(hinhAnh) == false) {
        alert('Hình ảnh sản phẩm không được để trống')
        check = false;
    } else if (kiemTraNull(ten) == false) {
        alert('Tên sản phẩm không được để trống')
        check = false;
    } else if (kiemTraNull(giaGoc) == false || parseInt(giaGoc) < 0) {
        if (parseInt(giaGoc) < 0) {
            alert('Giá sản phẩm phải lớn hơn 0');
            check = false;
        } else {
            alert('Giá sản phẩm không được để trống');
            check = false;
        }
    } else if (kiemTraNull(giamGia) == false || parseInt(giamGia) < 0 || parseInt(giamGia) > 100) {
        if (parseInt(giamGia) < 0 || parseInt(giamGia) > 100) {
            alert(`Giảm giá phải trong khoảng từ 0-100%`);
            check = false;
        } else {
            alert('Giảm giá không được để trống');
            check = false;
        }
    } else check = true;
    return check;
}

function kiemTraFormOrder(ten, sdt, email, diaChi,ngayGiaoHang) {
    var check = true;
    if (kiemTraNull(ten) == false) {
        alert(`Tên khách hàng không được để trống`);
        check = false;
    } else if (kiemTraSdt(sdt)==false) {
        alert(`Vui lòng nhập đúng số điện thoại`);
        check = false;
    }else if(kiemTraEmail(email)==false){
        alert(`Vui lòng nhập đúng định dạng email`);
        check = false;
    }else if(kiemTraNull(diaChi)==false){
        alert(`Địa chỉ không được để trống`);
        check = false;
    }else if(kiemTraNull(ngayGiaoHang)==false){
        alert(`Ngày giao hàng không được để trống`);
        check = false;
    }
    return check;
}

function kiemTraNull(string) {
    var check = true;
    if (string.length == 0 || string == null ) {
        check = false;
    }
    return check;
}

function kiemTraSdt(sdt) {
    var check = false;
    var dauSoDienThoai = ["09", "03", "08", "02", "07", "05", "84"];
    var splitPhoneNumber = sdt.substr(0, 2);
    if (kiemTraNull(sdt) == true && 9 < sdt.length <= 10) {
        for (var i = 0; i < dauSoDienThoai.length; i++) {
            if (splitPhoneNumber == dauSoDienThoai[i]){
                check=true;
            }
        }
    }
    return check;
}

function kiemTraEmail(email) {
    var check = false;
    if (kiemTraNull(email)) {
        if (email.includes('@') == true && email.includes('.')==true) {
            check = true;
        }
    }
    return check;
}


