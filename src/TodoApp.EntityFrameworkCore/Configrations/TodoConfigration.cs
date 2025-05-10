using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TodoApp.Todos;
using Volo.Abp.EntityFrameworkCore.Modeling;

namespace TodoApp.Configrations
{
    internal class TodoConfigration : IEntityTypeConfiguration<Todo>
    {
        public void Configure(EntityTypeBuilder<Todo> builder)
        {
            builder.ConfigureByConvention();
           builder.Property(x=> x.Title).IsRequired();
            builder.Property(x=> x.Title).HasMaxLength(TodoAppConsts.GeneralTextMaxLength);
            builder.ToTable("Todos");
        }
    }
}
