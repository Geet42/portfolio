package com.geet.portfolio.controller;

import com.geet.portfolio.model.Project;
import com.geet.portfolio.service.ProjectService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/admin")
public class AdminController {


    private final ProjectService service;


    public AdminController(ProjectService service) {
        this.service = service;
    }


    @PostMapping("/projects")
    public Project addProject(
            @RequestHeader("X-ADMIN-TOKEN") String token,
            @RequestBody Project project) {


        if (!token.equals("ADMIN_SECRET_TOKEN")) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        }
        return service.save(project);
    }
}