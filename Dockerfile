# Using the Playwright base image
FROM mcr.microsoft.com/playwright:v1.50.1-noble

# Installing dependencies and the OpenJDK 23
RUN apt-get update && apt-get- install -y \
    wget \
    unzip \
    openjdk-23-jdk \
    && apt-get clean

# Setting the JAVA_HOME environment variable
ENV JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk-23.jdk/Contents/Home
ENV PATH="${JAVA_HOME}/bin:${PATH}"
