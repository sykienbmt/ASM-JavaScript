//! Tạo id cho sản phẩm
function taoId() {
    var id = '';
    id = Math.random().toString().substring(2, 10) + String(new Date().getTime());
    return id;
}

//! popup thông báo
function thongBaoThanhCong() {
    htmlPopup = '';
    htmlPopup += '<div id="dat-hang-thanh-cong">'
    htmlPopup += '<h1>Thêm vào giỏ thành công!</h1>'
    htmlPopup += '</div>'
    var nodeDanhSachContainer = document.getElementById('thanh-cong');
    nodeDanhSachContainer.innerHTML = htmlPopup;
    setTimeout(function () {
        nodeDanhSachContainer.innerHTML = ``;
    }, 2000);
}

function thongBaoAdmin(noiDung){
    htmlPopup = '';
    htmlPopup += '<div id="RemoveItemDone">'
    htmlPopup += `<h1>${noiDung}!</h1>`
    htmlPopup += '</div>'
    var nodeDanhSachContainer = document.getElementById('them-thanh-cong');
    nodeDanhSachContainer.innerHTML = htmlPopup;
    setTimeout(function () {
        nodeDanhSachContainer.innerHTML = ``;
    }, 3000);
}

// ! sản phẩm nếu danh sách rỗng

function onClickExit(){
    document.getElementById('popup').style.display="none";
}

var dssp= [
    {hinhAnh:"https://cdn0.fahasa.com/media/catalog/product/cache/1/small_image/400x400/9df78eab33525d08d6e5fb8d27136e95/2/4/24df17f9bab58ba053c6c08c3af2f470.jpg",ten:"Học 2000 Từ Vựng Tiếng Anh Theo Chủ Đề",giaGoc:65000,giamGia:20,id:"002986231617578333333"},
    {hinhAnh:"https://cdn0.fahasa.com/media/catalog/product/cache/1/small_image/400x400/9df78eab33525d08d6e5fb8d27136e95/i/m/image_187866.jpg",ten:"Cẩm Nang Cấu Trúc Tiếng Anh",giaGoc:98000,giamGia:20,id:"411117301617526185442"},
    {hinhAnh:"https://cdn0.fahasa.com/media/catalog/product/cache/1/small_image/400x400/9df78eab33525d08d6e5fb8d27136e95/i/m/image_195509_1_1449.jpg",ten:"Little Stories - To Get More Knowledge",giaGoc:65000,giamGia:20,id:"479724411617526238929"},
    {hinhAnh:"https://cdn0.fahasa.com/media/catalog/product/cache/1/small_image/400x400/9df78eab33525d08d6e5fb8d27136e95/i/m/image_224922.jpg",ten:"Hackers Ielts Basic - Writing",giaGoc:199000,giamGia:15,id:"486635331617526373746"},
    {hinhAnh:"https://cdn0.fahasa.com/media/catalog/product/cache/1/small_image/400x400/9df78eab33525d08d6e5fb8d27136e95/i/m/image_180265.jpg",ten:"Basic Ielts Listening (Tái Bản 2018)",giaGoc:168000,giamGia:20,id:"269296841617526431082"},
    {hinhAnh:"https://cdn0.fahasa.com/media/catalog/product/cache/1/small_image/400x400/9df78eab33525d08d6e5fb8d27136e95/3/2/323339d39d3c6062392d.jpg",ten:"Hack Não Phương Pháp - Học Tiếng Anh",giaGoc:115000,giamGia:20,id:"887938101617527090698"},
    {hinhAnh:"https://cdn0.fahasa.com/media/catalog/product/cache/1/small_image/400x400/9df78eab33525d08d6e5fb8d27136e95/i/m/image_195509_1_26465.jpg",ten:"55.000 Câu Đàm Thoại Tiếng Anh",giaGoc:190000,giamGia:20,id:"285718611617546363794"},
    {hinhAnh:"https://cdn0.fahasa.com/media/catalog/product/cache/1/small_image/400x400/9df78eab33525d08d6e5fb8d27136e95/i/m/image_195509_1_56469.jpg",ten:"Hack não ngữ pháp Tiếng anh",giaGoc:325000,giamGia:15,id:"007292521617546594850"}]

function themSanPham(){
    var danhSachSanPham = productsFromLocal();
    if(danhSachSanPham==null|| danhSachSanPham.length==0){
        localStorage.setItem('danhSachSanPham', JSON.stringify(dssp))
    }
}






