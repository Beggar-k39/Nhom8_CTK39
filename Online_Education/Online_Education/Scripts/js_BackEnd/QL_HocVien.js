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
                    <td>`+ item.HoTen + `</td>
                    <td>`+ item.NgaySinh + `</td>
                    <td>`+ item.SDT + `</td>
                    <td>`+ item.Email+ `</td>
                    <td>`+ item.DiaChi + `</td>
                    <td>`+ item.IDTaiKhoan + `</td>
                    <td class="details-control center">
                        <div class="hidden-sm hidden-xs action-buttons">
                            <a class="green" style="cursor:pointer" onclick='Show_AE_Modal("add")'>
                                <i class="ace-icon fa fa-plus-circle bigger-130"></i>
                            </a>

                            <a class="" style="cursor:pointer;color:orange" onclick='Show_AE_Modal("edit",`+ item.ID + `)'>
                                <i class="ace-icon fa fa-pencil bigger-130"></i>
                            </a>

                            <a class="red" style="cursor:pointer" onclick="Show_D_Modal(`+ item.ID + `,'` + item.HoTen + `')">
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
                                        <a onclick="Show_D_Modal(`+ item.ID + `,'` + item.HoTen + `')" style="cursor:pointer" class="tooltip-error" data-rel="tooltip" title="" data-original-title="Delete">
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
    if (type == "add") {
        $('.modal-title').html("Thêm thông tin học viên");
        $('#btn-process').removeAttr('class data-type').addClass('btn btn-success btn-submit');
        $('#btn-process').text("Thêm");

        $('#modalcall').modal("show");
    }
    else {
        $('.modal-title').html("Sửa thông tin học viên");
        $('#btn-process').removeAttr('class').addClass('btn btn-warning btn-submit');
        $('#btn-process').text("Sửa");
        $.ajax({
            url: "LoadByID",
            type: "GET",
            data: { id: parseInt(i) },
            dataType: "Json",
            success: function (data) {
                $('#hoten').val(data.data.HoTen);
                $('#ngaysinh').val(data.data.NgaySinh);
                $('#sdt').val(data.data.SDT);
                $('#email').val(data.data.Email);
                $('#diachi').val(data.data.DiaChi);
                $('#idtaikhoan').val(data.data.IDTaiKhoan);
                $('#idtaikhoan').attr("readonly", "true");

                $("#modalcall").modal("show");
            }
        });
    }
}
$('#btn-process').click(function () {
    var type = $('#btn-process').text();
        $.ajax({
            url: 'Add_Edit',
            type: "post",
            data: { id: index, hoten: $('#hoten').val(), ngaysinh: $('#ngaysinh').val(), sdt: $('#sdt').val(), email: $('#email').val(), diachi: $('#diachi').val(), idtaikhoan:$('#idtaikhoan').val() },
            dataType: "json",
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
function Show_D_Modal(id, tenlkh) {
    $('#ten').html(tenlkh);
    $('#id').html(id);
    $('#modal-title').text("Xóa loại khóa học");
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
