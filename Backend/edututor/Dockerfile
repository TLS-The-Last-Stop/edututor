FROM ubuntu:latest
LABEL authors="tls"
FROM openjdk:17
RUN ln -snf /usr/share/zoneinfo/Asia/Seoul /etc/localtime && echo Asia/Seoul > /etc/timezone
ARG JAR_FILE=build/libs/edututor-0.0.1-SNAPSHOT.jar

COPY ${JAR_FILE} edututor.jar

ENTRYPOINT ["java", "-jar", "-Dspring.profiles.active=dev", "-Duser.timezone=Asia/Seoul", "/edututor.jar"]
