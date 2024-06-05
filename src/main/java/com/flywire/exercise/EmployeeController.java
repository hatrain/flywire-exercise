package com.flywire.exercise;
import java.io.File;
import java.util.List;
import java.util.Arrays;
import java.util.Comparator;
import java.util.Date;
import java.io.IOException;
import java.io.InputStream;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.core.io.ClassPathResource;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.stream.Collectors;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;

@RestController
@RequestMapping("/employees")
public class EmployeeController {

    private List<Employee> employees;

    public EmployeeController() throws IOException {
        this.employees = readEmployeesFromFile();
    }

    private List<Employee> readEmployeesFromFile() throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        DateFormat df = new SimpleDateFormat("dd/MM/yyyy");
        objectMapper.setDateFormat(df);
        InputStream inputStream = new ClassPathResource("json/data.json").getInputStream();
        return new ArrayList<>(Arrays.asList(objectMapper.readValue(inputStream, Employee[].class)));
    }

    @GetMapping("/active")
    public ResponseEntity<List<Employee>> getActiveEmployees() {
        List<Employee> activeEmployees = employees.stream()
            .filter(Employee::isActive)
            .sorted(Comparator.comparing(e -> e.getName().split(" ")[1]))
            .collect(Collectors.toList());
        return ResponseEntity.ok(activeEmployees);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable String id) {
        Employee employee = employees.stream()
            .filter(e -> e.getId().equals(id))
            .findFirst()
            .orElse(null);
        return employee != null ? ResponseEntity.ok(employee) : ResponseEntity.notFound().build();
    }

    @GetMapping("/hired")
    public ResponseEntity<List<Employee>> getEmployeesHiredWithinRange(
        @RequestParam("startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date startDate, 
        @RequestParam("endDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date endDate) {
        List<Employee> employeesInRange = employees.stream()
            .filter(e -> !e.getDateHired().before(startDate) && !e.getDateHired().after(endDate))
            .sorted(Comparator.comparing(Employee::getDateHired).reversed())
            .collect(Collectors.toList());
        

        return ResponseEntity.ok(employeesInRange);
    }

    @PostMapping("/")
    public ResponseEntity<Employee> createEmployee(@RequestBody Employee newEmployee) throws IOException {
        employees.add(newEmployee);
        ObjectMapper objectMapper = new ObjectMapper();
        DateFormat df = new SimpleDateFormat("dd/MM/yyyy");
        objectMapper.setDateFormat(df);
        File file = new ClassPathResource("json/data.json").getFile();
        objectMapper.writeValue(file, employees);
        return ResponseEntity.ok(newEmployee);
    }

    @PutMapping("/{id}/deactivate")
    public ResponseEntity<Employee> deactivateEmployee(@PathVariable String id) throws IOException {
        Employee employee = employees.stream()
            .filter(e -> e.getId().equals(id))
            .findFirst()
            .orElse(null);
        if (employee != null) {
            employee.setActive(false);
            ObjectMapper objectMapper = new ObjectMapper();
            DateFormat df = new SimpleDateFormat("dd/MM/yyyy");
            objectMapper.setDateFormat(df);
            File file = new ClassPathResource("json/data.json").getFile();
            objectMapper.writeValue(file, employees);
            return ResponseEntity.ok(employee);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}