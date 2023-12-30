# nvisia (n)Ternship

### Winter 2023

## Nvisia Profile Builder Frontend

The Profile Builder is part of a larger project that will store employee profiles. These profiles can be output as one-pagers that can then be distributed.

Nvisia is a software consulting company (SaaS) based out of Chicago. The project is hosted by Azure Cloud Computing Services and managed by a Kubernetes cluster. The motivation behind this project is to facilitate the ease of marketing nvisia's consultants to potential clients by reducing the manual and often tedious modifications that need to be done on a regular basis to appeal to any particular client. Note that this project is still in development and unavailable to the public.

## Designs (UI/UX)

You can find fleshed out designs of what the UI/UX should look like here:
https://www.figma.com/file/vgWHtZ68C25zF2XANdt0y4/(n)Ternship?type=design&node-id=0-1&mode=design&t=WUwPcgrM9ue2UYB1-0

## Skaffold & Kubernetes

You can run the application on your local development machine in Kubernetes! Use Skaffold to easily manage your K8s resources. Running the application in Kubernetes on your local machine allows you to test the application's build, deploy, and running states against its target environment for development, qa, and production in the cloud.

Run `skaffold dev -p local-dev` to deploy the application in development mode to your local docker-desktop k8s cluster.
Run `skaffold dev -p local-prod` to deploy the application in production mode to your local docker-desktop k8s cluster.