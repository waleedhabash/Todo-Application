using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using static TodoApp.Todos.Todo;

namespace TodoApp.Todos
{
    public class CreateUpdateTodoDto :EntityDto<Guid>
    {
        [Required]
        [MaxLength(100)]
        public string Title { get; set; }
        public string Description { get; set; }
        public TodoStatus Status { get; set; } 
        public TodoPriority Priority { get; set; } 
        public DateTime? DueDate { get; set; } = null;
        public DateTime CreatedDate { get; set; }
        public DateTime LastModifiedDate { get; set; }
        
    }
}
