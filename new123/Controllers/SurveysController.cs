using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using Microsoft.Owin.Security;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using System.Linq;
using System.Threading.Tasks;
using System.Net;
using System.Web;
using System.Web.Mvc;
using new123.Models;

namespace new123.Controllers
{
    public class SurveysController : Controller
    {
        private SurveyDbEntities db = new SurveyDbEntities();

        // GET: Surveys
        public async Task<ActionResult> Index()
        {
              
            ApplicationUser user = System.Web.HttpContext.Current.GetOwinContext().GetUserManager<ApplicationUserManager>().FindByName(System.Web.HttpContext.Current.User.Identity.GetUserName());

            if (user == null)
            {
                return RedirectToAction("login", "Account");
            }
            
            return View(await db.Surveys.Where(i=>i.SupplierID.Equals(user.Id)).ToListAsync());
        }

        // GET: Surveys/Details/5
        public async Task<ActionResult> Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Survey survey = await db.Surveys.FindAsync(id);
            if (survey == null)
            {
                return HttpNotFound();
            }
            return View(survey);
        }

        // GET: Surveys/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Surveys/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Create([Bind(Include = "SurveyName,SurveyJson")] Survey survey)
        {
            if (ModelState.IsValid)
            {
                ApplicationUser user = System.Web.HttpContext.Current.GetOwinContext().GetUserManager<ApplicationUserManager>().FindByName(System.Web.HttpContext.Current.User.Identity.GetUserName());
                survey.SupplierID = user.Id;
                survey.CategoryID = 0;
                survey.NumberOfQuestion = 0;
                survey.Discontinued = false;
                db.Surveys.Add(survey);
                await db.SaveChangesAsync();
                survey.createMG();
                return RedirectToAction("Index");
            }
            return View(survey);
        }

