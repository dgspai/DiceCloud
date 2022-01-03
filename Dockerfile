FROM ubuntu:latest
RUN apt-get update -y \
    && apt-get install -y \
    curl \
    git
RUN useradd --create-home --shell /bin/bash dicecloud
USER dicecloud
WORKDIR /home/dicecloud
RUN curl https://install.meteor.com/?release=1.8.0.2 | sh
ENV PATH="${PATH}:/home/dicecloud/.meteor"
COPY dev.sh ./dev.sh
ENTRYPOINT ./dev.sh
