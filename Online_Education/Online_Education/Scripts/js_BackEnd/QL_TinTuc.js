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
                    <td>`+ item.TieuDe + `</td>
                    <td>`+ item.TomTat + `</td>
                    <td>`+ item.NoiDung + `</td>
                    <td>`+ item.MetaTitle + `</td>
                    <td style="text-align:center"> 
                        <input onchange="ProcessStatus(`+ item.ID + `,'` + item.TieuDe + `')" name = "switch-field-1" class="ace ace-switch ace-switch-6" type = "checkbox" ` + (item.TrangThai ? "checked" : "") + `>
                        <span class="lbl"></span>
                    </td>
                    <td class="details-control center">
                        <div class="hidden-sm hidden-xs action-buttons">
                            <a class="green" style="cursor:pointer" onclick='Show_AE_Modal("add",-1)'>
                                <i class="ace-icon fa fa-plus-circle bigger-130"></i>
                            </a>

                            <a class="" style="cursor:pointer;color:orange" onclick='Show_AE_Modal("edit",`+ item.ID + `)'>
                                <i class="ace-icon fa fa-pencil bigger-130"></i>
                            </a>

                            <a class="red" style="cursor:pointer" onclick="Show_D_Modal(`+ item.ID + `,'` + item.TieuDe + `')">
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
                                        <a onclick='Show_AE_Modal("add",-1)' style="cursor:pointer" class="tooltip-info" data-rel="tooltip" title="" data-original-title="View">
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
                                        <a onclick="Show_D_Modal(`+ item.ID + `,'` + item.TieuDe + `')" style="cursor:pointer" class="tooltip-error" data-rel="tooltip" title="" data-original-title="Delete">
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
    $('#trangthai').removeAttr('checked', "false")
    $('.metatitle-color').attr("style", "display:none");
    CKEDITOR.instances['noidung'].setData("");
    //eraserEffect();
    $("#sample-form").trigger("reset");
    if (type == "add") {
        $('.modal-title').html("Thêm Tin tức");
        $('#btn-process').removeAttr('class data-type').addClass('btn btn-success btn-submit');
        $('#btn-process').text("Thêm");
        $('#modalcall').modal("show");
    }
    else {
        $('.modal-title').html("Sửa tin tức");
        $('#btn-process').removeAttr('class').addClass('btn btn-warning btn-submit');
        $('.metatitle-color').removeAttr("style");
        $('#btn-process').text("Sửa");

        $.ajax({
            url: "LoadByID",
            type: "GET",
            data: { id: parseInt(i) },
            dataType: "Json",
            success: function (data) {
                $('#tieude').val(data.data.TieuDe);
                $('#tomtat').val(data.data.TomTat);
                $('#metatitle').val(data.data.MetaTitle);
                console.log(data.data.NoiDung)
                CKEDITOR.instances['noidung'].setData(data.data.NoiDung);
                data.data.TrangThai ? $('#trangthai').attr('checked', "true") : $('#trangthai').removeAttr('checked', "true");

                $("#modalcall").modal("show");
            }
        });
    }
}
$('#btn-process').click(function () {
    var type = $('#btn-process').text();
    var getnoidung = CKEDITOR.instances['noidung'].getData();
    var noidung = encodeURI(getnoidung);
    //var noidung2 = decodeURI(noidung1);
    //console.log(noidung2);
    var formData = new FormData();
    formData.append("id", index);
    formData.append("tieude", $("#tieude").val());
    formData.append("tomtat", $("#tomtat").val());
    formData.append("trangthai", $('#trangthai').is(':checked'));
    formData.append("idtk", $("#idtk").val());
    formData.append("noidung", noidung);
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
function ProcessStatus(id, tieude) {
    $.ajax({
        url: "ProcessStatus",
        type: "post",
        data: { id: parseInt(id) },
        success: function (data) {
            if (data.data) {
                $.gritter.add({
                    title: "Thông báo",
                    text: "Kích hoạt tin tức <b>[" + tieude + "]</b> thành công!",
                    class_name: "gritter-success",
                    time: 1000
                });
            } else {
                $.gritter.add({
                    title: "Thông báo",
                    text: "Vô hiệu hóa tin tức <b>[" + tieude + "]</b> thành công!",
                    class_name: "gritter-error",
                    time: 1000
                });
            }
        }
    })
}
function Show_D_Modal(id, tieude) {
    $('#ten').html(tieude);
    $('#id').html(id);
    $('.modal-title').text("Xóa tin tức");
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