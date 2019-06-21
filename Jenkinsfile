pipeline {
    agent any

    environment {
        REPOSITORY = "docker.nexus.archi-lab.io/archilab"
        IMAGE = "prox-web-client"
        SERVERNAME = "fsygs15.inf.fh-koeln.de"
        SERVERPORT = "22412"
        SSHUSER = "jenkins"
        YMLFILENAME = "docker-compose-web-client.yml"
    }

    stages {
        stage("Build") {
            steps {
                sh "docker build -t ${REPOSITORY}/${IMAGE} ."
                sh "docker image save -o ${IMAGE}.tar ${REPOSITORY}/${IMAGE}"
            }
        }

        stage("Deploy") {
            steps {
                sh "scp -P ${SERVERPORT} -v ${IMAGE}.tar ${SSHUSER}@${SERVERNAME}:~/"
                sh "scp -P ${SERVERPORT} -v ${YMLFILENAME} ${SSHUSER}@${SERVERNAME}:/srv/prox/"
                sh "ssh -p ${SERVERPORT} ${SSHUSER}@${SERVERNAME} " +
                        "'docker image load -i ${IMAGE}.tar; " +
                        "docker network inspect prox &> /dev/null || docker network create prox; " +
                        "docker-compose -p prox -f /srv/prox/${YMLFILENAME} up -d'"
            }
        }
    }
}
