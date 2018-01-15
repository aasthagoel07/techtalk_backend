using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using techtalk2;

namespace techtalk2.Controllers
{
    public class EventTablesController : ApiController
    {
        private techtalk2Entities db = new techtalk2Entities();

        // GET: api/EventTables
        public IQueryable<EventTable> GetEventTables()
        {
            return db.EventTables;
        }

        // GET: api/EventTables/5
        [ResponseType(typeof(EventTable))]
        public IHttpActionResult GetEventTable(int id)
        {
            EventTable eventTable = db.EventTables.Find(id);
            if (eventTable == null)
            {
                return NotFound();
            }

            return Ok(eventTable);
        }

        // PUT: api/EventTables/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutEventTable(int id, EventTable eventTable)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != eventTable.ID)
            {
                return BadRequest();
            }

            db.Entry(eventTable).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EventTableExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/EventTables
        [ResponseType(typeof(EventTable))]
        public IHttpActionResult PostEventTable(EventTable eventTable)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.EventTables.Add(eventTable);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (EventTableExists(eventTable.ID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = eventTable.ID }, eventTable);
        }

        // DELETE: api/EventTables/5
        [ResponseType(typeof(EventTable))]
        public IHttpActionResult DeleteEventTable(int id)
        {
            EventTable eventTable = db.EventTables.Find(id);
            if (eventTable == null)
            {
                return NotFound();
            }

            db.EventTables.Remove(eventTable);
            db.SaveChanges();

            return Ok(eventTable);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool EventTableExists(int id)
        {
            return db.EventTables.Count(e => e.ID == id) > 0;
        }
    }
}