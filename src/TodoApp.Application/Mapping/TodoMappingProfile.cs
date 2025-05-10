using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TodoApp.Todos;

namespace TodoApp.Mapping
{
    public class TodoMappingProfile:Profile
    {
        public TodoMappingProfile()
        {
            CreateMap<CreateUpdateTodoDto, Todo>();
            CreateMap<Todo,TodosDto>(); 
        }
    }
}
