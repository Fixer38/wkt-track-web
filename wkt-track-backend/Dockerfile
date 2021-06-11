# ./Backend/Dockerfile
# Récupérer dotnetcore sdk version 3.1
FROM mcr.microsoft.com/dotnet/sdk:5.0

# Copie du script permettant l'initalisation dans le container
COPY ./entrypoint.sh /
# Installation de dotnet-ef permettant la migration
RUN dotnet tool install --global dotnet-ef
# Ajout de dotnet-ef au path pour l'utilisation de la commande
ENV PATH="${PATH}:/root/.dotnet/tools"
# Rendre le script exécutable par le container
RUN sed -i 's/\r//' /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Création du dossier ou l'application réside
WORKDIR /app
# Ouverture du port interne du container
EXPOSE 2000
# Exécution du script d'initialisation
CMD /entrypoint.sh