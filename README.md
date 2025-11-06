# Simple API, DB and FE for school

## Vecka 38 uppgift 6:

### Skillnad mellan builder/test-stage och runtime-stage

- **Builder/test-stage**: Bygger och testar applikationen. Inkluderar alla utvecklingsberoenden.
- **Runtime-stage**: Skapar en mindre, renare image för produktion. Inkluderar endast produktionsberoenden.

### Varför separera dessa steg?

- Minskar storleken på produktionsimagen.
- Gör det möjligt att köra tester utan att påverka produktionsmiljön.
- Förbättrar säkerheten genom att exkludera utvecklingsverktyg från produktion.

### Fördelar med att skicka en mindre, renare image till Docker Hub

- Snabbare nedladdning och distribution.
- Mindre attackyta för säkerhetsproblem.
- Lägre lagringskostnader.

### Reflektion

- **Större projekt**: Detta tillvägagångssätt gör det enklare att samarbeta, eftersom alla utvecklare kan använda samma Dockerfile för både test och produktion.
- **En Dockerfile för alla miljöer**: Minskar underhållsarbete och risken för inkonsistens mellan olika miljöer.

### Slutsats

En multistage pipeline och struktur gör projektet mer robust, skalbart och lättare att underhålla.

## Printscreen: Preview deployment:

[Preview deployment: simple-frontend](Skärmavbild 2025-11-06 kl. 13.58.37.png)

## V36 - uppgift 5: Skriv i README hur du: Hittade felet i loggen. Fixade buggen. Verifierade att pipelinen blev grön igen.

Sökte upp felet i jobbet under Actions i Github, analyserade genom att läsa vad det berodde på, inte så svårt eftersom att jag själv framkallat felet, sedan har jag

## V36 - uppgift 6: Dokumentera i README skillnaden mellan att alltid använda :latest och att specificera versions-taggar.

Att alltid använda :latest innebär att den senaste byggda imagen/versionen skrivs över varje gång, alltså blir det svårt att veta vilken kod som faktiskt körs i produktion.

Jag använder dynamisk taggning baserad på branch-namn och commit-hash vilket gör varje build spårbar och reproducerbar, varje image får en unik tagg som prod-abc1234 eller staging-def5678.

Exempel från min GitHub Actions-pipeline:

      - name: Set environment tag
        id: vars
        run: |
          if [[ "${GITHUB_REF_NAME}" == "simple-main" ]]; then
            echo "TAG=prod-${GITHUB_SHA::7}" >> $GITHUB_ENV
          else
            echo "TAG=staging-${GITHUB_SHA::7}" >> $GITHUB_ENV
          fi

      - name: Build Docker image
        run: |
          docker build --target production \
            --platform linux/amd64 \
            -t ${{ secrets.DOCKERHUB_USERNAME }}/${{ env.IMAGE_NAME }}:${{ env.TAG }} \
            ./simple-server
