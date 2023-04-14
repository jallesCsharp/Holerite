using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Holerite.Infra.Data
{
    public static class DbInitialization
    {
        public static async Task EnsureMigrations(this IApplicationBuilder applicationBuilder)
        {
            using (var serviceScope = applicationBuilder.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetService<HoleriteContext>();
                await context.Database.MigrateAsync();
            }
        }
    }
}
