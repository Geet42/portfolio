package com.geet.portfolio.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;
import java.util.Collections;

@Component
public class JwtFilter extends OncePerRequestFilter {

    private static final String TOKEN = "READ_ONLY_PORTFOLIO_TOKEN";

    @Override
    protected void doFilterInternal(HttpServletRequest req,
                                    HttpServletResponse res,
                                    FilterChain chain)
            throws IOException, ServletException {

        String path = req.getRequestURI();

        // List of public endpoints that don't need JWT
        if (isPublicEndpoint(path)) {
            chain.doFilter(req, res);
            return;
        }

        // For /api/* endpoints, require JWT
        if (path.startsWith("/api/")) {
            String auth = req.getHeader("Authorization");

            if (auth != null && auth.equals("Bearer " + TOKEN)) {
                // Set authentication in SecurityContext
                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken("api-user", null, Collections.emptyList());
                SecurityContextHolder.getContext().setAuthentication(authentication);
            } else {
                res.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                return;
            }
        }

        chain.doFilter(req, res);
    }

    private boolean isPublicEndpoint(String path) {
        return path.startsWith("/actuator") ||
                path.startsWith("/swagger-ui") ||
                path.startsWith("/v3/api-docs") ||
                path.startsWith("/swagger-resources") ||
                path.startsWith("/webjars") ||

                // ⭐ CRITICAL FIX: Make portfolio API public
                path.startsWith("/api/projects") ||

                // Frontend routes
                path.equals("/") ||
                path.startsWith("/projects") ||
                path.startsWith("/resume") ||
                path.startsWith("/contact") ||

                // Static assets
                path.startsWith("/css") ||
                path.startsWith("/js") ||
                path.startsWith("/images");
    }

}