/** Pure-data Polish copy for /pl/wirtualna-recepcja (shared by the page and the no-JS body). */
export type Mark = "y" | "h" | "n";
export interface Cell { mark?: Mark; text?: string; note?: string }

export const hero = {
  eyebrow: "Dla gabinetów, klinik i firm usługowych",
  h1Lead: "Każdy telefon odebrany. ",
  h1Accent: "Każda wizyta umówiona.",
  leadBefore: "Co czwarty telefon do gabinetu przepada w godzinach szczytu. ",
  leadStrong: "AI recepcja odbiera go od razu, umawia wizytę w Twoim kalendarzu",
  leadAfter: ", a raport pokazuje, która reklama ją przyniosła i ile zarobiłeś.",
  cta: "Zamów bezpłatny audyt odbieralności",
  ctaSecondary: "Policz, ile tracisz",
};

export const callCard = {
  label: "Przykładowy wtorek w panelu",
  live: "Na żywo",
  rows: [
    { time: "09:12", tags: [{ k: "p", t: "Google Ads · Implanty" }, { k: "g", t: "Odebrane przez AI" }], main: "", small: "Recepcja zajęta 2 rozmowami. AI odebrała w 1 sekundę." },
    { time: "09:14", tags: [], main: "Umówiona konsultacja implantologiczna", small: "Wpisana do kalendarza FELG Dent · czw. 10:30" },
    { time: "12:47", tags: [{ k: "p", t: "Google Maps" }, { k: "g", t: "Odebrane" }], main: "", small: "Pani Anna, rejestracja · temat: higienizacja" },
    { time: "21:05", tags: [{ k: "p", t: "Meta · Ortodoncja" }, { k: "g", t: "AI po godzinach" }], main: "", small: "Nowy pacjent zapisany na poniedziałek 8:00" },
  ],
  sumLabel: "Przychód z dzisiejszych telefonów przypisany do kampanii",
  sumValue: "9 300 zł",
};

export const proofStats = [
  { value: "15-38%", label: "telefonów do firm usługowych zostaje bez odpowiedzi" },
  { value: "24/7", label: "AI odbiera w godzinach szczytu, po pracy i w weekendy" },
  { value: "100%", label: "połączeń przypisanych do kampanii, nagranych i opisanych" },
  { value: "do 14 dni", label: "od podpisania do pierwszego odebranego telefonu" },
];

export const problem = {
  eyebrow: "Problem, którego nie widać w panelu reklamowym",
  h2: "Reklama działa. Telefon dzwoni. Nikt nie odbiera.",
  lead: "Google Ads pokazuje kliknięcia. Nie pokazuje, że pacjent zadzwonił o 9:40, usłyszał sygnał i zapisał się do konkurencji.",
  chartTitle: "Odbieralność w kilkudziesięciu gabinetach stomatologicznych",
  beforeLabel: "Początek roku", beforeValue: "84,5%",
  afterLabel: "Koniec roku", afterValue: "68,6%",
  note: "W tym samym czasie liczba telefonów wzrosła. Im lepiej działała reklama, tym więcej połączeń przepadało w godzinach największego obłożenia. Dane zbiorcze z systemu call tracking, 12 miesięcy.",
  pains: [
    { title: "Płacisz za kliknięcie, tracisz na sygnale", body: "Każdy nieodebrany telefon z reklamy to opłacony lead, który trafia do gabinetu obok." },
    { title: "Oddzwanianie po godzinach nie działa", body: "Oddzwonienie po kilku godzinach obniża szansę na kontakt o 30-40%." },
    { title: "Winna jest zawsze „reklama”", body: "Bez danych o telefonach nie wiesz, czy problemem jest kampania, czy rejestracja. Zmieniasz agencję, a straty zostają." },
  ],
};

