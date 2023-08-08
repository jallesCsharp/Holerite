using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Holerite.Infra.Data
{
    public static class DbInitialization
    {
        public static async Task EnsureMigrations(this IApplicationBuilder applicationBuilder)
        {
            //var context = serviceProvider.GetService<HoleriteContext>();

            //if (context.Database == null)
            //    return;

            //await context.Database.MigrateAsync();

            using (var serviceScope = applicationBuilder.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetService<HoleriteContext>();
                if (context.Database == null)
                    return;
                context.Database.Migrate();
            }
        }
    }
}