package com.geet.portfolio.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PortfolioController {

    @GetMapping("/")
    public String home() { return "index"; }

    @GetMapping("/projects")
    public String projects() { return "projects"; }

    @GetMapping("/resume")
    public String resume() { return "resume"; }

    @GetMapping("/contact")
    public String contact() { return "contact"; }
}