export type CalcKey = "calls" | "missed" | "newp" | "book" | "value" | "recover";
export const calculator = {
  eyebrow: "Kalkulator utraconych pacjentów",
  h2: "Ile kosztuje Cię nieodebrany telefon?",
  lead: "Wybierz branżę i ustaw swoje liczby. Wynik pokazuje przychód, który dziś przepada, i ile z niego odzyskasz z AI recepcją.",
  presets: [
    { id: "dent", label: "Stomatologia", v: { calls: 300, missed: 24, newp: 40, book: 50, value: 1500, recover: 70 } },
    { id: "aesth", label: "Medycyna estetyczna", v: { calls: 250, missed: 25, newp: 50, book: 45, value: 1800, recover: 70 } },
    { id: "fit", label: "Fitness / EMS", v: { calls: 1100, missed: 38, newp: 50, book: 30, value: 1200, recover: 60 } },
    { id: "auto", label: "Motoryzacja", v: { calls: 500, missed: 22, newp: 35, book: 40, value: 900, recover: 65 } },
    { id: "re", label: "Nieruchomości", v: { calls: 200, missed: 28, newp: 60, book: 25, value: 9000, recover: 60 } },
  ] as { id: string; label: string; v: Record<CalcKey, number> }[],
  fields: [
    { key: "calls", label: "Telefony miesięcznie", min: 50, max: 2000, step: 10 },
    { key: "missed", label: "Nieodebrane", min: 5, max: 50, step: 1, hint: "Średnio 24% w stomatologii, 31% w szczycie sezonu." },
    { key: "newp", label: "Nowi klienci wśród dzwoniących", min: 10, max: 90, step: 5 },
    { key: "book", label: "Ilu z nich umówiłoby się po odebraniu", min: 10, max: 90, step: 5 },
    { key: "value", label: "Wartość nowego klienta", min: 100, max: 20000, step: 100, hint: "Pierwszy plan leczenia, karnet, serwis lub prowizja." },
    { key: "recover", label: "Rozmowy przejęte przez AI recepcję", min: 30, max: 95, step: 5, hint: "Część dzwoniących rozłącza się przed odebraniem. Przyjmujemy ostrożnie." },
  ] as { key: CalcKey; label: string; min: number; max: number; step: number; hint?: string }[],
  outLabel: "Tracisz co miesiąc",
  outMissed: "Nieodebrane telefony",
  outLost: "Utraceni nowi klienci",
  outYear: "Strata rocznie",
  outGain: "Odzyskasz miesięcznie",
  roiBefore: "zwrotu z pakietu ",
  roiStrong: "Odbieraj + Mierz",
  roiMid: " za ",
  roiAfter: " zł miesięcznie",
  cta: "Sprawdź to na swoich danych - audyt 14 dni",
  foot: "Wartości startowe to przykład dla wybranej branży, a nie Twoje dane. Udział nieodebranych pochodzi z danych call trackingu; udział nowych klientów, umówień i wartość to założenia. Audyt podstawia Twoje prawdziwe liczby.",
};

export const PACKAGE_COST = 1240;
const fmt = new Intl.NumberFormat("pl-PL", { maximumFractionDigits: 0 });
export const formatPl = (n: number) => fmt.format(n);
export const computeLoss = (v: Record<CalcKey, number>) => {
  const missedCalls = (v.calls * v.missed) / 100;
  const lost = ((missedCalls * v.newp) / 100) * (v.book / 100);
  const loss = lost * v.value;
  const gain = (loss * v.recover) / 100;
  const roi = gain / PACKAGE_COST;
  return {
    missedCalls, lost, loss, gain, roi,
    lossText: fmt.format(Math.round(loss)),
    missedText: fmt.format(Math.round(missedCalls)),
    lostText: fmt.format(Math.round(lost * 10) / 10),
    yearText: `${fmt.format(Math.round(loss * 12))} zł`,
    gainText: `${fmt.format(Math.round(gain))} zł`,
    roiText: `${roi >= 10 ? fmt.format(Math.round(roi)) : roi.toFixed(1).replace(".", ",")}×`,
  };
};

export const how = {
  eyebrow: "Jak to działa",
  h2: "Odbiera. Umawia. Udowadnia.",
  lead: "Dwa narzędzia w jednym panelu: AI recepcja, która nie przepuszcza telefonów, i pomiar, który pokazuje, ile każdy telefon był wart.",
  steps: [
    { num: "Krok 1 · Odbiera", title: "AI recepcja odbiera każdy telefon", items: ["Gdy rejestracja jest zajęta, po godzinach i w weekendy", "Odpowiada na pytania o cennik, zakres usług i dojazd na podstawie wiedzy o Twojej firmie", "Gdy nie zna odpowiedzi, wysyła dane klienta mailem do rejestracji"] },
    { num: "Krok 2 · Umawia", title: "Wizyta ląduje w Twoim kalendarzu", items: ["Umawia, przekłada i odwołuje wizyty w FELG Dent i ZnanyLekarz", "Inne kalendarze z API podłączamy indywidualnie", "Rejestracja widzi listę nieodebranych i kolejkę do oddzwonienia"] },
    { num: "Krok 3 · Udowadnia", title: "Wiesz, która reklama przyniosła pacjenta", items: ["Każdy odwiedzający stronę widzi własny numer, więc telefon łączy się z kampanią, słowem kluczowym i landingiem", "Osobne numery dla wizytówki Google, Facebooka, ulotek i radia", "Rozmowy nagrane, spisane i oznaczone przez AI: „umówiona wizyta”, temat, nastrój", "Połączenia trafiają do GA4 i Google Ads jako konwersje"] },
  ],
};

