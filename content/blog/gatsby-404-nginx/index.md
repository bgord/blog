---
title: "Configure nginx for Gatsby 404 error page"
date: "2021-06-08"
description: Nginx configuration for the not found page.
type: nginx
---

During Gatsby page development, when you hit a page that doesn't exist, you encounter a screen similar to the one below.

![](/gatsby-404-nginx-development.png)

If you created a custom 404 page, for example in `src/pages/404.js`, you can click the `Preview custom 404 page` to display it.
Entering the `/404` route will do the job as well.

In production, however, the 404 page doesn't get handled by itself unless you use a dedicated hosting service for Gatsby pages.
That's because Gatsby's development server is no longer present.
The production bundle is just a bunch of static files.
Making use of a web server (like `nginx`) to serve the production page forces you to configure the error pages yourself.

> Disclaimer: the following `nginx` configuration is pretty basic, don't use it in production.

Let's assume your blog is hosted on the `personalblog.com` domain and is served from the `/var/www/blog` directory on port `80`.

```nginx
server {
        listen 80;
        root /var/www/blog;
        server_name personalblog.com www.personalblog.com;
        location / {
                try_files $uri $uri/ =404;
        }
}
```

After entering a route that doesn't exist in your production Gatsby site, `nginx` displays its default 404 error page.

![](/gatsby-404-nginx-production.png)

Adding the following line makes `nginx` redirect to the `/404` route in case of a 404 error.
Your custom Gatsby 404 page will be displayed.

```nginx{5}
server {
        listen 80;
        root /var/www/blog;
        server_name personalblog.com www.personalblog.com;
        error_page 404 /404;
        location / {
                try_files $uri $uri/ =404;
        }
}
```

Visit the [error_page](https://nginx.org/en/docs/http/ngx_http_core_module.html#error_page) docs section to explore the rest of the configuration options.
