using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace TodoApp.Todos
{
    public class CreateUpdateTodoValidator : AbstractValidator<CreateUpdateTodoDto>
    {
        public CreateUpdateTodoValidator()
        {
                RuleFor(x=>x.Title).NotEmpty().MaximumLength(TodoAppConsts.GeneralTextMaxLength).WithErrorCode(TodoAppDomainErrorCodes.TODO_NOT_FOUND).WithMessage("Titel Is Invalid");
        }
    }
}