        // GET: Surveys/Edit/5
        public async Task<ActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Survey survey = await db.Surveys.FindAsync(id);
            if (survey == null)
            {
                return HttpNotFound();
            }
            return View(survey);
        }

        // POST: Surveys/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Edit([Bind(Include = "SurveyID,SurveyName,SupplierID,CategoryID,NumberOfQuestion,SurveyJson,Discontinued")] Survey survey)
        {
            if (ModelState.IsValid)
            {
                db.Entry(survey).State = EntityState.Modified;
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }
            return View(survey);
        }


        public async Task<ActionResult> pushlish(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Survey survey = await db.Surveys.FindAsync(id);
            if (survey == null)
            {
                return HttpNotFound();
            }
            ApplicationUser user = System.Web.HttpContext.Current.GetOwinContext().GetUserManager<ApplicationUserManager>().FindByName(System.Web.HttpContext.Current.User.Identity.GetUserName());

            if (user == null || !user.Id.Equals(survey.SupplierID))
            {
                return RedirectToAction("Error");
            }
            survey.Discontinued = !survey.Discontinued;
            db.Entry(survey).State = EntityState.Modified;
            await db.SaveChangesAsync();
            return RedirectToAction("Index");
            //return View(survey);
        }


        // GET: Surveys/Delete/5
        public async Task<ActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Survey survey = await db.Surveys.FindAsync(id);
            if (survey == null)
            {
                return HttpNotFound();
            }
            return View(survey);
        }

        // POST: Surveys/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> DeleteConfirmed(int id)
        {
            Survey survey = await db.Surveys.FindAsync(id);
            db.Surveys.Remove(survey);
            await db.SaveChangesAsync();
            return RedirectToAction("Index");
        }

        public async Task<ActionResult> Error()
        {
            return View();
        }
        public async Task<ActionResult> jEdit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Survey survey = await db.Surveys.FindAsync(id);
            if (survey == null)
            {
                return HttpNotFound();
            }
            ApplicationUser user = System.Web.HttpContext.Current.GetOwinContext().GetUserManager<ApplicationUserManager>().FindByName(System.Web.HttpContext.Current.User.Identity.GetUserName());

            if (user == null || !user.Id.Equals(survey.SupplierID))
            {
                return RedirectToAction("Error");
            }
            return View(survey);
        }
        public async Task<ActionResult> Preview(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Survey survey = await db.Surveys.FindAsync(id);
            if (survey == null)
            {
                return HttpNotFound();
            }
            ApplicationUser user = System.Web.HttpContext.Current.GetOwinContext().GetUserManager<ApplicationUserManager>().FindByName(System.Web.HttpContext.Current.User.Identity.GetUserName());

            if (user == null || !user.Id.Equals(survey.SupplierID))
            {
                return RedirectToAction("Error");
            }
            return View(survey);
        }

        public async Task<ActionResult> Form(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Survey survey = await db.Surveys.FindAsync(id);
            if (survey == null)
            {
                return HttpNotFound();
            }

            if (survey.Discontinued)
            {
                return HttpNotFound();
            }
            return View(survey);
        }

        public async Task<ActionResult> Report(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Survey survey = await db.Surveys.FindAsync(id);
            if (survey == null)
            {
                return HttpNotFound();
            }
            ApplicationUser user = System.Web.HttpContext.Current.GetOwinContext().GetUserManager<ApplicationUserManager>().FindByName(System.Web.HttpContext.Current.User.Identity.GetUserName());

            if (user == null || !user.Id.Equals(survey.SupplierID))
            {
                return RedirectToAction("Error");
            }
            return View(survey);
        }

        public string jsolution(int id)
        {
            if (User.Identity.Name.Equals(""))
            {
            }
            Survey survey = db.Surveys.FindAsync(id).Result;
            ApplicationUser user = System.Web.HttpContext.Current.GetOwinContext().GetUserManager<ApplicationUserManager>().FindByName(System.Web.HttpContext.Current.User.Identity.GetUserName());
            if (survey == null)
            {
                RedirectToAction("Error");
            }
            if (user == null || !user.Id.Equals(survey.SurveyID))
            {
                RedirectToAction("Error");
            }



            return survey.SolutionJson();
        }

        public string jdit(int id)
        {
            if (User.Identity.Name.Equals(""))
            {
            }
            Survey survey = db.Surveys.FindAsync(id).Result;
            ApplicationUser user = System.Web.HttpContext.Current.GetOwinContext().GetUserManager<ApplicationUserManager>().FindByName(System.Web.HttpContext.Current.User.Identity.GetUserName());
            if (survey == null)
            {
                RedirectToAction("Error");
            }
           if (user== null || !user.Id.Equals(survey.SurveyID))
            {
                RedirectToAction("Error");
            }



            return survey.json();
        }



        public Boolean updateSurvey(int id,string json)
        {

            if (User.Identity.Name.Equals(""))
            {
            }
            Survey survey = db.Surveys.FindAsync(id).Result;
            ApplicationUser user = System.Web.HttpContext.Current.GetOwinContext().GetUserManager<ApplicationUserManager>().FindByName(System.Web.HttpContext.Current.User.Identity.GetUserName());
            if (survey == null)
            {
                RedirectToAction("Error");
            }
            if (user == null || !user.Id.Equals(survey.SurveyID))
            {
                RedirectToAction("Error");
            }
            survey.Updatejson(json);

            
            return true;
        }


        public Boolean submitResponse(int id, string json)
        {

            if (User.Identity.Name.Equals(""))
            {
            }
            Survey survey = db.Surveys.FindAsync(id).Result;
            ApplicationUser user = System.Web.HttpContext.Current.GetOwinContext().GetUserManager<ApplicationUserManager>().FindByName(System.Web.HttpContext.Current.User.Identity.GetUserName());
            if (survey == null)
            {
                RedirectToAction("Error");
            }
            if (user == null || !user.Id.Equals(survey.SurveyID))
            {
                RedirectToAction("Error");
            }
            survey.SubmitResponseToDatabase(json);


            return true;
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
