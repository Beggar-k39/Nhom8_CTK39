using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Online_Education.Areas.Admin.Models;
namespace Online_Education.ChucNang
{
    public class KhoaHocD
    {
        OnlineEducationEntities db = null;

        public KhoaHocD()
        {
            db = new OnlineEducationEntities();
        }

        public List<KhoaHoc> ListAll()
        {
            return db.KhoaHocs.Where(x => x.TrangThai == true).OrderBy(x => x.TenKhoaHoc).ToList();
        }

        public List<KhoaHoc> List4()
        {
            return db.KhoaHocs.Where(x => x.TrangThai == true).OrderBy(x => x.ThoiGianBatDau).Take(4).ToList();
        }


        public KhoaHoc ViewDetail(long id)
        {
            return db.KhoaHocs.Find(id);
        }

    }
}