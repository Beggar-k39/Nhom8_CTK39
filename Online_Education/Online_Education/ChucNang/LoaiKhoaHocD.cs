using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Online_Education.Areas.Admin.Models;
namespace Online_Education.ChucNang
{
    public class LoaiKhoaHocD
    {
        OnlineEducationEntities db = null;

        public LoaiKhoaHocD()
        {
            db = new OnlineEducationEntities();
        }

        public List<LoaiKhoaHoc> ListAll()
        {
            return db.LoaiKhoaHocs.OrderBy(x => x.TenLoaiKhoaHoc).ToList();
        }

        public LoaiKhoaHoc ViewDetail(int id)
        {
            return db.LoaiKhoaHocs.Find(id);
        }
    }
}