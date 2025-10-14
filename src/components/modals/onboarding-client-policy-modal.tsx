'use client'
import { useModalStore } from "@/lib/store";
import { CloseButton } from "../buttons/close-button";
import { BackButton } from "../buttons/back-button";

export const OnboardingClientPolicyModal = () => {
  const closeModal = useModalStore(store => store.closeModal)
  

  return(
   <div className="w-full h-full flex flex-col gap-5 bg-white sm:max-w-[600px] sm:max-h-3/4 sm:h-fit sm:pb-10 sm:rounded-4xl sm:inset-shadow-glass sm:shadow-xs sm:ring sm:ring-[#D4D4D4]">
      <div className="w-full px-8 py-8">
        <BackButton onBackFn={closeModal}/>
      </div>
      
      <div className="px-6 flex flex-col gap-8  overflow-scroll">
        {/* POLICY */}
        <div className="flex flex-col gap-6 px-4">
        <h1 className="font-bold text-2xl">Polityka prywatności</h1>

        <section className="flex flex-col gap-4">
          <h2 className="font-semibold text-lg">1. Postanowienia ogólne</h2>
          <ol className="list-decimal pl-12 space-y-3 text-sm text-main-black">
          <li>Niniejsza Polityka prywatności określa zasady przetwarzania danych osobowych użytkowników serwisu <b>Carfit</b>, dostępnego pod adresem [adres strony], w tym cele, zakres, podstawy prawne oraz prawa użytkowników związane z przetwarzaniem danych.</li>
          <li>Administratorem danych osobowych w rozumieniu przepisów Rozporządzenia Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. („RODO”) są: <b>Hipolit Roszkowski i Paweł Winter</b>, współtwórcy projektu Carfit.</li>
          <li>W sprawach dotyczących danych osobowych można się z nami skontaktować pod adresem e-mail: <b>support@car-fit.pl.</b></li>
          <li>Niniejsza Polityka prywatności określa zasady przetwarzania danych osobowych użytkowników serwisu Carfit, dostępnego pod adresem [adres strony], w tym cele, zakres, podstawy prawne oraz prawa użytkowników związane z przetwarzaniem danych.</li>
          </ol>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="font-semibold text-lg">2. Zakres i cel przetwarzania danych osobowych</h2>
          <ol className="list-decimal pl-12 space-y-3 text-sm text-main-black">
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
          <h2 className="font-semibold text-lg">3. Podstawy prawne przetwarzania danych</h2>
          <ol className="list-decimal pl-12 space-y-3 text-sm text-main-black">
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
          <h2 className="font-semibold text-lg">4. Udostępnianie danych osobowych</h2>
          <ol className="list-decimal pl-12 space-y-3 text-sm text-main-black">
            <li>Dane osobowe mogą być przekazywane warsztatom samochodowym, które realizują usługi rezerwowane za pośrednictwem serwisu, wyłącznie w zakresie niezbędnym do realizacji usługi.</li>
            <li>Dane mogą być również przekazywane podmiotom świadczącym usługi IT, hostingowe lub wsparcia technicznego, z którymi Carfit współpracuje.</li>
            <li>Dane osobowe nie są przekazywane do państw trzecich (poza Europejski Obszar Gospodarczy) ani organizacji międzynarodowych.</li>
          </ol>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="font-semibold text-lg">5. Okres przechowywania danych</h2>
          <ol className="list-decimal pl-12 space-y-3 text-sm text-main-black">
            <li>Dane osobowe użytkowników przechowywane są przez okres niezbędny do świadczenia usług w ramach serwisu oraz przez czas wymagany przepisami prawa (np. w zakresie roszczeń lub rozliczeń).</li>
            <li>W przypadku usunięcia konta użytkownika dane zostaną usunięte lub zanonimizowane w ciągu maksymalnie 30 dni, o ile ich dalsze przechowywanie nie jest wymagane przez prawo.</li>
          </ol>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="font-semibold text-lg">6. Prawa użytkownika</h2>
          <ol className="list-decimal pl-12 space-y-3 text-sm text-main-black">
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
          <h2 className="font-semibold text-lg">7. Pliki cookies</h2>
          <ol className="list-decimal pl-12 space-y-3 text-sm text-main-black">
            <li>Serwis może używać plików cookies w celu zapewnienia prawidłowego działania strony, analizy ruchu oraz dostosowania treści do preferencji użytkowników</li>
            <li>Użytkownik może w każdej chwili zmienić ustawienia cookies w swojej przeglądarce internetowej. Ograniczenie stosowania cookies może wpłynąć na funkcjonalność serwisu.</li>
          </ol>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="font-semibold text-lg">8. Bezpieczeństwo danych</h2>
          <ol className="list-decimal pl-12 space-y-3 text-sm text-main-black">
            <li>Carfit podejmuje odpowiednie środki techniczne i organizacyjne w celu ochrony danych osobowych użytkowników przed nieuprawnionym dostępem, utratą, zmianą lub zniszczeniem.</li>
            <li>UDostęp do danych mają wyłącznie osoby upoważnione przez administratorów i zobowiązane do zachowania ich poufności.</li>
          </ol>
        </section>
        
        <section className="flex flex-col gap-4">
          <h2 className="font-semibold text-lg">9. Zmiany w Polityce prywatności</h2>
          <ol className="list-decimal pl-12 space-y-3 text-sm text-main-black">
            <li>Administratorzy zastrzegają sobie prawo do wprowadzania zmian w niniejszej Polityce prywatności.</li>
            <li>Aktualna wersja dokumentu będzie zawsze dostępna w serwisie.</li>
            <li>O istotnych zmianach użytkownicy zostaną poinformowani drogą e-mailową lub poprzez komunikat w serwisie.</li>
          </ol>
        </section>
        </div>

        {/* TERMS */}
      <div className="flex flex-col gap-6 px-4">
        <h1 className="font-bold text-2xl">Regulamin serwisu</h1>

        <section className="flex flex-col gap-4">
          <h2 className="font-semibold text-lg">1. Postanowienia ogólne</h2>
          <ol className="list-decimal pl-12 space-y-3 text-sm text-main-black">
            <li>Niniejszy regulamin określa zasady korzystania z internetowej platformy Carfit dostępnej pod adresem www.car-fit.pl, umożliwiającej użytkownikom rezerwację usług motoryzacyjnych świadczonych przez niezależne warsztaty i mechaników.</li>
            <li>Serwis jest projektem testowym prowadzonym w charakterze niekomercyjnym i nie stanowi działalności gospodarczej w rozumieniu przepisów prawa.</li>
            <li>Właściciel serwisu nie jest stroną umów zawieranych pomiędzy użytkownikami a warsztatami i nie ponosi odpowiedzialności za wykonanie usług przez warsztaty.</li>
            <li>Korzystanie z serwisu oznacza akceptację niniejszego regulaminu.</li>
          </ol>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="font-semibold text-lg">2. Definicje</h2>
          <ul className="list-disc pl-12 space-y-3 text-sm text-main-black">
            <li><b>Serwis</b> - platforma internetowa Carfit, umożliwiająca rezerwację usług motoryzacyjnych.</li>
            <li><b>Użytkownik </b> - osoba fizyczna lub prawna, która korzysta z funkcji serwisu, w tym zakłada konto i dokonuje rezerwacji.</li>
            <li><b>Warsztat</b> - niezależny podmiot (firma lub osoba), który oferuje usługi motoryzacyjne dostępne w serwisie.</li>
            <li><b>Rezerwacja</b> - zgłoszenie chęci skorzystania z usługi warsztatu przez użytkownika za pośrednictwem serwisu.</li>
          </ul>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="font-semibold text-lg">3. Zakres usług</h2>
          <ol className="list-decimal pl-12 space-y-3 text-sm text-main-black">
            <li>Serwis umożliwia użytkownikom przeglądanie ofert warsztatów oraz składanie rezerwacji usług bezpośrednio poprzez platformę.</li>
            <li>Serwis nie pobiera opłat od użytkowników za korzystanie z podstawowych funkcji.</li>
            <li>Serwis nie świadczy samodzielnie usług motoryzacyjnych i nie jest stroną umów zawieranych pomiędzy użytkownikiem a warsztatem.</li>
          </ol>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="font-semibold text-lg">4. Rejestracja i konto użytkownika</h2>
          <ol className="list-decimal pl-12 space-y-3 text-sm text-main-black">
            <li>Korzystanie z funkcji rezerwacyjnych wymaga założenia konta w serwisie.</li>
            <li>Użytkownik zobowiązuje się do podawania prawdziwych i aktualnych danych podczas rejestracji.</li>
            <li>Konto użytkownika jest przypisane do jednej osoby i nie może być udostępniane osobom trzecim.</li>
            <li>Użytkownik może w każdej chwili usunąć swoje konto, kontaktując się z administratorem serwisu.</li>
          </ol>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="font-semibold text-lg">5. Rezerwacje usług</h2>
          <ol className="list-decimal pl-12 space-y-3 text-sm text-main-black">
            <li>Dokonanie rezerwacji oznacza wyrażenie chęci skorzystania z usługi oferowanej przez wybrany warsztat.</li>
            <li>Szczegółowe warunki realizacji usługi (termin, cena, zakres) ustalane są indywidualnie między użytkownikiem a warsztatem.</li>
            <li>Serwis nie ponosi odpowiedzialności za jakość usług świadczonych przez warsztaty ani za niewykonanie lub nienależyte wykonanie umowy.</li>
          </ol>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="font-semibold text-lg">6. Odpowiedzialność</h2>
          <ol className="list-decimal pl-12 space-y-3 text-sm text-main-black">
            <li>Serwis działa jako platforma pośrednicząca i nie jest stroną umowy pomiędzy użytkownikiem a warsztatem.</li>
            <li>Serwis nie ponosi odpowiedzialności za:</li>
            <ul className="list-disc pl-6 space-y-3">
              <li>działania lub zaniechania warsztatów</li>
              <li>szkody powstałe w wyniku korzystania z usług warsztatów</li>
              <li>problemy techniczne uniemożliwiające korzystanie z serwisu</li>
            </ul>
          </ol>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="font-semibold text-lg">7. Dane osobowe</h2>
          <ol className="list-decimal pl-12 space-y-3 text-sm text-main-black">
            <li>Serwis może przetwarzać dane osobowe użytkowników wyłącznie w zakresie niezbędnym do świadczenia usług platformy.</li>
            <li>Szczegółowe zasady przetwarzania danych osobowych określa <b>Polityka prywatności</b> dostępna w serwisie.</li>
          </ol>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="font-semibold text-lg">8. Postanowienia końcowe</h2>
          <ol className="list-decimal pl-12 space-y-3 text-sm text-main-black">
            <li>Administrator zastrzega sobie prawo do wprowadzania zmian w regulaminie. O zmianach użytkownicy zostaną poinformowani z odpowiednim wyprzedzeniem.</li>
            <li>W sprawach nieuregulowanych niniejszym regulaminem zastosowanie mają odpowiednie przepisy prawa polskiego.</li>
            <li>Korzystanie z serwisu jest równoznaczne z akceptacją niniejszego regulaminu.</li>
          </ol>
        </section>
      </div>
      </div>      
    </div>
  )
}

    