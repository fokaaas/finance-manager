FROM node:18.19.1-alpine

WORKDIR /app

COPY . ./

RUN npm install -g pnpm && \
    pnpm install && \
    pnpm prisma generate && \
    pnpm build

EXPOSE 4455

CMD ["pnpm", "start"]