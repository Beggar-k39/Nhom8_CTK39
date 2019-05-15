using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Online_Education.Areas.Admin.Models;
namespace Online_Education.ChucNang
{
    public class GiangVienD
    {

        OnlineEducationEntities db = null;

        public GiangVienD()
        {
            db = new OnlineEducationEntities();
        }

        public List<GiangVien> ListAll()
        {
            return db.GiangViens.OrderBy(x => x.HoTen_GV).Take(4).ToList();
        }

        public GiangVien ViewDetail(int id)
        {
            return db.GiangViens.Find(id);
        }
    }
}