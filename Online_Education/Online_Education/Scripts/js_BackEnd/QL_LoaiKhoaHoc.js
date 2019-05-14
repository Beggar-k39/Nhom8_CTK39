$('.modal').keydown(function (e) {
    if (e.keyCode == 13) {
        $('.btn-submit').click();
    }
});
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
                    <td>`+ item.TenLoaiKhoaHoc + `</td>
                    <td>`+ item.MoTa + `</td>
                    <td class="details-control center">
                        <div class="hidden-sm hidden-xs action-buttons">
                            <a class="green" style="cursor:pointer" onclick='Show_AE_Modal("add")'>
                                <i class="ace-icon fa fa-plus-circle bigger-130"></i>
                            </a>

                            <a class="" style="cursor:pointer;color:orange" onclick='Show_AE_Modal("edit",`+ item.ID + `)'>
                                <i class="ace-icon fa fa-pencil bigger-130"></i>
                            </a>

                            <a class="red" style="cursor:pointer" onclick="Show_D_Modal(`+ item.ID + `,'` + item.TenLoaiKhoaHoc + `')">
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
                                        <a onclick="Show_D_Modal(`+ item.ID + `,'` + item.TenLoaiKhoaHoc + `')" style="cursor:pointer" class="tooltip-error" data-rel="tooltip" title="" data-original-title="Delete">
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
    eraserEffect();
    $("#sample-form").trigger("reset");
    if (type == "add") {
        $('.modal-title').html("Thêm Loại khóa học");
        $('#btn-process').removeAttr('class data-type').addClass('btn btn-success btn-submit');
        $('#btn-process').text("Thêm");

        $('#modalcall').modal("show");
    }
    else {
        $('.modal-title').html("Sửa Loại khóa học");
        $('#btn-process').removeAttr('class').addClass('btn btn-warning btn-submit');
        $('#btn-process').text("Sửa");
        $.ajax({
            url: "LoadByID",
            type: "GET",
            data: { id: parseInt(i) },
            dataType: "Json",
            success: function (data) {
                $('#tenlkh').val(data.data.TenLoaiKhoaHoc);
                $('#mota').val(data.data.MoTa);

                $("#modalcall").modal("show");
            }
        });
    }
}
function eraserEffect() {
    $('#sample-form').html(`<div class="form-group has-info tenlkhcolor">
                        <label style="font-weight:bold" for="tenlkh" class="col-xs-12 col-sm-1 control-label no-padding-right">Tên</label>

                        <div class="col-xs-12 col-sm-8">
                            <span class="block input-icon input-icon-right">
                                <input type="text" id="tenlkh" class="width-100" onkeydown="validate()" onblur="validate()">
                                <i class="ace-icon fa fa-info-circle tenlkhic"></i>
                            </span>
                        </div>
                        <div class="help-block col-xs-12 col-sm-reset inline tenlkhtext" style="visibility:hidden">Không đc bỏ trống </div>
                    </div>
                    <div class="form-group has-info motacolor">
                        <label style="font-weight:bold" for="tenlkh" class="col-xs-12 col-sm-1 control-label no-padding-right">Mô tả</label>

                        <div class="col-xs-12 col-sm-8">
                            <span class="block input-icon input-icon-right">
                                <input type="text" id="mota" class="width-100" onkeydown="validate()" onblur="validate()" >
                                <i class="ace-icon fa fa-info-circle motaic"></i>
                            </span>
                        </div>
                        <div class="help-block col-xs-12 col-sm-reset inline motatext" style="visibility:hidden">Không đc bỏ trống </div>
                    </div>`);
}
function validate() {
    var tenlkh = $('#tenlkh').val();
    var mota = $('#mota').val();
    var l = $('#sample-form').find('input').length;
    var count = 0;
    if (tenlkh.trim() == "") {
        $('.tenlkhcolor').removeClass('has-info').addClass('has-error');
        $('.tenlkhic').removeClass('fa-info-circle fa-check-circle').addClass('fa-times-circle');
        $('.tenlkhtext').removeAttr('style').attr("style", "visiblity:visible");
    }
    else {
        $('.tenlkhcolor').removeClass('has-error has-info').addClass('has-success');
        $('.tenlkhic').removeClass('fa-times-circle fa-info-circle').addClass('fa-check-circle');
        $('.tenlkhtext').removeAttr("style").attr("style", "visibility:hidden");
        count++;
    }
    if (mota.trim() == "") {
        $('.motacolor').removeClass('has-info').addClass('has-error');
        $('.motaic').removeClass('fa-info-circle fa-check-circle').addClass('fa-times-circle');
        $('.motatext').removeAttr('style').attr("style", "visiblity:visible");
    }
    else {
        $('.motacolor').removeClass('has-error has-info').addClass('has-success');
        $('.motaic').removeClass('fa-times-circle fa-info-circle').addClass('fa-check-circle');
        $('.motatext').removeAttr("style").attr("style", "visibility:hidden");
        count++;
    }
    return count = count == l ? true : false;

}
$('#btn-process').click(function () {
    var type = $('#btn-process').text();
    if (validate()) {
        $.ajax({
            url: 'Add_Edit',
            type: "post",
            data: { id: index, tenlkh: $('#tenlkh').val(), mota: $('#mota').val() },
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
    }
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
