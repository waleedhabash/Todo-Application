using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Volo.Abp.Account;
using Volo.Abp.Application.Dtos;

namespace TodoApp.Todos
{
    public interface ITodoAppService
    {
        Task<TodosDto> CreateTodoAsync(CreateUpdateTodoDto input);
        Task<TodosDto> UpdateTodoAsync(CreateUpdateTodoDto input);
        Task<TodosDto> GetTodoAsync(Guid guid);
        Task<bool> DeleteTodoAsync(Guid guid);
        Task<PagedResultDto<TodosDto>> GetListAsync(GetTodoListDto input);
       


    }
}
