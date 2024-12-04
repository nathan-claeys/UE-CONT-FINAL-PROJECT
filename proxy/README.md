# REVERSE PROXY

Pour accéder aux services de l'application, l'interface passe par un reverse proxy qui redirige les requêtes vers les services nécessaires.
La techologie utilisée est Traefik Proxy, qui permet de faire de la répartition de charge et du reverse proxy pour des conteneurs Docker à partir de leur label.