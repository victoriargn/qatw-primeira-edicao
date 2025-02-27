# Using the Playwright base image
FROM mcr.microsoft.com/playwright:v1.50.1-noble

# Installing dependencies and the OpenJDK 21
RUN apt-get update && apt-get install -y \
    wget \
    unzip \
    openjdk-21-jdk \
    && apt-get clean

# Setting JAVA_HOME env variable
ENV JAVA_HOME=/Users/victoriaregina/OpenJDK/jdk-23.0.2.jdk/Contents/Home
ENV PATH="${JAVA_HOME}/bin:${PATH}"