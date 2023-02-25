# The UselessApp

It does not do anything useful as the name suggests 🤷‍♂️. It runs on Gatsby, SASS, React, MUI, but it does not really do anything useful.

# How to install it

Before you start doing anything, first you need a Kubernetes cluster with running ~~Nginx ingress controller, cert-manager~~, [Caddy ingress controller](https://github.com/caddyserver/ingress), Victoria metrics and Grafana as a minimum. It would be better if you also had a running CI/CD pipeline, but for now we will start with the simple stuff.

After that build a docker image and set it in the deployment.yaml file and apply it to the k8s cluster.

To be continued...
