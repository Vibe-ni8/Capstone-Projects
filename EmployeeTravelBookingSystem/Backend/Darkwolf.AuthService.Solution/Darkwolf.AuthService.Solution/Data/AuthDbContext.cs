using Darkwolf.AuthService.Solution.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace Darkwolf.AuthService.Solution.Data;

public class AuthDbContext : DbContext
{
    public AuthDbContext(DbContextOptions<AuthDbContext> options) : base(options) { }

    public DbSet<Employee> Employees => Set<Employee>();

    public DbSet<Role> Roles => Set<Role>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Employee>(b =>
        {
            b.ToTable("employee");
            b.HasKey(e => e.EmpId);

            b.Property(e => e.EmpId).HasColumnName("emp_id")
            .HasColumnType("Varchar(10)").HasMaxLength(10);

            b.Property(e => e.EmpName).HasColumnName("emp_name")
            .HasColumnType("Varchar(30)").HasMaxLength(30).IsRequired();

            b.Property(e => e.EmpEmail).HasColumnName("emp_email")
            .HasColumnType("Varchar(30)").HasMaxLength(30).IsRequired();

            b.Property(e => e.EmpPassword).HasColumnName("emp_password")
            .HasColumnType("Varchar(100)").HasMaxLength(100).IsRequired();

            b.Property(e => e.RoleId).HasColumnName("role_id")
            .HasColumnType("Varchar(10)").HasMaxLength(10).IsRequired();

            b.Property(e => e.DeptId).HasColumnName("dept_id")
            .HasColumnType("Varchar(10)").HasMaxLength(10).IsRequired();

            b.Property(e => e.Otp).HasColumnName("otp")
            .HasColumnType("Varchar(10)").HasMaxLength(10);

            b.Property(e => e.OtpGeneratedDate).HasColumnName("otp_generated_date")
            .HasColumnType("datetime");
        });

        modelBuilder.Entity<Role>(b =>
        {
            b.ToTable("role");
            b.HasKey(e => e.RoleId);

            b.Property(e => e.RoleId).HasColumnName("role_id")
            .HasColumnType("Varchar(10)").HasMaxLength(10);

            b.Property(e => e.RoleName).HasColumnName("role_name")
            .HasColumnType("Varchar(30)").HasMaxLength(30).IsRequired();
        });
    }
}
