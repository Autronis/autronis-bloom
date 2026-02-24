

## Metamorphose-animatie: Horizontale reis met lichtspoor

### Concept

De animatie wordt een **horizontale reis van links naar rechts** over de volle breedte van de container. De rups begint links, kruipt naar het midden waar hij een cocon vormt, en de vlinder verschijnt en vliegt naar rechts. Een subtiel **lichtspoor** volgt elke fase.

De hele cyclus speelt als een doorlopende lineaire reis, niet als 3 losse stages die in- en uitfaden.

### Visueel verloop

```text
Links                    Midden                   Rechts
  [rups kruipt -->]   [cocon pulseert]   [vlinder vliegt -->]
  ~~~trail~~~          ....glow....        ***sparkles***
```

1. **Fase 1 (0-4s)**: Rups verschijnt links, kruipt naar het midden met golvende segmenten. Achter hem blijft een subtiel teal lichtspoor dat langzaam vervaagt.
2. **Fase 2 (4-7s)**: Rups krimpt samen tot een cocon in het midden. Het lichtspoor dooft uit. De cocon pulseert zachtjes.
3. **Fase 3 (7-12s)**: Cocon breekt open, vlinder ontvouwt vleugels en vliegt naar rechts. Achter de vlinder dwarrelen kleine lichtdeeltjes (2-3 kleine cirkels die uitfaden).
4. **Reset (12s)**: Alles fade out, cyclus herstart.

### Technische details

**Bestand:** `src/components/home/MetamorphosisAnimation.tsx` (volledig herschrijven)

**Aanpak:**
- Gebruik `framer-motion` `useAnimationControls()` om de fases sequentieel te sturen in plaats van `setInterval`
- De SVG viewBox wordt breed (bijv. `0 0 800 120`) om de volle horizontale ruimte te benutten
- Container: `w-full max-w-4xl h-32` (breder dan nu)

**Rups:**
- 6 segmenten die als groep `translateX` animeren van `x: 0` naar `x: 300`
- Golvende `cy` animatie per segment (wave-effect)
- Trail: 4-5 kleine cirkels achter de rups met `opacity` die afneemt van 0.3 naar 0

**Cocon:**
- Rups-segmenten morphen samen tot 1 ellips op `cx: 400` (midden)
- Zachte `scale` en `opacity` puls
- Subtiele glow ring eromheen

**Vlinder:**
- Verschijnt uit cocon op `cx: 400`, vleugels ontvouwen (scale van 0 naar 1)
- Vlinder beweegt naar `x: 700` (rechts)
- Vleugels klappen zachtjes (path morph, zoals nu)
- Sparkle trail: 3 kleine cirkels die achterblijven en uitfaden met `scale` + `opacity` animatie

**Timing:**
- Totale cyclus: ~12 seconden (rustig tempo)
- Overgang tussen fases is vloeiend, geen harde cuts

**Geen wijzigingen aan:**
- `src/pages/Index.tsx` (container en opacity blijven hetzelfde)
- Andere bestanden
