const form = document.getElementById("searchForm");
const input = document.getElementById("capitalInput");
const tbody = document.getElementById("resultsBody");
const message = document.getElementById("message");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const capital = input.value.trim();
    message.textContent = "";
    tbody.innerHTML = "";

    if (!capital) {
        message.textContent = "Pole nie może być puste!";
        return;
    }

    try {
        const response = await fetch(`https://restcountries.com/v3.1/capital/${capital}`);

        if (!response.ok) {
            message.textContent = "Nie znaleziono kraju o podanej stolicy.";
            return;
        }

        const data = await response.json();

        //data jako tablica krajów
        data.forEach(country => {
            const tr = document.createElement("tr");

            const name = country?.name?.common ?? "Brak danych";
            const cap = country?.capital?.[0] ?? "Brak";
            const population = country?.population?.toLocaleString() ?? "Brak";
            const region = country?.region ?? "Brak";
            const subregion = country?.subregion ?? "Brak";

            tr.innerHTML = `
                <td>${name}</td>
                <td>${cap}</td>
                <td>${population}</td>
                <td>${region}</td>
                <td>${subregion}</td>
            `;

            tbody.appendChild(tr);
        });

    } catch (error) {
        console.error("Błąd:", error);
        message.textContent = "Wystąpił błąd podczas pobierania danych.";
    }
});
