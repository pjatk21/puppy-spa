# Puppy SPA

## Uruchomienie

### Develop
Wymagane jest ustawienie zmiennej środowiskowej `VITE_GOOGLE_CLIENTID`.
Bez tego aplikacja nie będzie w stanie się uruchomić.

Polecam użyć pliku `.env`

### Docker
Podczas tworzenia trzeba przekazać do Dockera parametr `VITE_GOOGLE_CLIENTID`.

```sh
docker build -t ghcr.io/pjatk21/puppy-spa:latest --build-arg VITE_GOOGLE_CLIENTID="notsoscrect.apps.googleusercontent.com" .
```

## Użycie
Obraz dockera zawiera wyłącznie pliki strony. Nic więcej.


