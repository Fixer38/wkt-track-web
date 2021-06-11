#!/bin/bash
set -e
dotnet restore
# Test de la connection à la base de données
until dotnet ef database update; do
>&2 echo "DB is starting up"
# Attente de la mise à jour de la DB
sleep 1
done
>&2 echo "DB is up - executing command"
# Lancement de l'application
# watch utilisé pour verifier un changement dans les fichiers locaux et relancer l'appli
dotnet watch run