﻿using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using techtalk2;

namespace techtalk2.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class Admin_TableController : ApiController
    {
        private techtalk2Entities1 db = new techtalk2Entities1();

        //Admin Login Check
        [HttpPost]
        public IHttpActionResult LoginCheck(Admin_Table user)
        {
            Admin_Table foundUser = db.Admin_Table.Where(a => a.Admin_username.Equals(user.Admin_username)).FirstOrDefault();
            if (foundUser == null)
                return NotFound();
            else if (foundUser != null && user.Admin_password.Equals(foundUser.Admin_password))
                return Ok("Correct");
            else
                return NotFound();
        }



       



    //    // GET: api/Admin_Table
    //    public IQueryable<Admin_Table> GetAdmin_Table()
    //    {
    //        return db.Admin_Table;
    //    }

    //    // GET: api/Admin_Table/5
    //    [ResponseType(typeof(Admin_Table))]
    //    public IHttpActionResult GetAdmin_Table(int id)
    //    {
    //        Admin_Table admin_Table = db.Admin_Table.Find(id);
    //        if (admin_Table == null)
    //        {
    //            return NotFound();
    //        }

    //        return Ok(admin_Table);
    //    }

    //    // PUT: api/Admin_Table/5
    //    [ResponseType(typeof(void))]
    //    public IHttpActionResult PutAdmin_Table(int id, Admin_Table admin_Table)
    //    {
    //        if (!ModelState.IsValid)
    //        {
    //            return BadRequest(ModelState);
    //        }

    //        if (id != admin_Table.ID)
    //        {
    //            return BadRequest();
    //        }

    //        db.Entry(admin_Table).State = EntityState.Modified;

    //        try
    //        {
    //            db.SaveChanges();
    //        }
    //        catch (DbUpdateConcurrencyException)
    //        {
    //            if (!Admin_TableExists(id))
    //            {
    //                return NotFound();
    //            }
    //            else
    //            {
    //                throw;
    //            }
    //        }

    //        return StatusCode(HttpStatusCode.NoContent);
    //    }

    //    // POST: api/Admin_Table
    //    [ResponseType(typeof(Admin_Table))]
    //    public IHttpActionResult PostAdmin_Table(Admin_Table admin_Table)
    //    {
    //        if (!ModelState.IsValid)
    //        {
    //            return BadRequest(ModelState);
    //        }

    //        db.Admin_Table.Add(admin_Table);
    //        db.SaveChanges();

    //        return CreatedAtRoute("DefaultApi", new { id = admin_Table.ID }, admin_Table);
    //    }

    //    // DELETE: api/Admin_Table/5
    //    [ResponseType(typeof(Admin_Table))]
    //    public IHttpActionResult DeleteAdmin_Table(int id)
    //    {
    //        Admin_Table admin_Table = db.Admin_Table.Find(id);
    //        if (admin_Table == null)
    //        {
    //            return NotFound();
    //        }

    //        db.Admin_Table.Remove(admin_Table);
    //        db.SaveChanges();

    //        return Ok(admin_Table);
    //    }

    //    protected override void Dispose(bool disposing)
    //    {
    //        if (disposing)
    //        {
    //            db.Dispose();
    //        }
    //        base.Dispose(disposing);
    //    }

    //    private bool Admin_TableExists(int id)
    //    {
    //        return db.Admin_Table.Count(e => e.ID == id) > 0;
    //    }
    }
}