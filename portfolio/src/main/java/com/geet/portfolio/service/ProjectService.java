package com.geet.portfolio.service;

import com.geet.portfolio.model.Project;
import com.geet.portfolio.repository.ProjectRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService {

    private final ProjectRepository repo;

    public ProjectService(ProjectRepository repo) {
        this.repo = repo;
    }

    public List<Project> getAll() {
        return repo.findAll();
    }

    public Project save(Project project) {
        return repo.save(project);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }
}
