# Introduction

Welcome to the Profile Builder Internship!

We're really excited to have you with us. This is where you'll start shaping the
Profile Builder App. It's all about learning, experimenting, and having fun with
coding. We can't wait to see what you'll create!

P.S. you can click on the logo on the top left corner to navigate back to the `./profile` route

# Designs (UI/UX)

You can find fleshed out designs of what the UI/UX should look like here:
https://www.figma.com/file/vgWHtZ68C25zF2XANdt0y4/(n)Ternship?type=design&node-id=0-1&mode=design&t=WUwPcgrM9ue2UYB1-0

NOTE: Yes, the login page does look different -- you can only `Sign in with Microsoft`. You won't have to implement that.

# Getting Started

You can run the application in the mock environment using `npm run start:mock`. This will still require you to sign in with your credentials, but everything else can be mocked out via the [msw](https://mswjs.io/`) library.

# Skaffold & Kubernetes

You can run the application on your local development machine in Kubernetes! Use Skaffold to easily manage your K8s resources. Running the application in Kubernetes on your local machine allows you to test the application's build, deploy, and running states against its target environment for development, qa, and production in the cloud.

Run `skaffold dev -p local-dev` to deploy the application in development mode to your local docker-desktop k8s cluster.
Run `skaffold dev -p local-prod` to deploy the application in production mode to your local docker-desktop k8s cluster.
