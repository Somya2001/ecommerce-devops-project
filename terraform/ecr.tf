resource "aws_ecr_repository" "ecommerce" {
  name                 = "${var.project_name}-app"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }

  tags = {
    Name        = "${var.project_name}-app"
    Environment = var.environment
    Project     = var.project_name
  }
}

output "ecr_repository_url" {
  description = "ECR Repository URL"
  value       = aws_ecr_repository.ecommerce.repository_url
}