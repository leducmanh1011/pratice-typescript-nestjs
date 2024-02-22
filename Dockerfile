FROM node:20

ENV APP_ROOT /app
RUN mkdir $APP_ROOT
WORKDIR $APP_ROOT
COPY package.json $APP_ROOT/package.json
COPY yarn.lock $APP_ROOT/yarn.lock
RUN yarn install

COPY . $APP_ROOT

EXPOSE 3000

CMD [ "yarn", "run", "start" ]
