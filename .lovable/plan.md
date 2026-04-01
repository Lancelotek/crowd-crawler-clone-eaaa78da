

## Plan: Quiz na osobnej stronie

### Co się zmieni

1. **Nowa strona `/quiz`** (`src/pages/Quiz.tsx`)
   - Renderuje `CalculatorSection` (kalkulator MVA) jako pełną stronę z nawigacją (MvaNavbar) i stopką
   - Dostępna pod `/:lang/quiz`

2. **Nowa trasa w `App.tsx`**
   - Dodanie `<Route path="quiz" element={<Quiz />} />` w LangRoutes
   - Dodanie `/quiz` w bare path redirectach (LanguageRedirect)

3. **Aktualizacja `FinalCTASection.tsx`**
   - Przycisk "Oblicz swoje MVA" zamiast otwierać dialog, będzie linkiem do `/{lang}/quiz`
   - Usunięcie dialogu kalkulatora i quizu (Dialog + lazy import CalculatorSection/QuizFunnelSection)
   - Usunięcie logiki `?quiz=open` z searchParams

4. **Aktualizacja nawigacji (opcjonalnie)**
   - Jeśli inne komponenty linkują do `#cta` z `?quiz=open`, zaktualizowanie ich na `/quiz`

### Szczegóły techniczne

- `Quiz.tsx` — prosta strona: MvaNavbar + CalculatorSection (full-width, nie w dialogu) + FooterSection
- CalculatorSection już jest self-contained, więc wystarczy go wyrenderować bezpośrednio
- Przycisk w FinalCTASection zmieni się z `<button onClick={...}>` na `<Link to={langPrefix}/quiz>`

