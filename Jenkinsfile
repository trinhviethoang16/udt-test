pipeline {
    agent any

    stages {
        stage('Clone') {
            steps {
                git branch: 'develop', url: 'https://github.com/trinhviethoang16/udt-test.git'
            }
        }
        stage('Build') {
            steps {
                sh 'cd fe-nextjs && docker build -t fe-nextjs .'
            }
        }
        stage('Deploy') {
            steps {
                sh 'cd fe-nextjs && docker-compose up -d'
            }
        }
    }
}