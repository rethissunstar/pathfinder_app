FROM node:22.16.0-alpine3.22 AS  server
RUN mkdir app
WORKDIR /app
COPY package.json package.json
RUN node -v
RUN npm install --force
COPY . .

FROM node:22.16.0-alpine3.22  AS runner
WORKDIR /app
# ENV NODE_ENV=production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3001
CMD ["npm", "run", "dev"]