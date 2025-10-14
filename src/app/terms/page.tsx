export default function PolicyPage() {
  return (
   <div className="flex flex-col gap-24 md:gap-32 ">
      {/* HEADER */}
      <div className="mt-32 flex flex-col gap-12 px-4 sm:px-20 md:px-32 lg:px-44 xl:px-64 2xl:px-96">
        <h1 className="font-bold text-3xl">Regulamin serwisu</h1>

        <section className="flex flex-col gap-4">
          <h2 className="font-semibold text-xl">1. Postanowienia ogólne</h2>
          <ol className="list-decimal pl-12 space-y-3 text-middle text-main-black">
            <li>Niniejszy regulamin określa zasady korzystania z internetowej platformy Carfit dostępnej pod adresem www.car-fit.pl, umożliwiającej użytkownikom rezerwację usług motoryzacyjnych świadczonych przez niezależne warsztaty i mechaników.</li>
            <li>Serwis jest projektem testowym prowadzonym w charakterze niekomercyjnym i nie stanowi działalności gospodarczej w rozumieniu przepisów prawa.</li>
            <li>Właściciel serwisu nie jest stroną umów zawieranych pomiędzy użytkownikami a warsztatami i nie ponosi odpowiedzialności za wykonanie usług przez warsztaty.</li>
            <li>Korzystanie z serwisu oznacza akceptację niniejszego regulaminu.</li>
          </ol>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="font-semibold text-xl">2. Definicje</h2>
          <ul className="list-disc pl-12 space-y-3 text-middle text-main-black">
            <li><b>Serwis</b> - platforma internetowa Carfit, umożliwiająca rezerwację usług motoryzacyjnych.</li>
            <li><b>Użytkownik </b> - osoba fizyczna lub prawna, która korzysta z funkcji serwisu, w tym zakłada konto i dokonuje rezerwacji.</li>
            <li><b>Warsztat</b> - niezależny podmiot (firma lub osoba), który oferuje usługi motoryzacyjne dostępne w serwisie.</li>
            <li><b>Rezerwacja</b> - zgłoszenie chęci skorzystania z usługi warsztatu przez użytkownika za pośrednictwem serwisu.</li>
          </ul>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="font-semibold text-xl">3. Zakres usług</h2>
          <ol className="list-decimal pl-12 space-y-3 text-middle text-main-black">
            <li>Serwis umożliwia użytkownikom przeglądanie ofert warsztatów oraz składanie rezerwacji usług bezpośrednio poprzez platformę.</li>
            <li>Serwis nie pobiera opłat od użytkowników za korzystanie z podstawowych funkcji.</li>
            <li>Serwis nie świadczy samodzielnie usług motoryzacyjnych i nie jest stroną umów zawieranych pomiędzy użytkownikiem a warsztatem.</li>
          </ol>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="font-semibold text-xl">4. Rejestracja i konto użytkownika</h2>
          <ol className="list-decimal pl-12 space-y-3 text-middle text-main-black">
            <li>Korzystanie z funkcji rezerwacyjnych wymaga założenia konta w serwisie.</li>
            <li>Użytkownik zobowiązuje się do podawania prawdziwych i aktualnych danych podczas rejestracji.</li>
            <li>Konto użytkownika jest przypisane do jednej osoby i nie może być udostępniane osobom trzecim.</li>
            <li>Użytkownik może w każdej chwili usunąć swoje konto, kontaktując się z administratorem serwisu.</li>
          </ol>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="font-semibold text-xl">5. Rezerwacje usług</h2>
          <ol className="list-decimal pl-12 space-y-3 text-middle text-main-black">
            <li>Dokonanie rezerwacji oznacza wyrażenie chęci skorzystania z usługi oferowanej przez wybrany warsztat.</li>
            <li>Szczegółowe warunki realizacji usługi (termin, cena, zakres) ustalane są indywidualnie między użytkownikiem a warsztatem.</li>
            <li>Serwis nie ponosi odpowiedzialności za jakość usług świadczonych przez warsztaty ani za niewykonanie lub nienależyte wykonanie umowy.</li>
          </ol>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="font-semibold text-xl">6. Odpowiedzialność</h2>
          <ol className="list-decimal pl-12 space-y-3 text-middle text-main-black">
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
          <h2 className="font-semibold text-xl">7. Dane osobowe</h2>
          <ol className="list-decimal pl-12 space-y-3 text-middle text-main-black">
            <li>Serwis może przetwarzać dane osobowe użytkowników wyłącznie w zakresie niezbędnym do świadczenia usług platformy.</li>
            <li>Szczegółowe zasady przetwarzania danych osobowych określa <b>Polityka prywatności</b> dostępna w serwisie.</li>
          </ol>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="font-semibold text-xl">8. Postanowienia końcowe</h2>
          <ol className="list-decimal pl-12 space-y-3 text-middle text-main-black">
            <li>Administrator zastrzega sobie prawo do wprowadzania zmian w regulaminie. O zmianach użytkownicy zostaną poinformowani z odpowiednim wyprzedzeniem.</li>
            <li>W sprawach nieuregulowanych niniejszym regulaminem zastosowanie mają odpowiednie przepisy prawa polskiego.</li>
            <li>Korzystanie z serwisu jest równoznaczne z akceptacją niniejszego regulaminu.</li>
          </ol>
        </section>
      </div>
    </div>
  )
}

