FROM node:lts-buster

RUN git clone https://github.com/Nignanfatao/Neoverse_md_wa-bot /root/Neoverse_md_wa-bot

WORKDIR /root/Neoverse_md_wa-bot

COPY package.json .
run npm install -g npm@10.2.4
RUN npm install pm2 -g
RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 8000

CMD ["npm","run","neoverse"]
