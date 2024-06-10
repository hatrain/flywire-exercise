package com.flywire.exercise;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.Date;
import java.util.List;

public class Employee {

    private String id;
    private String name;
    private String position;
    private List<String> directReports;
    private String manager;
    private boolean isActive;

    @JsonProperty("hireDate")
    private Date dateHired;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public List<String> getDirectReports() {
        return directReports;
    }

    public void setDirectReports(List<String> directReports) {
        this.directReports = directReports;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean isActive) {
        this.isActive = isActive;
    }

    public Date getDateHired() {
        return dateHired;
    }

    public void setDateHired(Date dateHired) {
        this.dateHired = dateHired;
    }
}