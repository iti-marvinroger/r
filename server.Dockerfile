FROM node:12

# Add Tini
ENV TINI_VERSION v0.18.0
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
RUN chmod +x /tini
ENTRYPOINT ["/tini", "--"]

# App
ADD . /app
WORKDIR /app
RUN yarn install && cd packages/server && yarn build
CMD cd packages/server && yarn start

EXPOSE 4000
