using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(new123.Startup))]
namespace new123
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
