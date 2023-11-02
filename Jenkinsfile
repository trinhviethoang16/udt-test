pipeline {
    agent any 
    stages {
        stage('Build') { 
            steps {
                dir('FE-Nextjs') {
                    sh 'docker build -t fe-nextjs .' 
                    sh 'docker-compose up --build'
                }
            }
        }
        stage('Tag') { 
            steps {
                sh 'docker tag fe-nextjs trinhviethoang16/fe-nextjs'
            }
        }
        stage('Push') { 
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerHubCredentials', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                    sh 'docker login -u $USERNAME -p $PASSWORD'
                    sh 'docker push trinhviethoang16/fe-nextjs' 
                }
            }
        }
        stage('Deploy') { 
            steps {
                sshagent(credentials: ['vagrant-ssh']) {
                    sh 'ssh vagrant@your-vagrant-ip "docker pull trinhviethoang16/fe-nextjs && docker run -d -p 3500:3000 trinhviethoang16/fe-nextjs"'
                }
            }
        }
    }
}