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
                    <td>`+ item.HoTen_GV + `</td>
                    <td>`+ item.NgaySinh + `</td>
                    <td><img src="../../HinhAnh/`+item.Anh+`" style="height:50px"/></td>
                    <td>`+ item.SDT + `</td>
                    <td>`+ item.Email + `</td>
                    <td class="details-control center">
                        <div class="hidden-sm hidden-xs action-buttons">
                            <a class="green" style="cursor:pointer" onclick='Show_AE_Modal("add",`+(-1)+`)'>
                                <i class="ace-icon fa fa-plus-circle bigger-130"></i>
                            </a>

                            <a class="" style="cursor:pointer;color:orange" onclick='Show_AE_Modal("edit",`+ item.ID + `)'>
                                <i class="ace-icon fa fa-pencil bigger-130"></i>
                            </a>

                            <a class="red" style="cursor:pointer" onclick="Show_D_Modal(`+ item.ID + `,'` + item.HoTen_GV + `')">
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
                                        <a onclick='Show_AE_Modal("add")' style="cursor:pointer" class="tooltip-info" data-rel="tooltip" title="" data-original-title="View">
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
                                        <a onclick="Show_D_Modal(`+ item.ID + `,'` + item.HoTen_GV + `')" style="cursor:pointer" class="tooltip-error" data-rel="tooltip" title="" data-original-title="Delete">
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
var index = "";
function Show_AE_Modal(type, i) {
    index = i;
    $("#sample-form").trigger("reset");
    CKEDITOR.instances['mota'].setData("");
    $('#review-img').removeAttr('src').attr('src', 'http://placehold.it/50');
    if (type == "add") {
        $('.modal-title').html("Thêm thông tin giảng viên");
        $('#btn-process').removeAttr('class data-type').addClass('btn btn-success btn-submit');
        $('#btn-process').text("Thêm");
        $('#idtaikhoan').removeAttr("readonly", "true");
        $('#modalcall').modal("show");
    }
    else {
        $('.modal-title').html("Sửa thông tin giảng viên");
        $('#btn-process').removeAttr('class').addClass('btn btn-warning btn-submit');
        $('#btn-process').text("Sửa");
        $.ajax({
            url: "LoadByID",
            type: "GET",
            data: { id: parseInt(i) },
            dataType: "Json",
            success: function (data) {
                $('#hotengv').val(data.data.HoTen_GV);
                $('#ngaysinh').val(data.data.NgaySinh);
                $('#sdt').val(data.data.SDT);
                $('#email').val(data.data.Email);
                $('#diachi').val(data.data.DiaChi);
                $('#sogiogiang').val(data.data.SoGioGiang);
                $('#luong').val(data.data.Luong);
                $('#anh').val(data.data.Anh);
                $('#idtaikhoan').val(data.data.IDTaiKhoan);
                $('#idtaikhoan').attr("readonly", "true");
                CKEDITOR.instances['mota'].setData(data.data.MoTa);

                $("#modalcall").modal("show");
            }
        });
    }
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
$('#btn-process').click(function () {
    var type = $('#btn-process').text();
    var getmota = CKEDITOR.instances['mota'].getData();
    var mota = encodeURI(getmota);
    //var mota2 = decodeURI(mota1);
    //console.log(mota2);
    var file = $("#file").get(0).files;
    var formData = new FormData();
    formData.append("id", index);
    formData.append("hotengv", $("#hotengv").val());
    formData.append("ngaysinh", $("#ngaysinh").val());
    formData.append("sdt", $("#sdt").val());
    formData.append("email", $("#email").val());
    formData.append("diachi", $("#diachi").val());
    formData.append("sogiogiang", $("#sogiogiang").val());
    formData.append("luong", $("#luong").val());
    formData.append("idtaikhoan", $("#idtaikhoan").val());
    formData.append("mota", mota);
    formData.append("anh", file[0]);
    $.ajax({
        url: 'Add_Edit',
        type: "post",
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
                    text: type + ' thành công',
                    class_name: 'gritter-success'
                });
            }
            else {
                $.gritter.add({
                    title: 'Thông báo ' + type,
                    text: type + ' thất bại',
                    class_name: 'gritter-error'
                });
            }
        }
    });
});
function Show_D_Modal(id, tengv) {
    $('#ten').html(tengv);
    $('#id').html(id);
    $('.modal-title').text("Xóa giảng viên");
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