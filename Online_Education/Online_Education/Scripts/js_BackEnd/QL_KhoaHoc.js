function Load() {
    $('#dataTable').preloader();
    $.ajax({
        url: "Load",
        type: "get",
        success: function (data) {
            $('#dataTable').preloader('remove');
            var html = ``;
            $.each(data.data, function (i, item) {
                i += 1;
                html += `<tr>
                    <td>`+ i + `</td>
                    <td>`+ item.TenKhoaHoc + `</td>
                    <td>`+ decodeURI(item.MoTa) + `</td>
                    <td>`+ formatNumber(item.HocPhi, '.', ',') + ` VND</td>
                    <td>`+ item.LichHoc + `</td>
                    <td>
                        <input name = "trangthai" onchange="ProcessStatus(`+ item.ID + `,'` + item.TenKhoaHoc + `')" class="ace ace-switch ace-switch-6" type = "checkbox"` + (item.TrangThai ? "checked" : "") + `  >
                        <span class="lbl"></span>
                    </td>
                    <td class="details-control center">
                        <div class="hidden-sm hidden-xs action-buttons">
                            <a class="green" style="cursor:pointer" onclick='Show_AE_Modal("add",`+(-1)+`)'>
                                <i class="ace-icon fa fa-plus-circle bigger-130"></i>
                            </a>

                            <a class="" style="cursor:pointer;color:orange" onclick='Show_AE_Modal("edit",`+ item.ID + `)'>
                                <i class="ace-icon fa fa-pencil bigger-130"></i>
                            </a>

                            <a class="red" style="cursor:pointer" onclick="Show_D_Modal(`+ item.ID + `,'` + item.TenKhoaHoc + `')">
                                <i class="ace-icon fa fa-trash-o bigger-130"></i>
                            </a>
                        </div>

                        <div class="hidden-md hidden-lg">
                            <div class="inline pos-rel">
                                <button class="btn btn-minier btn-yellow dropdown-toggle" data-toggle="dropdown" data-position="auto">
                                    <i class="ace-icon fa fa-caret-down icon-only bigger-120"></i>
                                </button>

                                <ul class="dropdown-menu dropdown-only-icon dropdown-yellow dropdown-menu-right dropdown-caret dropdown-close">
                                    <li>
                                        <a onclick='Show_AE_Modal("add",`+ (-1) +`)' style="cursor:pointer" class="tooltip-info" data-rel="tooltip" title="" data-original-title="View">
                                            <span class="green">
                                                <i class="ace-icon fa fa-plus-circle bigger-120"></i>
                                            </span>
                                        </a>
                                    </li>

                                    <li>
                                        <a onclick='Show_AE_Modal("edit",`+ item.ID + `)' style="cursor:pointer;color:orange" class="tooltip-success" data-rel="tooltip" title="" data-original-title="Edit">
                                            <span class="">
                                                <i class="ace-icon fa fa-pencil-square-o bigger-120"></i>
                                            </span>
                                        </a>
                                    </li>

                                    <li>
                                        <a onclick="Show_D_Modal(`+ item.ID + `,'` + item.TenKhoaHoc + `')" style="cursor:pointer" class="tooltip-error" data-rel="tooltip" title="" data-original-title="Delete">
                                            <span class="red">
                                                <i class="ace-icon fa fa-trash-o bigger-120"></i>
                                            </span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </td>
                </tr>`;
            });
            var table = $('#myTable').DataTable();
            table.destroy();
            $('#dataTable').html(html);
            $('#myTable').DataTable({
                "autoWidth": false,
                "columns": [
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    {
                        "class": "details-control",
                        "orderable": false,
                        "width": "20%",
                    },
                ],
            });
        }
    });
}
function formatNumber(nStr, decSeperate, groupSeperate) {
    nStr += '';
    x = nStr.split(decSeperate);
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + groupSeperate + '$2');
    }
    return x1 + x2;
}
function readUrl(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#review-img').attr('src', e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
    }
}
var index = -1;
function Show_AE_Modal(type, i) {
    index = i;
    //eraserEffect();
    $("#sample-form").trigger("reset");
    CKEDITOR.instances['mota'].setData("");
    $('#review-img').removeAttr('src').attr('src', 'http://placehold.it/50');
    LoadLoaiKhoaHoc();
    LoadGiangVien();
    if (type == "add") {
        $('.modal-title').html("Thêm khóa học");
        $('#btn-process').removeAttr('class data-type').addClass('btn btn-success btn-submit');
        $('#btn-process').text("Thêm");
        $('#modalcall').modal("show");
    }
    else {
        $('.modal-title').html("Sửa khóa học");
        $('#btn-process').removeAttr('class').addClass('btn btn-warning btn-submit');
        $('#btn-process').text("Sửa");
        $.ajax({
            url: "LoadByID",
            type: "GET",
            data: { id: parseInt(i) },
            dataType: "Json",
            success: function (data) {
                $('#tenkhoahoc').val(data.data.TenKhoaHoc);
                $('#hocphi').val(data.data.HocPhi);
                $('#ngaybatdau').val(data.data.ThoiGianBatDau);
                $('#ngayketthuc').val(data.data.ThoiGianKetThuc);
                $('#lichhoc').val(data.data.LichHoc);
                data.data.TrangThai ? $('#trangthai').attr('checked', "true") : $('#trangthai').removeAttr('checked', "false");
                $('#idlkh').val(data.data.IDLoaiKhoaHoc);
                $('#idgv').val(data.data.IDGiangVien);
                var mota = decodeURI(data.data.MoTa);
                CKEDITOR.instances['mota'].setData(mota);

                $("#modalcall").modal("show");
            }
        });
    }
}
$('#btn-process').click(function () {
    var type = $('#btn-process').text();
    var getmota = CKEDITOR.instances['mota'].getData();
    var mota = encodeURI(getmota);
    //var mota2 = decodeURI(mota1);
    //console.log(mota2);
    var file = $("#file").get(0).files;
    var formData = new FormData();
    formData.append("id", index);
    formData.append("tenkhoahoc", $("#tenkhoahoc").val());
    formData.append("hocphi", $("#hocphi").val());
    formData.append("ngaybatdau", $("#ngaybatdau").val());
    formData.append("ngayketthuc", $("#ngayketthuc").val());
    formData.append("lichhoc", $("#lichhoc").val());
    formData.append("trangthai", $('#trangthai').is(':checked'));
    formData.append("idlkh", $("#idlkh").val());
    formData.append("idgv", $("#idgv").val());
    formData.append("mota", mota);
    formData.append("anh", file[0]);
    $.ajax({
        url: 'Add_Edit',
        type: "POST",
        data: formData,
        dataType: false,
        processData: false,
        contentType: false,
        success: function (data) {
            if (data.data) {
                Load();
                $("#modalcall").modal("hide");
                $.gritter.add({
                    title: 'Thông báo ' + type,
                    text: type + " [" + $('#tenkhoahoc').val() + "] " + ' thành công',
                    class_name: 'gritter-success'
                });
            }
            else {
                $.gritter.add({
                    title: 'Thông báo ' + type,
                    text: type + " [" + $('#tenkhoahoc').val() + "] " + ' thất bại',
                    class_name: 'gritter-error'
                });
            }

        }
    });
});
function LoadLoaiKhoaHoc() {
    var html = "";
    $.ajax({
        url: "LoadLoaiKhoaHoc",
        type: "GET",
        success: function (data) {
            $.each(data.data, function (i, row) {
                html += "<option value=" + row.ID + ">" + row.TenLoaiKhoaHoc + "</option>";
            });
            $('#idlkh').html(html);
        }
    });
}
function LoadGiangVien() {
    var html = "";
    $.ajax({
        url: "LoadGiangVien",
        type: "GET",
        success: function (data) {
            $.each(data.data, function (i, row) {
                html += "<option value=" + row.ID + ">" + row.HoTen_GV + "</option>";
            });
            $('#idgv').html(html);
        }
    });
}
function ProcessStatus(id, tenkhoahoc) {
    $.ajax({
        url: "ProcessStatus",
        type: "POST",
        data: { id: id },
        dataType: "json",
        success: function (data) {
            if (data.status) {
                $.gritter.add({
                    title: "Thông báo",
                    text: "Kích hoạt khóa học [" + tenkhoahoc + "] thành công",
                    class_name: "gritter-success"
                });
            } else {
                $.gritter.add({
                    title: "Thông báo",
                    text: "Vô hiệu hóa khóa học [" + tenkhoahoc + "] thành công",
                    class_name: "gritter-error"
                });
            }

        }
    });
}
function Show_D_Modal(id, tenkhoahoc) {
    $('#ten').html(tenkhoahoc);
    $('#id').html(id);
    $('.modal-title').text("Xóa tài khoản");
    $('#modalcall_detele').modal('show');
}
$('#delete').click(function () {
    $.ajax({
        url: 'Delete',
        type: 'post',
        data: { id: $('#id').text() },
        dataType: 'json',
        success: function (data) {
            if (data.data) {
                Load();
                $('#modalcall_detele').modal('hide');
                $.gritter.add({
                    title: "Thông báo xóa",
                    text: "Xóa thành công!",
                    class_name: "gritter-success"
                });
            } else {
                $.gritter.add({
                    title: "Thông báo xóa",
                    text: "Xóa thất bại!",
                    class_name: "gritter-erorr"
                });
            }
        }
    });
});