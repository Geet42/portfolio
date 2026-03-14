package com.geet.portfolio.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtFilter jwtFilter;

    public SecurityConfig(JwtFilter jwtFilter) {
        this.jwtFilter = jwtFilter;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
                // Enable CORS
                .cors(cors -> {})

                // Disable CSRF for stateless APIs
                .csrf(AbstractHttpConfigurer::disable)

                .authorizeHttpRequests(auth -> auth

                        // Allow all preflight requests (important for frontend)
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                        // Public docs & health
                        .requestMatchers(
                                "/swagger-ui/**",
                                "/swagger-ui.html",
                                "/v3/api-docs/**",
                                "/swagger-resources/**",
                                "/webjars/**",
                                "/actuator/**"
                        ).permitAll()

                        // Public frontend routes
                        .requestMatchers(
                                "/",
                                "/projects",
                                "/contact",
                                "/resume"
                        ).permitAll()

                        // Static assets
                        .requestMatchers(
                                "/css/**",
                                "/js/**",
                                "/images/**"
                        ).permitAll()

                        // ⭐ VERY IMPORTANT: Public Portfolio API (READ ONLY)
                        .requestMatchers(HttpMethod.GET, "/api/projects").permitAll()

                        // Secure all other API endpoints (admin, create, delete, etc.)
                        .requestMatchers("/api/**").authenticated()

                        // Allow everything else
                        .anyRequest().permitAll()
                )

                // Stateless session (JWT-based)
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )

                // Add JWT filter before Spring auth filter
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
