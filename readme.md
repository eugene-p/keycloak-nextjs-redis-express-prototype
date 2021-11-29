# Mock for a realtime GPS tracking software

## Folder structure

Befor running any of applications

    ```docker compose up```

keycloak is running on port 8080. Credentials admin:Pa55w0rd

Click 'add/new realm' and select import file ```realm-export.json```.

### *./data-generator* - Script to fake realtime data
to run

```yarn```
```yarn run dist;  yarn run start```

### *./api* - An application API expressjs
to run

```yarn```
```yarn run dist;  yarn run start```

runs on port 3011

### *./client* - Client application nextjs
to run

```yarn```
```yarn run build; yarn run start``` or ```yarn run dev``` for a dev mode

runs on port 3000
