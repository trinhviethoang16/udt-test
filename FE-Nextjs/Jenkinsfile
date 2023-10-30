pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                // Clone source code from repository
                git 'https://github.com/trinhviethoang16/udt-test.git'
            }
        }
        
        stage('Build') {
            steps {
                // Build Docker image
                sh 'docker build -t fe-nextjs .'
            }
        }
        
        stage('Deploy') {
            steps {
                // Run Docker container
                sh 'docker-compose up -d'
            }
        }
    }
}
