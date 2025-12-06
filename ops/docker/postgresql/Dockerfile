# This is installing the pgvector extension for postgres
FROM postgres:18.1-bookworm

RUN apt-get update && apt-get install -y \
    build-essential \
    git \
    postgresql-server-dev-all \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /tmp
RUN git clone --branch v0.8.1 https://github.com/pgvector/pgvector.git

WORKDIR /tmp/pgvector
RUN make
RUN make install
