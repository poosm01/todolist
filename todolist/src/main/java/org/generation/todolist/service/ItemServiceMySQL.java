package org.generation.todolist.service;

import org.generation.todolist.repository.TodoRepository;
import org.generation.todolist.repository.entity.Todo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class ItemServiceMySQL implements ItemService {

    //ItemServiceMySQL class will provide all the implementation of all the methods that is provided in the interface

    //which class object is this class dependent on?
    //This ItemServiceMySQL class has to depend on another class object to perform
    // actions (e.g. save, delete, all, findItemById
    //dependent object class is the CRUDRepository class that is provided by Spring boot

    //to perform dependency injection -> access the CRUDRepository class through the
    // ItemRepository interface that we have created

    //ItemRepository is an interface that extends CrudRepository interface
    private final TodoRepository todoRepository;



    //Dependency Injection of another class object to this class object can be done with
    // @Autowired annotation

    public ItemServiceMySQL(@Autowired TodoRepository todoRepository)
    {
        this.todoRepository = todoRepository;
}


    @Override
    public Todo save(Todo todo)
    {
        //Since we have done the dependency injection of the dishRepository, therefore now we can call any method from the CrudRepository class
        return this.todoRepository.save(todo);

    }


    @Override
    public void delete(int todoId)
    {
       this.todoRepository.deleteById(todoId);
    }


    @Override
    public ArrayList<Todo> all()
    {
        // 1. @Query class provide by spring boot : select * from dish
        // 2. Repository class provided by spring boot. we do not need to write a single query
        ArrayList<Todo> result = new ArrayList<>();
        todoRepository.findAll().forEach(result::add);
        return result;

    }


    @Override
    public Todo findById(int todoId)
    {
        //Optional is list that accept either a null or with todo
        Optional<Todo> todo = todoRepository.findById(todoId);
        Todo itemResponse = todo.get();
        return itemResponse;

    }



}
