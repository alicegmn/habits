## Skillnad mellan builder/test-stage och runtime-stage

- **Builder/test-stage**: Bygger och testar applikationen. Inkluderar alla utvecklingsberoenden.
- **Runtime-stage**: Skapar en mindre, renare image för produktion. Inkluderar endast produktionsberoenden.

## Varför separera dessa steg?

- Minskar storleken på produktionsimagen.
- Gör det möjligt att köra tester utan att påverka produktionsmiljön.
- Förbättrar säkerheten genom att exkludera utvecklingsverktyg från produktion.

## Fördelar med att skicka en mindre, renare image till Docker Hub

- Snabbare nedladdning och distribution.
- Mindre attackyta för säkerhetsproblem.
- Lägre lagringskostnader.

## Reflektion

- **Större projekt**: Detta tillvägagångssätt gör det enklare att samarbeta, eftersom alla utvecklare kan använda samma Dockerfile för både test och produktion.
- **En Dockerfile för alla miljöer**: Minskar underhållsarbete och risken för inkonsistens mellan olika miljöer.

## Slutsats

En multistage pipeline och struktur gör projektet mer robust, skalbart och lättare att underhålla.