const Y: Cell = { mark: "y" }, N: Cell = { mark: "n" }, H: Cell = { mark: "h" };
export const compare = {
  eyebrow: "Porównanie funkcji",
  h2: "Inni odbierają albo mierzą. My robimy jedno i drugie.",
  lead: "Voicebot bez pomiaru nie powie Ci, która reklama zarabia. Call tracking bez recepcji pokaże tylko, ile straciłeś.",
  headFeature: "Funkcja",
  headers: [["JAY-23", "Odbieraj + Mierz"], ["ZnanyLekarz", "Noa + Phone"], ["Ringostat"], ["Zadarma"], ["CallPage"], ["fonio.ai"]],
  rows: [
    { feature: "AI odbiera telefony 24/7", cells: [Y, Y, Y, Y, Y, Y] },
    { feature: "AI umawia wizyty w FELG Dent", cells: [Y, N, N, { mark: "h", note: "integracja z telefonią, nie z AI" }, N, N] },
    { feature: "AI umawia wizyty w ZnanyLekarz", cells: [Y, { mark: "y", note: "tylko kalendarz ZL, pakiety Plus/VIP" }, N, N, N, N] },
    { feature: "Dynamiczne numery: telefon przypisany do kampanii i słowa kluczowego", cells: [Y, { mark: "h", note: "numery marketingowe" }, Y, Y, { mark: "h", note: "numery wirtualne" }, N] },
    { feature: "Połączenia jako konwersje w GA4 i Google Ads", cells: [Y, N, Y, Y, { mark: "h", note: "Google Analytics" }, N] },
    { feature: "Nagranie, transkrypcja i AI ocena wyniku rozmowy", cells: [Y, { mark: "h", note: "podsumowania AI" }, Y, Y, N, { mark: "h", note: "rozmowy AI" }] },
    { feature: "Monitoring odbieralności recepcji: kto odebrał, czas oczekiwania, oddzwonienia", cells: [Y, H, H, H, N, N] },
    { feature: "Wdrożenie, konfiguracja kampanii i szkolenie recepcji w cenie", cells: [Y, N, N, { mark: "n", note: "samoobsługa" }, N, N] },
    { feature: "Cena startowa (netto, miesięcznie)", cells: [{ text: "od 300 zł", note: "pakiet od 840 zł" }, { text: "550-650 zł", note: "za stanowisko (Phone)" }, { text: "od 71 zł", note: "za użytkownika, min. 3; numery i minuty osobno" }, { text: "od 0 zł", note: "+ numery ok. 2 USD" }, { text: "79-249 zł", note: "AI agent 399 zł" }, { text: "399-1 199 zł" }] },
  ] as { feature: string; cells: Cell[] }[],
  legendYes: "jest w ofercie",
  legendHalf: "częściowo",
  legendNo: "nie znaleźliśmy w publicznej ofercie",
  legendSource: "Na podstawie publicznych stron i cenników producentów, stan na 16.10.2026.",
};

export const cases = {
  eyebrow: "Efekty u klientów",
  h2: "Liczby z prawdziwych rejestracji",
  items: [
    { label: "Gabinet stomatologiczny", value: "+58%", body: "odebranych połączeń w 4 miesiące. Nieodebrane spadły z 27% do 15%." },
    { label: "Klub fitness", value: "38%", body: "z ponad 1 100 telefonów miesięcznie zostawało bez odpowiedzi. Połowę kontaktów generowały Mapy Google." },
    { label: "40 gabinetów stomatologicznych", value: "33-53 s", body: "średniego czekania na odebranie w najsłabszych rejestracjach, wobec 5-22 s w najlepszych." },
  ],
};

