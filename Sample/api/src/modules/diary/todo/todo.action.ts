import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, Request } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { CompleteTodoDTO } from './dto/complete-todo.dto';
import { CreateTodoDTO } from './dto/create-todo.dto';
import { UpdateTodoDTO } from './dto/update-todo.dto';
import { TodoBiz } from './todo.biz';
@Controller('/diary/todo')
export class TodoAction {
  constructor(private readonly todoBiz: TodoBiz) {}

  @Get()
  async todoList(@Request() req: FastifyRequest, @Query('yyyymm') yyyymm: string) {
    const userId = req.user.userId;
    return await this.todoBiz.list({ yyyymm, userId });
  }

  @Get('/:todoId')
  async todoDetail(@Request() req: FastifyRequest, @Param('todoId') todoId: string) {
    const userId = req.user.userId;
    return await this.todoBiz.detail({ todoId, userId });
  }

  @Post()
  async createTodo(@Request() req: FastifyRequest, @Body() createTodoDTO: CreateTodoDTO) {
    const userId = req.user.userId;
    createTodoDTO.userId = userId;
    await this.todoBiz.create(createTodoDTO);
  }
  @Put()
  async updateTodo(@Request() req: FastifyRequest, @Body() updateTodoDTO: UpdateTodoDTO) {
    const userId = req.user.userId;
    updateTodoDTO.userId = userId;
    await this.todoBiz.update(updateTodoDTO);
  }

  @Patch('/end')
  async completeTodo(@Request() req: FastifyRequest, @Body() completeTodoDTO: CompleteTodoDTO) {
    const userId = req.user.userId;
    completeTodoDTO.userId = userId;
    await this.todoBiz.complete(completeTodoDTO);
  }

  @Delete('/:todoId')
  async deleteTodo(@Request() req: FastifyRequest, @Param('todoId') todoId: string) {
    const userId = req.user.userId;
    await this.todoBiz.delete({ userId, todoId });
  }
}
