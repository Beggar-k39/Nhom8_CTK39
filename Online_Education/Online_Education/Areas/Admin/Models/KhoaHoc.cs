//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Online_Education.Areas.Admin.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class KhoaHoc
    {
        public int ID { get; set; }
        public string TenKhoaHoc { get; set; }
        public string MoTa { get; set; }
        public string Anh { get; set; }
        public Nullable<decimal> HocPhi { get; set; }
        public string ThoiGianBatDau { get; set; }
        public string ThoiGianKetThuc { get; set; }
        public string LichHoc { get; set; }
        public Nullable<bool> TrangThai { get; set; }
        public string MetaTitle { get; set; }
        public Nullable<int> IDLoaiKhoaHoc { get; set; }
        public Nullable<int> IDGiangVien { get; set; }
    }
}
