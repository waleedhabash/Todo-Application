using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TodoApp.Bases;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Domain.Repositories;
using System.Linq.Dynamic.Core;
using Microsoft.EntityFrameworkCore;
using System.Threading;
namespace TodoApp.Todos
{
    public class TodoAppService : BaseApplicationService, ITodoAppService
    {
        private readonly IRepository<Todo, Guid> todosRepository;

        public TodoAppService(IRepository<Todo, Guid> todosRepository)
        {
            this.todosRepository = todosRepository;
        }
        public async Task<TodosDto> CreateTodoAsync(CreateUpdateTodoDto input)
        {
            var validateResult= new CreateUpdateTodoValidator().Validate(input);
            if (!validateResult.IsValid)
            {
                var exception = GetValidationException(validateResult);
                throw exception;
            }
            var todo = new Todo(GuidGenerator.Create(), input.Title, input.Status, input.Priority,  input.CreatedDate, input.LastModifiedDate, input.Description, input.DueDate);
            var inserted = await todosRepository.InsertAsync(todo,autoSave:true);
            return ObjectMapper.Map<Todo,TodosDto>(inserted);
        }

        public async Task<bool> DeleteTodoAsync(Guid guid)
        {
            var existingTodo= await todosRepository.GetAsync(guid);
            if (existingTodo == null)
            {
                return false;
            }
            await todosRepository.DeleteAsync(existingTodo);
            return true;
        }

       

        public async Task<PagedResultDto<TodosDto>> GetListAsync(GetTodoListDto input)
        {
           if (input.Sorting.IsNullOrWhiteSpace())
            {
                input.Sorting=nameof(Todo.Id);
            }
           var todos= await todosRepository.WithDetailsAsync().Result.AsQueryable().WhereIf(!input.Filter.IsNullOrWhiteSpace(), todos=>todos.Status.ToString().Contains(input.Filter)).Skip(input.SkipCount).Take(input.MaxResultCount).OrderBy(input.Sorting).ToListAsync();
            var totalCount = input.Filter == null ? await todosRepository.CountAsync() :await todosRepository.CountAsync(todos=> todos.Status.ToString().Contains(input.Filter));
            return new PagedResultDto<TodosDto>(totalCount,ObjectMapper.Map<List<Todo>,List<TodosDto>>(todos));
        }

        public async Task<TodosDto> GetTodoAsync(Guid guid)
        {
            var todo = await todosRepository.WithDetailsAsync().Result.FirstOrDefaultAsync(x=> x.Id== guid);
            if (todo==null)
            {
                throw new TodoNotFoundException(guid);
            }
            return ObjectMapper.Map<Todo,TodosDto>(todo);
        }

        public async Task<TodosDto> UpdateTodoAsync(CreateUpdateTodoDto input)
        {

            var existing = await todosRepository.GetAsync(input.Id);
            if (existing==null)
            {
                throw new TodoNotFoundException(input.Id);
            }
            var validateResult = new CreateUpdateTodoValidator().Validate(input);
            if (!validateResult.IsValid)
            {
                var exception = GetValidationException(validateResult);
                throw exception;
            }
            var mapped = ObjectMapper.Map<CreateUpdateTodoDto, Todo>(input, existing);
            var updated = await todosRepository.UpdateAsync(mapped,autoSave:true);
            return ObjectMapper.Map<Todo,TodosDto>(updated);

        }
    }
}
