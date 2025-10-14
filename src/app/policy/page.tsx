export default function PolicyPage() {
  return (
   <div className="flex flex-col gap-24 md:gap-32 ">
      {/* HEADER */}
      <div className="mt-32 flex flex-col gap-12 px-4 sm:px-20 md:px-32 lg:px-44 xl:px-64 2xl:px-96">
        <h1 className="font-bold text-3xl">Polityka prywatności</h1>

        <section className="flex flex-col gap-4">
          <h2 className="font-semibold text-xl">1. Postanowienia ogólne</h2>
          <ol className="list-decimal pl-12 space-y-3 text-middle text-main-black">
          <li>Niniejsza Polityka prywatności określa zasady przetwarzania danych osobowych użytkowników serwisu <b>Carfit</b>, dostępnego pod adresem [adres strony], w tym cele, zakres, podstawy prawne oraz prawa użytkowników związane z przetwarzaniem danych.</li>
          <li>Administratorem danych osobowych w rozumieniu przepisów Rozporządzenia Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. („RODO”) są: <b>Hipolit Roszkowski i Paweł Winter</b>, współtwórcy projektu Carfit.</li>
          <li>W sprawach dotyczących danych osobowych można się z nami skontaktować pod adresem e-mail: <b>support@car-fit.pl.</b></li>
          <li>Niniejsza Polityka prywatności określa zasady przetwarzania danych osobowych użytkowników serwisu Carfit, dostępnego pod adresem [adres strony], w tym cele, zakres, podstawy prawne oraz prawa użytkowników związane z przetwarzaniem danych.</li>
          </ol>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="font-semibold text-xl">2. Zakres i cel przetwarzania danych osobowych</h2>
          <ol className="list-decimal pl-12 space-y-3 text-middle text-main-black">
            <li>Serwis Carfit przetwarza dane osobowe użytkowników wyłącznie w zakresie niezbędnym do:</li>
            <ul className="list-disc pl-6 space-y-3">
              <li>utworzenia i obsługi konta użytkownika w serwisie</li>
              <li>umożliwienia rezerwacji usług motoryzacyjnych oferowanych przez warsztaty</li>
              <li>kontaktu z użytkownikiem w sprawach związanych z rezerwacjami</li>
              <li>wysyłania informacji technicznych i powiadomień związanych z funkcjonowaniem serwisu</li>
              <li>realizacji obowiązków prawnych wynikających z przepisów prawa</li>
            </ul>

            <li>Dane osobowe, które możemy przetwarzać, to w szczególności:</li>
            <ul className="list-disc pl-6 space-y-3">
              <li>imię i nazwisko</li>
              <li>adres e-mail</li>
              <li>numer telefonu</li>
              <li>dane pojazdu (jeśli podane w procesie rezerwacji)</li>
              <li>dane dotyczące historii rezerwacji</li>
            </ul>
          </ol>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="font-semibold text-xl">3. Podstawy prawne przetwarzania danych</h2>
          <ol className="list-decimal pl-12 space-y-3 text-middle text-main-black">
            <li>Podstawy prawne przetwarzania danych osobowych przez Carfit to:</li>
            <ul className="list-disc pl-6 space-y-3">
              <li>art. 6 ust. 1 lit. b RODO - niezbędność przetwarzania do wykonania umowy (np. obsługa konta, realizacja rezerwacji)</li>
              <li>art. 6 ust. 1 lit. c RODO - obowiązek prawny (np. przechowywanie danych w celach rozliczeniowych)</li>
              <li>art. 6 ust. 1 lit. f RODO - prawnie uzasadniony interes administratora (np. kontakt z użytkownikiem, zapewnienie bezpieczeństwa serwisu)</li>
              <li>art. 6 ust. 1 lit. a RODO - zgoda użytkownika (np. na komunikację marketingową, jeśli taka zostanie wprowadzona)</li>
            </ul>
          </ol>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="font-semibold text-xl">4. Udostępnianie danych osobowych</h2>
          <ol className="list-decimal pl-12 space-y-3 text-middle text-main-black">
            <li>Dane osobowe mogą być przekazywane warsztatom samochodowym, które realizują usługi rezerwowane za pośrednictwem serwisu, wyłącznie w zakresie niezbędnym do realizacji usługi.</li>
            <li>Dane mogą być również przekazywane podmiotom świadczącym usługi IT, hostingowe lub wsparcia technicznego, z którymi Carfit współpracuje.</li>
            <li>Dane osobowe nie są przekazywane do państw trzecich (poza Europejski Obszar Gospodarczy) ani organizacji międzynarodowych.</li>
          </ol>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="font-semibold text-xl">5. Okres przechowywania danych</h2>
          <ol className="list-decimal pl-12 space-y-3 text-middle text-main-black">
            <li>Dane osobowe użytkowników przechowywane są przez okres niezbędny do świadczenia usług w ramach serwisu oraz przez czas wymagany przepisami prawa (np. w zakresie roszczeń lub rozliczeń).</li>
            <li>W przypadku usunięcia konta użytkownika dane zostaną usunięte lub zanonimizowane w ciągu maksymalnie 30 dni, o ile ich dalsze przechowywanie nie jest wymagane przez prawo.</li>
          </ol>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="font-semibold text-xl">6. Prawa użytkownika</h2>
          <ol className="list-decimal pl-12 space-y-3 text-middle text-main-black">
            <li>Każdemu użytkownikowi przysługują następujące prawa w związku z przetwarzaniem jego danych osobowych:</li>
            <ul className="list-disc pl-6 space-y-3">
              <li>prawo dostępu do danych</li>
              <li>prawo ich sprostowania</li>
              <li>prawo do usunięcia („prawo do bycia zapomnianym”)</li>
              <li>prawo do ograniczenia przetwarzania</li>
              <li>prawo do przenoszenia danych</li>
              <li>prawo wniesienia sprzeciwu wobec przetwarzania</li>
              <li>prawo cofnięcia zgody (jeśli przetwarzanie odbywa się na jej podstawie)</li>
            </ul>
            <li>W celu realizacji powyższych praw należy skontaktować się z administratorem pod adresem: <b>support@car-fit.pl</b>.</li>
          </ol>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="font-semibold text-xl">7. Pliki cookies</h2>
          <ol className="list-decimal pl-12 space-y-3 text-middle text-main-black">
            <li>Serwis może używać plików cookies w celu zapewnienia prawidłowego działania strony, analizy ruchu oraz dostosowania treści do preferencji użytkowników</li>
            <li>Użytkownik może w każdej chwili zmienić ustawienia cookies w swojej przeglądarce internetowej. Ograniczenie stosowania cookies może wpłynąć na funkcjonalność serwisu.</li>
          </ol>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="font-semibold text-xl">8. Bezpieczeństwo danych</h2>
          <ol className="list-decimal pl-12 space-y-3 text-middle text-main-black">
            <li>Carfit podejmuje odpowiednie środki techniczne i organizacyjne w celu ochrony danych osobowych użytkowników przed nieuprawnionym dostępem, utratą, zmianą lub zniszczeniem.</li>
            <li>UDostęp do danych mają wyłącznie osoby upoważnione przez administratorów i zobowiązane do zachowania ich poufności.</li>
          </ol>
        </section>
        
        <section className="flex flex-col gap-4">
          <h2 className="font-semibold text-xl">9. Zmiany w Polityce prywatności</h2>
          <ol className="list-decimal pl-12 space-y-3 text-middle text-main-black">
            <li>Administratorzy zastrzegają sobie prawo do wprowadzania zmian w niniejszej Polityce prywatności.</li>
            <li>Aktualna wersja dokumentu będzie zawsze dostępna w serwisie.</li>
            <li>O istotnych zmianach użytkownicy zostaną poinformowani drogą e-mailową lub poprzez komunikat w serwisie.</li>
          </ol>
        </section>
      </div>
    </div>
  )
}