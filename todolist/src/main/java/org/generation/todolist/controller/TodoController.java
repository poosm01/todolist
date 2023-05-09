package org.generation.todolist.controller;

import org.generation.todolist.controller.dto.TodoDTO;
import org.generation.todolist.repository.entity.Todo;
import org.generation.todolist.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Date;

@RestController
@RequestMapping("/api")
public class TodoController {


    private final ItemService itemService;

    // Dependency injection of the itemservice object so that the controller can call any methods in the itemserviceMySQL class
    public TodoController(@Autowired ItemService itemService) {
        this.itemService = itemService;
    }
    @CrossOrigin
    @GetMapping("/all")
    public Iterable<Todo> getItems() {
        return itemService.all();
    }

    @CrossOrigin
    @PostMapping("/save")
    public void saveOrUpdate(@RequestParam(name = "id", required = false) Integer id,
                             @RequestParam(name = "title", required = false) String title,
                             @RequestParam(name = "description", required = false) String description,
                             @RequestParam(name = "target", required = false)
                                 @DateTimeFormat(pattern = "yyyy-MM-dd") Date target) throws IOException {

       TodoDTO todoDto = new TodoDTO(title, description, target);
        if (id == null) {
            itemService.save(new Todo(todoDto));
        } else {
           Todo todo = itemService.findById(id);
            if (todo != null) {
                todo.setTitle(title);
                todo.setDescription(description);
                todo.setTarget(target);
                //todo=(itemDto);
            itemService.save(todo);
            }
        }
    }
    @CrossOrigin
    @DeleteMapping( "/{id}" )
    public void delete( @PathVariable Integer id )
    {
        itemService.delete( id );
    }

} // End of class