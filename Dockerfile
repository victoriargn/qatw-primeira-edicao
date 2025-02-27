# Using the Playwright base image
FROM mcr.microsoft.com/playwright:v1.50.1

# Installing dependencies and the OpenJDK 21
RUN apt-get update && apt-get install -y \
    wget \
    unzip \
    openjdk-21-jdk \
    && apt-get clean

# Setting the JAVA_HOME environment variable
ENV JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk-23.0.2.jdk/Contents/Home
RUN export JAVA_HOME
