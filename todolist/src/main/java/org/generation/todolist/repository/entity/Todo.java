package org.generation.todolist.repository.entity;

//Repository package is part of the Model Component (MVC)
//Item is the entity class to use to map against the table from the database

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import org.generation.todolist.controller.dto.TodoDTO;

import java.util.Date;

@Entity
public class Todo {

    //Properties/attributes - will be mapped to the columns of the database table
    //Need to use the Wrapper class on primitive data types - need to pass the datatype
    // as an object to CRUDRepository Class (provided by SpringBoot framework)


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;             //retrieve product item by ID - has to be an object
    private String title;
    private String description;
    private Date target;

    public Todo() {}


    public Todo(TodoDTO todoDTO)
    {
        //Transfer the object (with the data) to Entity Class for mapping with the
        // database table columns and to be able to save the data in the columns
        this.title = todoDTO.getTitle();
        this.description = todoDTO.getDescription();
        this.target = todoDTO.getTarget();
    }
    public Integer getId()
    {
        return id;
    }
    public void setId( Integer id )
    {
        this.id = id;
    }
    public String getTitle()
    {
        return title;
    }
    public void setTitle( String title )
    {
        this.title = title;
    }
    public String getDescription()
    {
        return description;
    }
    public void setDescription( String description )
    {
        this.description = description;
    }
    public Date getTarget()
    {
        return target;
    }
    public void setTarget( Date target )
    {
        this.target = target;
    }




    @Override
    public String toString()
    {
        return "Todo{" + "id=" + id + ", title='" + title + '\'' + ", description='" +
                description + '\'' + ", target date='"
                + target + '}';
    }
}

