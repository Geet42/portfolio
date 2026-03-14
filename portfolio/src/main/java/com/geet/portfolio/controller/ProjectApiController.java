package com.geet.portfolio.controller;

import com.geet.portfolio.model.Project;
import com.geet.portfolio.service.ProjectService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
@RestController
@RequestMapping("/api/projects")
public class ProjectApiController {

    private final ProjectService service;

    public ProjectApiController(ProjectService service) {
        this.service = service;
    }

    @GetMapping
    public List<Project> getProjects() {
        return service.getAll();
    }

    @PostMapping
    public Project createProject(
            @RequestHeader("X-ADMIN-TOKEN") String token,
            @RequestBody Project project) {

        if (!token.equals("ADMIN_SECRET_TOKEN")) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        }
        return service.save(project);
    }

    @DeleteMapping("/{id}")
    public void deleteProject(
            @RequestHeader("X-ADMIN-TOKEN") String token,
            @PathVariable Long id) {

        if (!token.equals("ADMIN_SECRET_TOKEN")) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        }
        service.delete(id);
    }
}

