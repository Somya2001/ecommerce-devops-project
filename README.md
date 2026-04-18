# 🛒 ShopEase — E-Commerce DevOps Project

A production-grade, end-to-end DevOps implementation of an e-commerce application, built and deployed using industry-standard tools and practices.

## 🏗️ Architecture Overview

Developer pushes code to GitHub → Jenkins picks it up → Code quality checked via SonarQube → Docker image built → Security scanned via Trivy → Image pushed to AWS ECR → Deployed to AWS EKS (Kubernetes) → Monitored via Prometheus & Grafana

## 🛠️ Tech Stack

| Category | Tool |
|---|---|
| Cloud Provider | AWS (EKS, ECR, VPC) |
| Infrastructure as Code | Terraform |
| CI/CD | Jenkins |
| Containerization | Docker |
| Container Orchestration | Kubernetes (EKS) |
| Code Quality | SonarQube |
| Security Scanning | Trivy |
| Monitoring | Prometheus + Grafana |
| Version Control | GitHub |

## 📁 Project Structure

```
ecommerce-devops-project/
├── app/                  # Application source code + Dockerfile
├── jenkins/              # Jenkinsfile (CI/CD pipeline)
├── k8s/                  # Kubernetes manifests
├── terraform/            # AWS Infrastructure as Code
├── monitoring/           # Prometheus & Grafana configuration
└── README.md
```

## 🚀 Project Status

- [x] Phase 0: Environment Setup & Tools Installation ✅
- [ ] Phase 1: AWS Infrastructure (Terraform)
- [ ] Phase 2: Application Development + Dockerization
- [ ] Phase 3: Jenkins CI/CD Pipeline
- [ ] Phase 4: Kubernetes Deployment on EKS
- [ ] Phase 5: Monitoring with Prometheus & Grafana

## 📌 Key Features

- Automated CI/CD pipeline with Jenkins
- Infrastructure provisioned using Terraform (IaC)
- Docker containerized application
- Kubernetes auto-scaling with HPA
- Security scanning at every stage
- Real-time monitoring and alerting

