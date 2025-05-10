using JetBrains.Annotations;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Volo.Abp.Domain.Entities.Auditing;

namespace TodoApp.Todos
{
    public class Todo: FullAuditedAggregateRoot<Guid>
    {
       
        public string Title { get; set; }
        public string Description { get; set; }
        public TodoStatus Status { get; set; } 
        public TodoPriority Priority { get; set; } 
        public DateTime? DueDate { get; set; } = null;
        public DateTime CreatedDate { get; set; }
        public DateTime LastModifiedDate { get; set; }
        public enum  TodoStatus
        {
            Pending,
            InProgress,
            Completed
        }

        public enum TodoPriority
        {
            Low,
            Medium,
            High
        }
        private Todo()
        {

        }
        public Todo(Guid id,  string title, TodoStatus status, TodoPriority priority,  DateTime createddate, DateTime lastmodifieddate, [CanBeNull] string description = null, [CanBeNull] DateTime? duedate = null) : base(id)
        {
            Title= title;
            Description = description;
            Status = status;
            Priority = priority;
            CreatedDate= createddate;
            LastModifiedDate= lastmodifieddate;
            DueDate= duedate;

        }
    }
}
