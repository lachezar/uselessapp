# The UselessApp

It does not do anything useful as the name suggests 🤷‍♂️. It runs on Gatsby, SASS, React, MUI, but it does not really do anything useful.

# How to install it

Before you start doing anything, first you need a Kubernetes cluster with running ~~Nginx ingress controller, cert-manager~~, [Caddy ingress controller](https://github.com/caddyserver/ingress), Victoria metrics and Grafana as a minimum. It would be better if you also had a running CI/CD pipeline, but for now we will start with the simple stuff.

Now you will need to install few Helm charts. Go to https://docs.victoriametrics.com/guides/k8s-monitoring-via-vm-cluster.html and follow the instructions to install Victoria Metrics and Grafana. It would be better to install them in a separate namespace by appending an extra flag to the helm install - `-n mymonitoringns`, but even if you use the default namespace it is not the end of the world.

After that install Caddy Ingress Controller and enable metrics scraping for it:

```
cat <<EOF | helm install caddy caddy/caddy-ingress-controller -n caddy -f -
ingressController:
  config:
    acmeEABKeyId: ""
    acmeEABMacKey: ""
    # -- Acme Server URL
    acmeCA: ""
    debug: false
    email: "YOUR EMAIL HERE @ EMAIL . EMAIL"
    metrics: true
    proxyProtocol: false
    experimentalSmartSort: false
    onDemandTLS: true

podAnnotations:
  prometheus.io.scheme: http
  prometheus.io/path: /metrics
  prometheus.io/port: "9765"
  prometheus.io/scrape: "true"
EOF
```

To view the Grafana dashboards, you can forward its port and open it locally - `kubectl port-forward deploy/grafana 3000`. You can also install a Caddy dashboard in Grafana so that you can see the actual metrics from it.

Next you need to specify a domain in the `host` field in `ingress.yaml` and configure the domain with an A-record to the IP of the k8s cluster load balancer. If you run this locally from "Docker for Desktop" cluster, then you might have to point the domain to your home IP and configure your home router to forward ports 80 and 443 (usually it is possible from the web admin panel of the router).

After that build a docker image (`docker build .`) and set it in the `deployment.yaml`. Then apply all the k8s resources to the cluster - `kubectl apply -f k8s/service.yaml -f k8s/ingress.yaml -f k8s/deployment.yaml `.

Now you should be able to open `https://<domain you specified in ingress.yaml>` and observe the Useless app in your browser!

_TODO: Add ArgoCD to install the helm charts and the k8s files._

# Screenshots:

<img width="800" alt="uselessapp" src="https://user-images.githubusercontent.com/130336/222905359-553c3368-d6c5-4b9a-8a68-dd42516c62c1.png">

<img width="800" alt="grafana" src="https://user-images.githubusercontent.com/130336/222905246-34f27d52-2c11-4fcd-94a2-bb1f984daf13.png">
​
