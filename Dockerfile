FROM ubuntu:22.10 AS builder

ARG VERSION=v3.7.4

RUN apt-get update \
 && apt-get -y install \
    build-essential \
    git \
 && git clone https://github.com/microsoft/pict.git \
 && cd pict && git checkout "$VERSION" \
 && make

FROM ubuntu:22.10

COPY --from=builder /pict/pict /usr/local/bin/pict
CMD ["/usr/local/bin/pict"]