export const demo = {
  eyebrow: "Przetestuj teraz",
  h2: "Zadzwoń i porozmawiaj z AI recepcją",
  lead: "Wybierz branżę, zadzwoń i spróbuj umówić wizytę. Bez formularza i bez handlowca.",
  phones: [
    { tel: "+48221189933", label: "Stomatologia", number: "22 118 99 33" },
    { tel: "+48123122533", label: "Fitness EMS", number: "12 312 25 33" },
    { tel: "+48583501484", label: "Nieruchomości", number: "58 350 14 84" },
    { tel: "+48583500634", label: "Motoryzacja", number: "58 350 06 34" },
  ],
};

export const pricing = {
  eyebrow: "Cennik",
  h2: "Kosztuje mniej niż jeden utracony pacjent",
  lead: "Ceny netto, miesięcznie. Zaczynamy od bezpłatnego audytu, więc decydujesz na podstawie własnych liczb.",
  per: "/ mies.",
  plans: [
    { title: "Wirtualna Recepcja", price: "300 zł", items: ["AI odbiera telefony 24/7 lub po godzinach", "Odpowiedzi z bazy wiedzy o Twojej firmie", "Dane klienta mailem do rejestracji", "Nagrania i transkrypcje rozmów"], extra: "+ 300 zł wdrożenia, 0,20 zł za minutę rozmowy" },
    { title: "Odbieraj + Mierz", price: "od 840 zł", featured: "Najczęściej wybierany", items: ["Wirtualna Recepcja z umawianiem wizyt w kalendarzu", "Telefon przypisany do kampanii, słowa kluczowego i landingu", "Monitoring odbieralności i kolejka oddzwonień", "AI ocena rozmów: umówione wizyty, tematy, nastrój", "Konwersje do GA4 i Google Ads, raporty co tydzień"], extra: "Do 1 240 zł miesięcznie, zależnie od liczby źródeł i minut" },
    { title: "Wirtualna Recepcja + kalendarz", price: "800 zł", items: ["Wszystko z Wirtualnej Recepcji", "Umawianie, przekładanie i odwoływanie wizyt", "Integracja FELG Dent lub ZnanyLekarz"], extra: "+ 800 zł wdrożenia" },
  ] as { title: string; price: string; featured?: string; items: string[]; extra: string }[],
};

export const faq = {
  eyebrow: "Pytania",
  h2: "Zanim zapytasz",
  items: [
    { q: "Czy muszę zmieniać numer telefonu gabinetu?", a: "Nie. Na stronę wklejamy jeden skrypt, który podmienia numer na numer z puli, a połączenia trafiają na Twój obecny numer. Do wizytówki Google i materiałów offline dostajesz osobne numery lokalne." },
    { q: "Czy AI zastąpi moją rejestrację?", a: "Nie. AI przejmuje telefony, których rejestracja nie zdąży odebrać, i te po godzinach. Twoje recepcjonistki dostają mniej stresu i kolejkę klientów do oddzwonienia." },
    { q: "Co, gdy klient zapyta o coś, czego AI nie wie?", a: "AI zbiera imię, numer i temat rozmowy, a potem wysyła je mailem do rejestracji. Klient nie słyszy sygnału zajętości i nie dzwoni do konkurencji." },
    { q: "Jak wygląda kwestia RODO i nagrywania rozmów?", a: "Dzwoniący słyszy komunikat o nagrywaniu. Przed startem podpisujemy umowę powierzenia przetwarzania danych i ustalamy, jak długo przechowujemy nagrania." },
    { q: "Ile trwa wdrożenie?", a: "Od kilku dni do 2 tygodni od podpisania umowy. Dobieramy pulę numerów, konfigurujemy kampanie, uczymy AI Twojej oferty i szkolimy rejestrację." },
    { q: "Na czym polega bezpłatny audyt odbieralności?", a: "Przez 14 dni mierzymy telefony z Twoich kampanii i wizytówki. Dostajesz raport: ile telefonów przepadło, w jakich godzinach, z których reklam i ile to kosztowało w złotówkach." },
  ],
};

export const finalCta = {
  eyebrow: "Bezpłatny audyt odbieralności",
  h2: "Sprawdź, ile telefonów tracisz. 14 dni, zero zmian w gabinecie.",
  lead: "Po audycie wiesz, ilu pacjentów nie dodzwoniło się do Ciebie i ile zarabia każda kampania.",
  checks: ["Raport w złotówkach, a nie w procentach", "Godziny, w których przepada najwięcej telefonów", "Ranking kampanii według umówionych wizyt"],
  cta: "Zamów bezpłatny audyt odbieralności",
};
