FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY ["wkt-track-backend/wkt-track-backend.csproj", "wkt-track-backend/"]
RUN dotnet restore "wkt-track-backend/wkt-track-backend.csproj"
COPY . .
WORKDIR "/src/wkt-track-backend"
RUN dotnet build "wkt-track-backend.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "wkt-track-backend.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "wkt-track-backend.dll"]
