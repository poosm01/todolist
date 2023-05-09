package org.generation.todolist.service;

import org.generation.todolist.repository.entity.Todo;

import java.util.ArrayList;

public interface ItemService {

    //save method is for 2 purposes - Create new item & Update existing item
    Todo save(Todo item);


    //Delete Dish from database - based on item Id
    void delete(int todoId);


    //Read all dish from database
    ArrayList<Todo> all();


    //Read an dish from database - based on dish Id
    Todo findById(int todoId);


}
