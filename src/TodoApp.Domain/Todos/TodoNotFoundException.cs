using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp;

namespace TodoApp.Todos
{
    public class TodoNotFoundException : BusinessException
    {
        public TodoNotFoundException(Guid guid) : base(TodoAppDomainErrorCodes.TODO_NOT_FOUND)
        {
            WithData("id", guid);
        }
    }
}
