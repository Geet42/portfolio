package com.geet.portfolio.config;

import com.geet.portfolio.model.Project;
import com.geet.portfolio.repository.ProjectRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class DataLoader {

    @Bean
    CommandLineRunner loadData(ProjectRepository repo) {
        return args -> {

            if (repo.count() == 0) {

                // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                // DISTRIBUTED SYSTEMS & RESILIENCE ENGINEERING
                // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

                Project p1 = new Project();
                p1.setTitle("Distributed Event Booking & Payment Microservices System");
                p1.setDescription("""
                        Architected a fault-tolerant distributed microservices system for university event booking
                        with API Gateway, Event Service, Booking Service, and Payment Service. Implemented
                        payment-gated confirmations, retry mechanisms, and service coordination to prevent
                        overbooking under concurrent requests. Containerised and stress-tested using Docker
                        and PostgreSQL for production-grade backend performance.
                        """);
                p1.setHighlights(List.of(
                        "Handled concurrent booking requests with zero overbooking",
                        "Payment-gated confirmation with strict correctness guarantees",
                        "End-to-end tested using Docker Compose & REST APIs"
                ));
                p1.setTechStack(List.of(
                        "Java 17", "Spring Boot", "Spring Cloud Gateway", "PostgreSQL",
                        "Docker", "Microservices", "REST APIs"
                ));


                Project p2 = new Project();
                p2.setTitle("Banking Microservices with Resilience, Circuit Breaker & Chaos Testing");
                p2.setDescription("""
                        Designed a resilient banking microservices system with circuit breaker patterns,
                        retry logic with exponential backoff, and chaos testing using Chaos Toolkit.
                        Evaluated system stability under simulated failures, network delays, and unstable
                        backend behaviour. Reduced API latency from 800ms to 150ms and achieved
                        high uptime with graceful service fallbacks.
                        """);
                p2.setHighlights(List.of(
                        "Reduced API latency from 800ms to 150ms",
                        "Circuit Breaker + Retry with Exponential Backoff",
                        "Chaos engineering to validate fault tolerance"
                ));
                p2.setTechStack(List.of(
                        "Java", "Spring Boot", "Resilience4j", "Docker",
                        "Chaos Toolkit", "Kubernetes", "Distributed Systems"
                ));


                Project p3 = new Project();
                p3.setTitle("Communication Architecture: Socket vs REST vs gRPC Comparison");
                p3.setDescription("""
                        Implemented TCP socket communication, RESTful APIs (Spring Boot/Flask), and gRPC
                        services in both Java and Python. Built benchmarking scripts to compare latency,
                        scalability, and throughput across protocols. Demonstrated architectural trade-offs
                        between coupling, speed, and extensibility in distributed environments.
                        """);
                p3.setHighlights(List.of(
                        "Benchmarked latency across Socket, REST, and gRPC",
                        "Dual-language implementation (Java + Python)",
                        "Dockerised all services for consistent testing"
                ));
                p3.setTechStack(List.of(
                        "Java", "Python", "Spring Boot", "Flask",
                        "gRPC", "Docker", "TCP Sockets"
                ));


                Project p4 = new Project();
                p4.setTitle("Distributed Database Replication & Consistency Experiments");
                p4.setDescription("""
                        Explored replication strategies and consistency models in distributed NoSQL databases.
                        Configured multi-node clusters, experimented with strong vs eventual consistency,
                        simulated node failures, and analysed system behaviour in relation to the CAP Theorem,
                        availability, and data integrity across distributed nodes.
                        """);
                p4.setHighlights(List.of(
                        "Configured multi-node NoSQL clusters",
                        "Tested strong vs eventual consistency under failures",
                        "Analysed CAP Theorem trade-offs with real experiments"
                ));
                p4.setTechStack(List.of(
                        "MongoDB", "Docker", "Replication",
                        "CAP Theorem", "NoSQL", "Distributed Systems"
                ));


                // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                // CLOUD & MICROSERVICES
                // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

                Project p5 = new Project();
                p5.setTitle("Cloud-Native Student Management Microservices System");
                p5.setDescription("""
                        Developed a containerised CRUD web application using Flask (frontend), FastAPI (backend),
                        PostgreSQL (database), and Adminer GUI. Orchestrated using Docker Compose with full
                        create, read, update, and delete operations and clean microservices architecture
                        with API-based communication between services.
                        """);
                p5.setHighlights(List.of(
                        "Full CRUD with Flask + FastAPI microservices",
                        "Docker Compose orchestration with 4 services",
                        "PostgreSQL with Adminer GUI for data management"
                ));
                p5.setTechStack(List.of(
                        "Flask", "FastAPI", "PostgreSQL",
                        "Docker", "REST APIs", "Microservices"
                ));


                // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                // AI / ML / DEEP LEARNING
                // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

                Project p6 = new Project();
                p6.setTitle("Citrus Disease Detection using Deep Learning (Published – JISEM 2025)");
                p6.setDescription("""
                        Peer-reviewed research project presenting a CNN-based deep learning system for
                        automated citrus fruit and leaf disease detection. Trained on preprocessed datasets
                        with data augmentation (rotation, flipping, zooming). Achieved 95% accuracy for fruits
                        and 99% for leaves. Published in JISEM 2025.
                        """);
                p6.setHighlights(List.of(
                        "95-99% model accuracy on disease classification",
                        "Published research in JISEM 2025",
                        "Real-world AI solution for agricultural diagnostics"
                ));
                p6.setTechStack(List.of(
                        "Python", "TensorFlow", "Keras", "OpenCV",
                        "CNN", "Deep Learning", "Image Processing"
                ));


                Project p7 = new Project();
                p7.setTitle("AI vs Human Text Classification (NLP)");
                p7.setDescription("""
                        Developed an NLP system to classify AI-generated vs human-written academic abstracts
                        using TF-IDF feature vectorisation. Evaluated Naive Bayes, Logistic Regression, and
                        k-NN models with robust validation. Used to estimate AI content proportions in
                        unseen test datasets of 1000+ abstracts.
                        """);
                p7.setHighlights(List.of(
                        "Multi-model comparison with rigorous evaluation",
                        "TF-IDF + Naive Bayes, Logistic Regression, k-NN",
                        "Estimated AI content proportions in unseen data"
                ));
                p7.setTechStack(List.of(
                        "Python", "Scikit-learn", "TF-IDF",
                        "NLP", "Machine Learning", "Text Classification"
                ));


                Project p8 = new Project();
                p8.setTitle("Embedding-Based NLP Classification (BERT, Word2Vec, Doc2Vec)");
                p8.setDescription("""
                        Extended traditional NLP with embedding-based text classification using semantic
                        vector representations. Implemented Word2Vec, Doc2Vec, and BERT models with
                        ensemble classifiers to improve accuracy and semantic understanding of
                        AI-generated vs human text.
                        """);
                p8.setHighlights(List.of(
                        "BERT, Word2Vec, Doc2Vec embeddings compared",
                        "Ensemble classifiers for improved accuracy",
                        "Semantic understanding beyond bag-of-words"
                ));
                p8.setTechStack(List.of(
                        "Python", "BERT", "Word2Vec", "Doc2Vec",
                        "NLP", "Deep Learning", "Ensemble Methods"
                ));


                // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                // DATA MINING & FINANCIAL ML
                // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

                Project p9 = new Project();
                p9.setTitle("Bitcoin Price Trend Prediction using ML");
                p9.setDescription("""
                        Built predictive models for BTC price trends using 700,000+ rows of 1-minute
                        candlestick data. Engineered technical indicators (RSI, MACD, moving averages,
                        volatility, momentum). Trained Decision Tree, Random Forest, and XGBoost models
                        with rigorous evaluation across train/validation/test splits.
                        """);
                p9.setHighlights(List.of(
                        "Trained on 700K+ financial data points",
                        "Engineered RSI, MACD, and momentum features",
                        "Precision, Recall & F1-score evaluation"
                ));
                p9.setTechStack(List.of(
                        "Python", "XGBoost", "Random Forest",
                        "Pandas", "Time Series", "Data Mining"
                ));


                Project p10 = new Project();
                p10.setTitle("Advanced BTC Prediction with Deep Learning");
                p10.setDescription("""
                        Extended baseline BTC prediction with advanced ML and deep learning models
                        including a custom improved architecture. Implemented strict dataset splits,
                        hyperparameter tuning, and comprehensive model comparison using accuracy,
                        precision, recall, and F1-score across all datasets.
                        """);
                p10.setHighlights(List.of(
                        "Custom deep learning architecture design",
                        "Hyperparameter tuning with validation monitoring",
                        "Comprehensive multi-model comparison"
                ));
                p10.setTechStack(List.of(
                        "Python", "TensorFlow", "Deep Learning",
                        "XGBoost", "CNN/LSTM", "Time Series"
                ));


                // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                // SOFTWARE ENGINEERING & TESTING
                // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

                Project p11 = new Project();
                p11.setTitle("AI-Generated Game Code Evaluation with JUnit Testing");
                p11.setDescription("""
                        Designed a comprehensive JUnit test suite (30+ test cases) to evaluate correctness,
                        edge cases, exception handling, and logical flows in AI-generated Java game code.
                        Conducted qualitative code review identifying design inefficiencies, poor practices,
                        and improvement opportunities in OOP implementations.
                        """);
                p11.setHighlights(List.of(
                        "30+ JUnit test cases for thorough coverage",
                        "Edge case, exception, and boundary testing",
                        "Qualitative code review and OOP analysis"
                ));
                p11.setTechStack(List.of(
                        "Java", "JUnit", "Unit Testing",
                        "OOP", "Code Review", "Software Engineering"
                ));


                // Save All Projects
                repo.saveAll(List.of(p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11));
            }
        };
    }
}