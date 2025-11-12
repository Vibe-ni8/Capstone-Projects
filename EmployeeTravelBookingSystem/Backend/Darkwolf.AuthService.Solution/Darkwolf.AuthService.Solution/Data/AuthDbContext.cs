using Darkwolf.AuthService.Solution.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace Darkwolf.AuthService.Solution.Data;

public class AuthDbContext : DbContext
{
    public AuthDbContext(DbContextOptions<AuthDbContext> options) : base(options) { }

    public DbSet<Employee> Employees => Set<Employee>();

    public DbSet<Role> Roles => Set<Role>();

    public DbSet<EmployeeDetails> EmployeeDetails => Set<EmployeeDetails>();

    public DbSet<Location> Locations => Set<Location>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Employee>(b =>
        {
            b.ToTable("employee");
            b.HasKey(e => e.EmployeeId);

            b.Property(e => e.EmployeeId).HasColumnName("emp_id")
            .HasColumnType("Varchar(10)").HasMaxLength(10).IsRequired();

            b.Property(e => e.EmployeeName).HasColumnName("emp_name")
            .HasColumnType("Varchar(30)").HasMaxLength(30).IsRequired();

            b.Property(e => e.EmployeeEmail).HasColumnName("emp_email")
            .HasColumnType("Varchar(30)").HasMaxLength(30).IsRequired();

            b.Property(e => e.EmployeePassword).HasColumnName("emp_password")
            .HasColumnType("Varchar(100)").HasMaxLength(100).IsRequired();

            b.Property(e => e.RoleId).HasColumnName("role_id")
            .HasColumnType("Varchar(10)").HasMaxLength(10).IsRequired();

            b.Property(e => e.DeptId).HasColumnName("dept_id")
            .HasColumnType("Varchar(10)").HasMaxLength(10).IsRequired();

            b.Property(e => e.ResetToken).HasColumnName("reset_token")
            .HasColumnType("Varchar(10)").HasMaxLength(10);

            b.Property(e => e.TokenGeneratedDate).HasColumnName("token_generated_date")
            .HasColumnType("datetime");

            b.Property(e => e.Phone).HasColumnName("phone")
            .HasColumnType("Varchar(15)").HasMaxLength(15);

            b.Property(e => e.LocationId).HasColumnName("loc_id")
            .HasColumnType("Varchar(10)").HasMaxLength(10).IsRequired();
        });

        modelBuilder.Entity<Role>(b =>
        {
            b.ToTable("role");
            b.HasKey(e => e.RoleId);

            b.Property(e => e.RoleId).HasColumnName("role_id")
            .HasColumnType("Varchar(10)").HasMaxLength(10).IsRequired();

            b.Property(e => e.RoleName).HasColumnName("role_name")
            .HasColumnType("Varchar(30)").HasMaxLength(30).IsRequired();
        });

        modelBuilder.Entity<EmployeeDetails>(b =>
        {
            b.ToTable("emp_details");
            b.HasKey(e => e.EmpId);

            b.Property(e => e.EmpId).HasColumnName("emp_id")
            .HasColumnType("Varchar(10)").HasMaxLength(10).IsRequired();

            b.Property(e => e.ReportingManagerId).HasColumnName("reporting_mgr_id")
            .HasColumnType("Varchar(10)").HasMaxLength(10);

            b.Property(e => e.HomeManagerId).HasColumnName("home_mgr_id")
            .HasColumnType("Varchar(10)").HasMaxLength(10);

            b.Property(e => e.WorkManagerId).HasColumnName("wrk_mgr_id")
            .HasColumnType("Varchar(10)").HasMaxLength(10);
        });

        modelBuilder.Entity<Location>(b =>
        {
            b.ToTable("location");
            b.HasKey(e => e.LocationId);

            b.Property(e => e.LocationId).HasColumnName("loc_id")
            .HasColumnType("Varchar(10)").HasMaxLength(10).IsRequired();

            b.Property(e => e.LocationShortName).HasColumnName("loc_short_name")
            .HasColumnType("Varchar(30)").HasMaxLength(30).IsRequired();
            b.HasIndex(e => e.LocationShortName).IsUnique();
        });
    }
}
