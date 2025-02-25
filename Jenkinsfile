pipeline {
    agent {
        docker {
            image 'papitodev/playwright-nj-v1.49.1-noble' //Customized image with Playwright an Java (because of allure)
            args '--network qatw-primeira-edicao_skynet'
        }
    }

    stages {
        stage('Node.js Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('E2E Tests') {
            steps {
                sh 'npx playwright test'
                allure includeProperties: false, jdk: '', results: [[path: 'allure-results']]
            }
        }
    }
}