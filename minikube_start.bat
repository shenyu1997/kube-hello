set http_proxy=http://web-proxy.houston.hpecorp.net:8080
set https_proxy=http://web-proxy.houston.hpecorp.net:8080 
minikube start --docker-env HTTP_PROXY=http://web-proxy.houston.hpecorp.net:8080 --docker-env HTTPS_PROXY=http://web-proxy.houston.hpecorp.net:8080 --docker-env NO_PROXY=192.168.99.0/24
minikube ip