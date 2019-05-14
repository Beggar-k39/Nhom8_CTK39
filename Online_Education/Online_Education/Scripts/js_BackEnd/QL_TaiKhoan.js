// Controller TaiKhoan JS
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
				var checked = (item.TrangThai) ? 'checked' : '';
				html += `<tr>
					<td>`+ i + `</td>
					<td>`+ item.TenDangNhap + `</td>
					<td>`+ ShowTenTaiKhoan(item.ID,item.IDChucVu) + `</td>
					<td>`+ item.NgayTao + `</td>
					<td class="text-center">
						<label>
							<input name="switch-field-1" class="ace ace-switch ace-switch-6" type="checkbox" `+ checked + ` onchange=status(` + item.ID + `,` + item.TrangThai + `) >
							<span class="lbl"></span>
						</label>
					</td>
					<td>`+ ShowChucVu(item.IDChucVu) + `</td>
					<td class="details-control center">
						<div class="hidden-sm hidden-xs action-buttons">
							<a class="green" style="cursor:pointer" onclick='Show_AE_Modal("add")'>
								<i class="ace-icon fa fa-plus-circle bigger-130"></i>
							</a>

							<a class="" style="cursor:pointer;color:orange" onclick='Show_AE_Modal("edit",`+ item.ID + `)'>
								<i class="ace-icon fa fa-pencil bigger-130"></i>
							</a>

							<a class="red" style="cursor:pointer" onclick="Show_D_Modal(`+ item.ID + `,'` + item.TenDangNhap + `')">
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
										<a onclick="Show_D_Modal(`+ item.ID + `,'` + item.TenDangNhap + `')" style="cursor:pointer" class="tooltip-error" data-rel="tooltip" title="" data-original-title="Delete">
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
function ShowTenTaiKhoan(id,idcv) {
    var x = "";
    $.ajax({
        url: "GetTenTaiKhoan",
        data: { id: id,idcv:idcv },
        dataType: 'json',
        async: false,
        success: function (data) {
            x = data.data;
        }
    });
    return x;
}
function ShowChucVu(id) {
	var x = "";
	$.ajax({
		url: "FindChucVu",
		type: "GET",
		data: { id: id },
		dataType: "json",
		async: false,
		success: function (data) {
			x = data.data;
		}
	});
	return x;
}
function status(id) {
	$.ajax({
		url: "SwitchesControl",
		type: "GET",
		data: { id: id },
		dataType: "json",
		success: function (data) {
			data.status ? $.gritter.add({ title: "Thông báo", text: "Kích hoạt tài khoản [" + data.name + "] thành công!", class_name: "gritter-success", time: 500 }) : $.gritter.add({ title: "Thông báo", text: "Vô hiệu hóa tài khoản [" + data.name + "] thành công!", class_name: "gritter-error", time: 1000 })
		}
	});
}
var index = "";
function Show_AE_Modal(type, i) {
	index = i;
	eraserEffect();
	$("#sample-form").trigger("reset");
	$('#chucvu').html(LayChucVu());
	if (type == "add") {
		$('.modal-title').html("Thêm Tài khoản");
		$('#btn-process').removeAttr('class data-type').addClass('btn btn-success btn-submit');
		$('#btn-process').text("Thêm");

		$('#modalcall').modal("show");
	}
	else {
		$('.modal-title').html("Sửa tài khoản");
		$('#btn-process').removeAttr('class').addClass('btn btn-warning btn-submit');
		$('#btn-process').text("Sửa");
		$.ajax({
			url: "LoadByID",
			type: "GET",
			data: { id: parseInt(i) },
			dataType: "Json",
			success: function (data) {
				$('#tendangnhap').val(data.data.TenDangNhap);
				$('#matkhau').val(data.data.MatKhau);
				data.data.TrangThai ? $('#trangthai').attr('checked', "true") : $('#trangthai').removeAttr('checked', "false");
				$('#chucvu').val(data.data.IDChucVu);

				$("#modalcall").modal("show");
			}
		});
	}
}
function LayChucVu() {
	var html = "";
	$.ajax({
		url: "LayChucVu",
		type: "GET",
		async: false,
		success: function (data) {
			if (data.data) {

				$.each(data.data, function (i, row) {
					html += `<option value="` + row.ID + `">` + row.TenChucVu + `</option>`
				});
			}
		}
	});
	return html;
}
function eraserEffect() {
	$('#sample-form').html(`<div class="form-group has-info tendangnhap-color">
						<label style="font-weight:bold" for="tendangnhap" class="col-xs-12 col-sm-2 control-label no-padding-right">Tên đăng nhập</label>

						<div class="col-xs-12 col-sm-7">
							<span class="block input-icon input-icon-right">
								<input type="text" id="tendangnhap" name="tendangnhap" class="width-100" onkeydown="validate()" onblur="validate()">
								<i class="ace-icon fa fa-info-circle tendangnhap-ic"></i>
							</span>
						</div>
						<div class="help-block col-xs-12 col-sm-reset inline tendangnhap-text" style="visibility:hidden">Không đc bỏ trống </div>
					</div>
					<div class="form-group has-info matkhau-color">
						<label style="font-weight:bold" for="matkhau" class="col-xs-12 col-sm-2 control-label no-padding-right">Mật khẩu</label>
						<div class="col-xs-12 col-sm-7">
							<span class="block input-icon input-icon-right">
								<input type="text" id="matkhau" name="matkhau" class="width-100" onkeydown="validate()" onblur="validate()">
								<i class="ace-icon fa fa-info-circle matkhau-ic"></i>
							</span>
						</div>
						<div class="help-block col-xs-12 col-sm-reset inline matkhau-text" style="visibility:hidden">Không đc bỏ trống </div>
					</div>
					<div class="form-group has-info trangthai-color">
						<label style="font-weight:bold" for="trangthai" class="col-xs-12 col-sm-2 control-label no-padding-right">Trạng thái</label>
						<div class="col-xs-12 col-sm-7">
									<span class="block input-icon input-icon-right">
									<input id="trangthai" name="switch-field-1" class="ace ace-switch ace-switch-6" type="checkbox">
									<span class="lbl"></span>
							</span>
						</div>
						<div class="help-block col-xs-12 col-sm-reset inline trangthai-text" style="visibility:hidden">Không đc bỏ trống </div>
					</div>
					<div class="form-group has-info chucvu-color">
						<label style="font-weight:bold" for="chucvu" class="col-xs-12 col-sm-2 control-label no-padding-right">Chức vụ</label>
						<div class="col-xs-12 col-sm-7">
							<select id="chucvu" class="form-control">
							</select>
						</div>
						<div class="help-block col-xs-12 col-sm-reset inline chucvu-text" style="visibility:hidden">Không đc bỏ trống </div>
					</div>`);
}
function validate() {
	var tendangnhap = $('#tendangnhap').val();
	var matkhau = $('#matkhau').val();
	var l = $('#sample-form').find('input[type="text"]').length;
	var count = 0;
	if (tendangnhap.trim() == "") {
		$('.tendangnhap-color').removeClass('has-info').addClass('has-error');
		$('.tendangnhap-ic').removeClass('fa-info-circle fa-check-circle').addClass('fa-times-circle');
		$('.tendangnhap-text').removeAttr('style').attr("style", "visiblity:visible");
	}
	else {
		$('.tendangnhap-color').removeClass('has-error has-info').addClass('has-success');
		$('.tendangnhap-ic').removeClass('fa-times-circle fa-info-circle').addClass('fa-check-circle');
		$('.tendangnhap-text').removeAttr("style").attr("style", "visibility:hidden");
		count++;
	}
	if (matkhau.trim() == "") {
		$('.matkhau-color').removeClass('has-info').addClass('has-error');
		$('.matkhau-ic').removeClass('fa-info-circle fa-check-circle').addClass('fa-times-circle');
		$('.matkhau-text').removeAttr('style').attr("style", "visiblity:visible");
	}
	else {
		$('.matkhau-color').removeClass('has-error has-info').addClass('has-success');
		$('.matkhau-ic').removeClass('fa-times-circle fa-info-circle').addClass('fa-check-circle');
		$('.matkhau-text').removeAttr("style").attr("style", "visibility:hidden");
		count++;
	}
	return count = count == l ? true : false;

}
$('#btn-process').click(function () {
	var type = $('#btn-process').text();
	console.log($('#tendangnhap').val());
	console.log($('#matkhau').val());
	console.log($("#trangthai").is(":checked"));
	console.log($('#chucvu').val());
	if (validate()) {
		$.ajax({
			url: 'Add_Edit',
			type: "post",
			data: { id: index, tendangnhap: $('#tendangnhap').val(), matkhau: $('#matkhau').val(), trangthai: $('#trangthai').is(':checked'), chucvu: $('#chucvu').val() },
			dataType: "json",
			cache: false,
			success: function (data) {
				if (data.data) {
					Load();
					$("#modalcall").modal("hide");
					$.gritter.add({
						title: 'Thông báo ' + type,
						text: type + " [" + $('#tendangnhap').val() + "] " + ' thành công',
						class_name: 'gritter-success'
					});
				}
				else {
					$.gritter.add({
						title: 'Thông báo ' + type,
						text: type + " [" + $('#tendangnhap').val() + "] " + ' thất bại',
						class_name: 'gritter-error'
					});
				}
			}
		});
	}
});
function Show_D_Modal(id, tendangnhap) {
	$('#ten').html(tendangnhap);
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