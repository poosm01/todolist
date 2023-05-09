package org.generation.todolist.controller.dto;

import java.util.Date;

public class TodoDTO {

    private String title;
    private String description;
    private Date target;

    public TodoDTO(String title, String description, Date target) {
        this.title = title;
        this.description = description;
        this.target = target;
    }


    public String getTitle() {
        return title;
    }


    public void setTitle(String title) {
        this.title = title;
    }


    public String getDescription() {
        return description;
    }


    public void setDescription(String description) {
        this.description = description;
    }


    public void setTarget(Date target) {
        this.target = target;
    }


    public Date getTarget() {
        return target;
    }


}
