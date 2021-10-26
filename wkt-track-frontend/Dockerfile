# Pull latest node image
FROM node:14.18.1-alpine

# Création du dossier de travail /app dans le container
WORKDIR /app

# Ajout des node_modules au chemin du container
ENV PATH /app/node_modules/.bin:$PATH

# Installation des dépendances
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --silent

# Copier les fichiers locaux dans le container
COPY . ./

# Démarrage de l'application
CMD ["yarn", "start"]
