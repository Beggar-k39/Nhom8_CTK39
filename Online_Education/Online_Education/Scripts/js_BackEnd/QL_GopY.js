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
                    <td>`+ item.Email + `</td>
                    <td>`+ item.ChuDe + `</td>
                    <td>`+ item.SDT + `</td>
                    <td>`+ item.NoiDung + `</td>
                    <td class="details-control center">
                        <div class="hidden-sm hidden-xs action-buttons">
                            <a class="green" style="cursor:not-allowed" onclick='Show_AE_Modal("add")'>
                                <i class="ace-icon fa fa-plus-circle bigger-130"></i>
                            </a>

                            <a style="cursor:not-allowed;color:orange" onclick='Show_AE_Modal("edit",`+ item.ID + `)'>
                                <i class="ace-icon fa fa-pencil bigger-130"></i>
                            </a>

                            <a class="red" style="cursor:pointer" onclick="Show_D_Modal(`+ item.ID + `,'` + item.Email + `')">
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
                                        <a onclick='Show_AE_Modal("add")' style="cursor:not-allowed" class="tooltip-info" data-rel="tooltip" title="" data-original-title="View">
                                            <span class="green">
                                                <i class="ace-icon fa fa-plus-circle bigger-120"></i>
                                            </span>
                                        </a>
                                    </li>

                                    <li>
                                        <a onclick='Show_AE_Modal("edit",`+ item.ID + `)' style="cursor:not-allowed;color:orange" class="tooltip-success" data-rel="tooltip" title="" data-original-title="Edit">
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
function Show_D_Modal(id, email) {
    $('#ten').html(email);
    $('#id').html(id);
    $('.modal-title').text("Xóa góp ý");
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