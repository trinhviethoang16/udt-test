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
                dir('FE-Nextjs') {
                    sh 'docker build -t fe-nextjs .'
                }
            }
        }
        stage('Deploy') {
            steps {
                dir('FE-Nextjs') {
                    sh 'docker-compose up -d'
                }
            }
        }
    }
}