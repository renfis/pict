FROM ubuntu:22.10 AS pict-builder

ARG VERSION=v3.7.4

RUN apt-get update \
 && apt-get -y install \
    build-essential \
    git \
 && git clone https://github.com/microsoft/pict.git \
 && cd pict && git checkout "$VERSION" \
 && make


FROM ghcr.io/graalvm/graalvm-ce:22.3.0 AS quarkus-builder

RUN microdnf -y install gzip \
 && gu install native-image

RUN curl https://dlcdn.apache.org/maven/maven-3/3.8.6/binaries/apache-maven-3.8.6-bin.tar.gz --output /opt/maven.tar.gz \
 && tar xvzf /opt/maven.tar.gz \
 && mv apache-maven-3.8.6 /opt/maven

COPY . /workspace/

WORKDIR /workspace

RUN /opt/maven/bin/mvn -N io.takari:maven:wrapper

RUN /workspace/mvnw package -Pnative


FROM ubuntu:22.10

COPY --from=pict-builder --chown=1001:root /pict/pict /usr/local/bin/pict
COPY --from=quarkus-builder --chown=1001:root /workspace/target/pict-1.0.0-SNAPSHOT-runner /usr/local/bin/app

EXPOSE 8080
USER 1001

CMD ["/usr/local/bin/app", "-Dquarkus.http.host=0.0.0.0"]
