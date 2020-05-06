FROM ubuntu:20.04 AS builder

ARG VERSION=v3.7.1

RUN apt-get update \
 && apt-get -y install \
    build-essential \
    git \
 && git clone https://github.com/microsoft/pict.git \
 && cd pict && git checkout "$VERSION" \
 && make

FROM ubuntu:20.04

COPY --from=builder /pict/pict /usr/local/bin/pict
CMD ["/usr/local/bin/pict"]
