FROM node:22-alpine AS build
RUN mkdir /app
WORKDIR /app
COPY . .
RUN npm install --force
RUN npm run build

FROM nginx:alpine
# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d

COPY --from=build /app/dist/kira-ui/browser /usr/share/nginx/html

# expose port 80
EXPOSE 80

# run nginx
CMD ["nginx", "-g", "daemon off;"]
