# Base on offical NGINX Alpine image
FROM nginx:alpine

# Remove any existing config files
RUN rm /etc/nginx/conf.d/*

# Copy config files
# *.conf files in conf.d/ dir get included in main config
COPY ./nginx.config /etc/nginx/conf.d/default.conf


# Expose the listening ports
EXPOSE 80

EXPOSE 8080

# Launch NGINX
CMD [ "nginx", "-g", "daemon off;" ]
