
//! lấy danh sách user từ local
function accountFromLocal() {
    var listAccount=localStorage.getItem('account')
    if(listAccount==null|| listAccount==''){
        var account = [
            {
                userName: 'admin',
                pass: 'admin'
            }
        ]
        var jsonAccount = JSON.stringify(account)
        localStorage.setItem('account', jsonAccount);
    }
    return JSON.parse(localStorage.getItem('account'));
}

//! đưa danh sách user lên local
function accountToLocal(listAccount){
    localStorage.setItem('account',JSON.stringify(listAccount))
}


//! hiển thị giao diện đăng nhập & đăng kí
function giaoDienDangNhap(check) {
    var nodeHienThiChinhSua = document.getElementById('popup')
    nodeHienThiChinhSua.style.backgroundColor = "rgba(0,0,0,0.9)"
    if(check==null || check==''){
        nodeHienThiChinhSua.innerHTML = `
        <div id="chinhSuaThongTin">
            <a href="danh-sach-item.html"><i class="fas fa-sign-out-alt"></i></a>
            <h1 class="updateTitle">Đăng nhập</h1>
            <p>Bạn phải đăng nhập để thực hiện chức năng này</p>
            <div class="UpdateForm">
                <label for="">Tên đăng nhập</label>
                <input type="text" id="tenDangNhap">
                <label for="" id="error-ten"></label>
                <label for="">Mật khẩu</label>
                <input type="password" id="matKhau">
                <label for=""id="error-mat-khau"></label>
                <p class="onclickReg">Chưa có tài khoản? <span onclick="giaoDienDangNhap(${1})">Đăng kí</span></p>
                <button id="Update" onclick="kiemTraAccount()">Đăng nhập</button>
            </div>
        </div>
        `;
    }else{
        nodeHienThiChinhSua.innerHTML = `
        <div id="chinhSuaThongTin">
            <a href="admin.html"><i class="fas fa-sign-out-alt"></i></a>
            <h1 class="updateTitle">Đăng kí tài khoản</h1>
            <div class="UpdateForm">
                <label for="">Tên đăng nhập</label>
                <input type="text" id="tenDangNhap">
                <label for="" id="error-ten"></label>
                <label for="">Mật khẩu</label>
                <input type="password" id="matKhau">
                <label for=""id="error-mat-khau"></label>
                <label for="">Nhập lại mật khẩu</label>
                <input type="password" id="matKhau1">
                <label for=""id="error-mat-khau1"></label>
                <button id="Update" onclick="kiemTraAccount(${1})">Đăng kí</button>
            </div>
        </div>
        `;
    }
}


//! validate form đăng kí & đăng nhập
function kiemTraAccount(value) {
    var account = accountFromLocal();
    var nodeUser = document.getElementById('tenDangNhap')
    var userName=nodeUser.value;
    var nodePass = document.getElementById('matKhau')
    var pass=nodePass.value;
    var nodeRePass= document.getElementById('matKhau1')
    var nodeErrorUser = document.getElementById('error-ten')
    var nodeErrorPass = document.getElementById('error-mat-khau')
    var nodeErrorPass1 = document.getElementById('error-mat-khau1')
    nodeErrorPass.value=``;
    nodeErrorUser.value=``;
    if(value==null|| value==''){
        for (var i = 0; i < account.length; i++) {
            if(checkAccount(account,userName,pass)){
                thongBaoAdmin('Đăng Nhập thành công');
                document.getElementById('login-info').style.display="block";
                document.getElementById('login-info').innerHTML=`Xin chào <span>${userName}</span>...<a href=""  class="log-out">Log out</a>!`
                onClickExit();
            }else if(userName==`` && pass==''){
                nodeErrorUser.innerHTML='Tên đăng nhập không được để trống';
                nodeErrorPass.innerHTML='Mật khẩu không được để trống'
                break;
            }else if(userName!=account[i].userName){
                nodeErrorUser.innerHTML='Tên đăng nhập không đúng';
                break;
            }else if(userName==account[i].userName && pass!=account[i].pass){
                nodeErrorPass.innerHTML='Mật khẩu không không đúng'
                break;
            }
        }
    }else{
        if(kiemTraNull(userName) && kiemTraNull(pass) && kiemTraNull(nodeRePass.value)){
            if(checkUserName(account,userName)==false){
                nodeErrorUser.innerHTML=`Tên đăng nhập đã tồn tại!`
            }else if(checkUserName(account,userName) && pass!=nodeRePass.value){
                nodeErrorPass.innerHTML=`Mật khẩu không trùng khớp`;
                pass=``;
                nodeRePass.value=``;
            }else if(checkUserName(account,userName) && pass==nodeRePass.value){
                var taiKhoan={userName,pass}
                account.push(taiKhoan);
                thongBaoAdmin('Tạo tài khoản thành công')
                accountToLocal(account);
                giaoDienDangNhap();
            }
        }else{
            nodeErrorUser.innerHTML='Tên đăng nhập không được để trống';
            nodeErrorPass.innerHTML='Mật khẩu không được để trống'
            nodeErrorPass1.innerHTML='Nhập lại mật khẩu không được để trống';
        }
    }
}

//! kiểm tra xem userName có trong list user chưa?
function checkUserName(listAccount,userName){
    var check=true;
    for(var i=0;i<listAccount.length;i++){
        if(listAccount[i].userName==userName){
            check=false;
        }
    }
    return check;
}

//! ktra đăng nhập
function checkAccount(listAccount,userName,pass){
    var check=false;
    for(var i=0;i<listAccount.length;i++){
        if(listAccount[i].userName==userName && listAccount[i].pass==pass){
            check=true;
        }
    }
    return check;
}