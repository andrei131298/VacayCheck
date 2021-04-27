using VacayCheck.Contexts;
using VacayCheck.Models;
using VacayCheck.Repositories;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using AutoMapper;
using VacayCheck.Repositories.ApartmentRepository;
using VacayCheck.Repositories.CityRepository;
using VacayCheck.Repositories.FavouriteRepository;
using VacayCheck.Repositories.OwnerRepository;
using VacayCheck.Repositories.PropertyRepository;
using VacayCheck.Repositories.ReservationRepository;
using VacayCheck.Repositories.UserRepository;
using VacayCheck.Repositories.PhotoRepository;
using VacayCheck.Repositories.ExchangeRequestRepository;

namespace VacayCheck
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddDbContext<Context>(options => options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

            services.Configure<AppSettings>(Configuration.GetSection("AppSettings"));

            services.AddCors();
            //services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
            services.AddDbContext<Context>(options => options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
            services.AddTransient<ICityRepository, CityRepository>();
            services.AddTransient<IApartmentRepository, ApartmentRepository>();
            services.AddTransient<IFavouriteRepository, FavouriteRepository>();
            services.AddTransient<IOwnerRepository, OwnerRepository>();
            services.AddTransient<IPropertyRepository, PropertyRepository>();
            services.AddTransient<IReservationRepository, ReservationRepository>();
            services.AddTransient<IUserRepository, UserRepository>();
            services.AddTransient<IPhotoRepository, PhotoRepository>();
            services.AddTransient<IExchangeRequestRepository, ExchangeRequestRepository>();
            services.Configure<AppSettings>(Configuration.GetSection("AppSettings"));

            services.AddControllersWithViews().AddNewtonsoftJson(options =>
            options.SerializerSettings
            .ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);
            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseRouting();

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            if (!env.IsDevelopment())
            {
                app.UseSpaStaticFiles();
            }
            
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseAngularCliServer(npmScript: "start");
                    //spa.UseProxyToSpaDevelopmentServer("http://localhost:4200");
                }
            });
        }
    }
}
