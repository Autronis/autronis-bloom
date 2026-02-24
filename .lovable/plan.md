

## Plan: Aurora Achtergrond + Optellende Statistieken

### Wat gaan we doen

1. **Circuit-line strepen verwijderen** uit de Hero sectie en de FinalCTA sectie — deze worden vervangen door subtielere animaties.

2. **Aurora/Gradient Mesh achtergrond** toevoegen aan de Hero sectie:
   - Twee tot drie grote, zachte turquoise blobs die langzaam van positie en vorm veranderen met `framer-motion`
   - Zeer lage opacity (5-10%) zodat het subtiel blijft en niet afleidt
   - Vloeiende beweging over 8-12 seconden cycli

3. **Animated Counter** component maken voor de statistieken (500+, 50+, 98%):
   - Telt op van 0 naar het eindgetal wanneer de statistieken in beeld scrollen
   - Gebruikt `framer-motion`'s `useInView` en `useSpring` voor vloeiende telling
   - Duurt ongeveer 2 seconden per counter

4. **Aanpasbaarheid**: Beide animaties krijgen props zodat je kleuren, snelheid en intensiteit later makkelijk kunt wijzigen.

### Technische Details

**Nieuwe bestanden:**
- `src/components/home/AuroraBackground.tsx` — Herbruikbaar aurora component met props voor `intensity`, `speed`, en `colors`
- `src/components/home/AnimatedCounter.tsx` — Counter component met props voor `target`, `duration`, `suffix`

**Aangepaste bestanden:**
- `src/pages/Index.tsx` — Circuit-lines vervangen door `AuroraBackground`, statistieken vervangen door `AnimatedCounter`
- `src/components/home/FinalCTA.tsx` — Circuit-lines vervangen door `AuroraBackground`

**Aanpasbare props:**
- Aurora: `intensity` (opacity 0-1), `speed` (seconden per cyclus), `colors` (array van HSL kleuren)
- Counter: `target` (eindgetal), `duration` (ms), `suffix` (bijv. "+", "%")

