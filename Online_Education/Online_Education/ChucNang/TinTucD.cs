using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Online_Education.Areas.Admin.Models;
namespace Online_Education.ChucNang
{
    public class TinTucD
    {

        OnlineEducationEntities db = null;

        public TinTucD()
        {
            db = new OnlineEducationEntities();
        }

        public List<TinTuc> ListAll()
        {
            return db.TinTucs.Where(x => x.TrangThai == true).OrderBy(x => x.TieuDe).ToList();
        }

        public TinTuc ViewDetail(long id)
        {
            return db.TinTucs.Find(id);
        }

    }
}