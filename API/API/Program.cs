using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDataContext>();
builder.Services.AddCors(options =>
    options.AddPolicy("Acesso Total",
        configs => configs
            .AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod())
);

var app = builder.Build();


app.MapGet("/", () => "Prova A1");

//ENDPOINTS DE CATEGORIA
//GET: http://localhost:5000/api/categoria/listar
app.MapGet("/api/categoria/listar", ([FromServices] AppDataContext ctx) =>
{
    if (ctx.Categorias.Any())
    {
        return Results.Ok(ctx.Categorias.ToList());
    }
    return Results.NotFound("Nenhuma categoria encontrada");
});

//POST: http://localhost:5000/api/categoria/cadastrar
app.MapPost("/api/categoria/cadastrar", ([FromServices] AppDataContext ctx, [FromBody] Categoria categoria) =>
{
    ctx.Categorias.Add(categoria);
    ctx.SaveChanges();
    return Results.Created("", categoria);
});

//ENDPOINTS DE TAREFA
//GET: http://localhost:5000/api/tarefas/listar
app.MapGet("/api/tarefas/listar", ([FromServices] AppDataContext ctx) =>
{
    if (ctx.Tarefas.Any())
    {
        return Results.Ok(ctx.Tarefas.Include(x => x.Categoria).ToList());
    }
    return Results.NotFound("Nenhuma tarefa encontrada");
});

//POST: http://localhost:5000/api/tarefas/cadastrar
app.MapPost("/api/tarefas/cadastrar", ([FromServices] AppDataContext ctx, [FromBody] Tarefa tarefa) =>
{
    Categoria? categoria = ctx.Categorias.Find(tarefa.CategoriaId);
    if (categoria == null)
    {
        return Results.NotFound("Categoria não encontrada");
    }
    tarefa.Categoria = categoria;
    ctx.Tarefas.Add(tarefa);
    ctx.SaveChanges();
    return Results.Created("", tarefa);
});

//PUT: http://localhost:5000/tarefas/alterar/{id}
app.MapPut("/api/tarefas/alterar/{TarefaId}", ([FromRoute] string TarefaId,
    [FromBody] Tarefa tarefaAlterada,
    [FromServices] AppDataContext ctx) =>
{
    Tarefa? tarefa = ctx.Tarefas.Find(TarefaId);
    if (tarefa is null)
    {
        return Results.NotFound();
    }
    tarefa.Titulo = tarefaAlterada.Titulo;
    tarefa.Descricao = tarefaAlterada.Descricao;
    tarefa.Titulo = tarefaAlterada.Titulo;
    if (tarefa.Status == "Não iniciada")
    {
        tarefaAlterada.Status = "Em Andamento";
    }
    else
    {
        tarefaAlterada.Status = "Concluído";
    }
    tarefa.Status = tarefaAlterada.Status;
    ctx.Tarefas.Update(tarefa);
    ctx.SaveChanges();
    if (tarefaAlterada.Status == "Em Andamento")
    {
        tarefaAlterada.Status = "Concluído";
    }
    return Results.Ok(tarefa);


});

//GET: http://localhost:5000/api/tarefas/buscar
app.MapGet("/api/tarefas/buscar/{TarefaId}", ([FromRoute] string TarefaId, [FromServices] AppDataContext ctx) =>
{

    Tarefa? tarefa = ctx.Tarefas.Find(TarefaId);
    if (tarefa == null)
    {
        return Results.NotFound("Tarefa não encontrada!");
    }
    return Results.Ok(tarefa);
});

//GET: http://localhost:5000/tarefas/naoconcluidas
app.MapGet("/api/tarefas/naoconcluidas", ([FromServices] AppDataContext ctx) =>
{
    //TODO: Implementar metodo
});

//GET: http://localhost:5000/tarefas/concluidas
app.MapGet("/api/tarefas/concluidas", ([FromServices] AppDataContext ctx) =>
{
    //TODO: Implementar metodo
});




app.UseCors("Acesso Total");

app.Run();
